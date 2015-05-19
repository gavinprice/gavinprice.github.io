/*jslint nomen : true*/
/*jslint bitwise : true*/
/*jslint browser : true*/
/*global $, BodyAtlas, _, Backbone */

BodyAtlas.Utility = {
    Array: function () {
        "use strict";
        return {
            arraySum: function (array) {
                var sum = 0;
                _.each(array, function (item) {
                    sum += item;
                });
                return sum;
            }
        };
    },

    Geometry: function () {
        "use strict";
        return {
            /**
             * Calculates if a given point is inside of a given area, where
             * relativeTo is the tope left corner of a radial area.
             *
             * @param point
             * @param relativeTo
             * @param square
             * @returns {boolean}
             */
            intersect: function (point, relativeTo, square) {

                var bl = {
                    x: relativeTo.x,
                    y: relativeTo.y + square
                }, tr = {
                    x: relativeTo.x + square,
                    y: relativeTo.y
                }, br = {
                    x: tr.x,
                    y: bl.y
                }, intersect = false;

                // is it within the x axis guidance?
                if (point.x >= relativeTo.x && point.x <= br.x) {
                    // is it within the y axis guidance?
                    if (point.y >= relativeTo.y && point.y <= br.y) {
                        intersect = true; // the point is inside the box
                    }
                }

                return intersect;
            },

            /**
             * Calculates the square area given a square radius from a given
             * center point
             *
             * @param point
             * @param radius
             * @returns {Array}
             */
            area: function (point, radius) {
                var region = [], farLeft, topMost;

                for (farLeft = point.x - radius; farLeft <= point.x + radius; farLeft += 1) {
                    for (topMost = point.y - radius; topMost <= point.y + radius; topMost += 1) {
                        region.push([farLeft, topMost]);
                    }
                }

                return region;
            },

            /**
             * Calculates the overlap between the radius of two points on a
             * cartesian plane
             *
             * @param point1
             * @param radius1
             * @param point2
             * @param radius2
             * @returns {Array}
             */
            overlap: function (point1, radius1, point2, radius2) {
                var intersection = [],
                    region = this.area(point1, radius1),
                    overlapRegion = this.area(point2, radius2);
                _.each(region, function (coordinate) {
                    _.each(overlapRegion, function (overlapCoordinate) {
                        if ((coordinate[0] === overlapCoordinate[0] && coordinate[1] === overlapCoordinate[1])) {
                            intersection.push(coordinate);
                        }
                    });
                });

                return intersection;
            },

            /**
             * Calculates the intersection area between two circle of same
             * radius
             *
             * @param circle1CenterPoint
             * @param circle2CenterPoint
             * @param radius
             * @returns {number}
             */
            circleIntersectArea: function (circle1CenterPoint, circle2CenterPoint, radius) {
                /*
                 * The intersection of two circle consists of two circular
                 * segments. Given that both circles have the same radius
                 * finding the area of one segment and multiplying by 2 will
                 * result in the area of the intersection area
                 */
                var distanceFromCenters = Math.sqrt(Math.pow((circle2CenterPoint.x - circle1CenterPoint.x), 2) +
                        Math.pow((circle2CenterPoint.y - circle1CenterPoint.y), 2)),
                    angleRadians = (2 * Math.acos(((distanceFromCenters / 2) / radius))),
                    intersectionArea = 0;
                // if no angles exists the circles donot intersect
                if (!angleRadians) {
                    return intersectionArea;
                }
                intersectionArea = (Math.pow(radius, 2) * (angleRadians - ((Math.sin(angleRadians)))));
                return intersectionArea;
            }
        };
    },

    Math: function () {
        "use strict";
        return {
            /**
             * Rounds numbers to 3 decimal places. Helps in mathcing the excel numbers to the javascript calcs
             * @param num
             * @returns {Number}
             */
            roundTo3Decimals: function (num) {
                return Math.round(num * Math.pow(10, 3)) / Math.pow(10, 3);
            },
            roundTo1Decimal: function (num) {
                return Math.round(num * Math.pow(10, 1)) / Math.pow(10, 1);
            },

            roundToXDecimal: function (num, x) {
                return Math.round(num * Math.pow(10, x)) / Math.pow(10, x);
            },

            POUNDS_PER_KG: 2.20462262,
            KGS_PER_POUND: 0.45359237,

            /**
             * Convert kilograms to pounds.
             * @param num
             * @returns {Number}
             */
            convertKgsToLbs: function (num) {
                return num * this.POUNDS_PER_KG;
            },

            /**
             * Convert pounds to kilograms.
             * @param num
             * @returns {Number}
             */
            convertLbsToKgs: function (num) {
                return num * this.KGS_PER_POUND;
            }
        };
    },

    PlaquePositioningHelper: function () {
        "use strict";
        var hexWidth = 10,
            sideLength = 6, // length of a side in pixels
            halfSideLength = 3,
            halfHexWidth = 5; // half the image width in pixels

        // private methods
        /**
         * Gets the relative distance between two points
         * the formula for distance requires sqrt but that is not efficient and not necessary
         * for relative distance
         *
         * @param {Object} circle2CenterPoint the first point to use in the check *
         * @param {Object} circle1CenterPoint the second point to use in the check
         * @return {number} decimal indicating the distance between the two points
         */
        function relativeDistanceBetweenTwoPoints(circle2CenterPoint, circle1CenterPoint) {
            return Math.pow((circle2CenterPoint.x - circle1CenterPoint.x), 2) +
                Math.pow((circle2CenterPoint.y - circle1CenterPoint.y), 2);
        }

        function getNearHexagonCenters(x, y) {
            var lowY = y - (y % (sideLength + halfSideLength)),
                highY = lowY + (sideLength + halfSideLength),
                lowX = x - (x % halfHexWidth),
                highX = lowX + halfHexWidth;
            return [
                {
                    x: lowX,
                    y: lowY
                },
                {
                    x: lowX,
                    y: highY
                },
                {
                    x: highX,
                    y: lowY
                },
                {
                    x: highX,
                    y: highY
                }
            ];
        }

        function getGridHexgonCentersNear(points) {
            var _threeSideLengths = (3 * sideLength),
                _onePointFiveSideLengths = (sideLength + halfSideLength),
                _points = [],
                i,
                _x,
                _y,
                _belongsToRow1,
                _belongsToRow2;
            for (i in points) {
                if (points.hasOwnProperty(i)) {
                    _x = points[i].x;
                    _y = points[i].y;
                    _belongsToRow1 = ((_y % _threeSideLengths === 0) && ((_x + halfHexWidth) % hexWidth) === 0);
                    _belongsToRow2 = ((_y - _onePointFiveSideLengths) % _threeSideLengths === 0) && (_x % hexWidth === 0);
                    if (_belongsToRow1 || _belongsToRow2) {
                        _points.push(points[i]);
                    }
                }
            }
            return _points;
        }

        function determinePointNearestToWhereIClicked(clickedLocation, closePoints) {
            var _min = 9999999,
                _minPoint,
                i,
                _distance;

            for (i in closePoints) {
                if (closePoints.hasOwnProperty(i)) {
                    _distance = relativeDistanceBetweenTwoPoints(closePoints[i], clickedLocation);
                    if (_distance < _min) {
                        _min = _distance;
                        _minPoint = closePoints[i];
                    }
                }
            }
            return _minPoint;
        }

        // public methods
        return {
            init: function (hexObjectInfo) {
                hexWidth = hexObjectInfo.width;
                sideLength = hexObjectInfo.sidelength;
                halfSideLength = hexObjectInfo.halfSideLength;
                halfHexWidth = hexObjectInfo.halfHexWidth;
            },

            GetNearestHexPosition: function (providedX, providedY) {
                var _centerPoint = this.GetNearestHexCenter(providedX, providedY),
                    _posX = _centerPoint.x - halfHexWidth,
                    _posY = _centerPoint.y - sideLength; // - 1
                return {
                    x: _posX,
                    y: _posY
                };
            },

            GetNearestHexCenter: function (providedX, providedY) {
                var _nearpoints = getGridHexgonCentersNear(getNearHexagonCenters(providedX, providedY));

                return determinePointNearestToWhereIClicked({
                    x: providedX,
                    y: providedY
                }, _nearpoints);
            }
        };

    },

    SliderHelper: function (_sliderId, _textBoxId, _minValue, _maxValue, _defaultValue) {
        "use strict";
        var sliderId = _sliderId,
            textBoxId = _textBoxId,
            minValue = _minValue,
            maxValue = _maxValue,
            defaultValue = _minValue, //make the default value the min value
            errorClass = 'error'; // make the default error class 'error';

        if (_defaultValue) {
            defaultValue = _defaultValue;
        }

        return {
            /**
             * Determines the value in the text field and updates the corresponding slider
             * control
             */
            setSliderValue: function () {
                var amount = $(textBoxId).val();
                $(sliderId).slider('option', 'value', amount);
                return amount;
            },

            clearError: function () {
                $(textBoxId).removeClass(errorClass);
            },

            addError: function () {
                $(textBoxId).addClass(errorClass);
            },

            setSliderValueWithValidation: function () {
                this.clearError();

                var amount = $(textBoxId).val();

                if (this.isTextBoxValueWithinRange()) {
                    $(sliderId).slider('option', 'value', amount);
                } else {
                    this.addError();
                }
                return $(sliderId).slider('value');
            },

            /**
             * Validates that the value being entered in the control is a number
             * @param e
             */
            inputValidation: function (e) {
                var charCode,
                    event = e || window.event;
                charCode = (e.which || window.event.which) ? event.which : event.keyCode;
                return charCode >= 48 && charCode <= 57;
            },

            /**
             * Resets the slider to the minimum
             */
            resetSlider: function () {
                $(sliderId).slider({
                    min: minValue, //minimum value
                    max: maxValue, //maximum value
                    value: defaultValue //default value
                });
                $(textBoxId).val($(sliderId).slider('value'));
                $(sliderId).slider('option', 'step', 1.0);
            },

            stabilize: function () {
                var amount = $(textBoxId).val();

                if (amount >= minValue && amount <= maxValue) {
                    $(textBoxId).val($(sliderId).slider('value'));
                }
            },

            isTextBoxValueWithinRange: function () {
                var amount = $(textBoxId).val();
                return amount >= minValue && amount <= maxValue;

            },

            setInputText: function(){
                $(textBoxId).text(defaultValue);
            }

        };
    },
    AppContext: function(){
        if (!JSON.parse(localStorage.getItem('patient')))
				localStorage.setItem('patient',JSON.stringify({id:'', value:''}));

        return {
			setPatient : function(patient){
				var prevId = this.getPatient().id;
				localStorage.setItem('patient',JSON.stringify(patient));
				if (prevId !== patient.id && patient.id) {
					this.resetAppContext();
				}
			},
            getPatient : function(){
				return  JSON.parse(localStorage.getItem('patient'));
			},
            resetAppContext : function(){
				localStorage.getItem('patient',"");
			}
        };
    }

};
