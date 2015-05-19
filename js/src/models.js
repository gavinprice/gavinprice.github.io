/*jslint nomen : true*/
/*jslint bitwise : true*/
/*jslint browser : true*/
/*global $, BodyAtlas, _, Backbone */
BodyAtlas.Model = {
    AffectedArea: Backbone.Collection.extend({
        model: this.PlaqueModel,

        /**
         * Function which returns a plaque from the collection if it
         * exist based on the x and y position
         *
         *            x: x-position of the point
         *            x y-position of the point
         * @return the plaque if exists. else it returns a plaque with
         *         x= -1 and y = -1 values
         */
        initialize: function () {
            "use strict";
            _.bindAll(this, "removeUsingPlaque", "clearAllPlaques", "removePlaqueAt", "removePlaque");

        },

        clearAllFlags: function () {
            "use strict";
            this.each(function (plaque) {
                plaque.clearFlag();
            });
        },

        getPlaqueIfExists: function (x, y) {
            "use strict";
            var _existingPlaque = new BodyAtlas.Model.PlaqueModel();
            _existingPlaque.set({
                'x': -1
            });
            _existingPlaque.set({
                'y': -1
            });

            this.each(function (plaque) {
                if ((plaque.get('x') === x) && plaque.get('y') === y) {
                    _existingPlaque = plaque;
                    return false;
                }
            });
            return _existingPlaque;
        },

        /**
         * Adds a plaque to the collection or updates it if it already
         * exist
         *
         * @param {Number} x position.
         * @param {Number} y position.
         * @param {Number} severity value representing the body severity.
         * @param {Number} location value representing the body location.
         * @return {string} Some return value.
         */
        addPlaque: function (x, y, severity, location) {
            "use strict";
            var _isNewPlaque = true,
                _newPlaque = this.getPlaqueIfExists(x, y);
            if ((_newPlaque.get('x') === x) && (_newPlaque.get('y') === y)) {
                _isNewPlaque = false;
            }

            // set all the values
            _newPlaque.set({
                'severity': severity
            });

            if (_isNewPlaque) {
                _newPlaque.set({
                    'x': x
                });
                _newPlaque.set({
                    'y': y
                });
                _newPlaque.set({
                    'bodyLocation': location
                });
                this.add(_newPlaque);
            }
            BodyAtlas.Logger.debug(_newPlaque.toJSON());
            return _newPlaque;
        },

        removePlaqueAt: function (x, y) {
            "use strict";
            var _isExistingPlaque = false,
            //check if the plaque exists
                _existingPlaque = this.getPlaqueIfExists(x, y);
            if ((_existingPlaque.get('x') === x) && (_existingPlaque.get('y') === y)) {
                _isExistingPlaque = true;
            }

            if (_isExistingPlaque) {
                this.removePlaque(_existingPlaque);
            }
        },
        /*removes the plaque that is passed in*/
        removePlaque: function (_existingPlaque) {
            "use strict";
            if (_existingPlaque.view !== null) {
                _existingPlaque.view.removeFromDom();
            }

            this.remove(_existingPlaque); //removes the plaque from the collection
        },

        reducePlaqueAt: function (x, y) {
            "use strict";
            var MIN_SEVERITY = 0,
                _isExistingPlaque = false,
                _newSeverity,
                _isFlagged,
            //check if the plaque exists
                _existingPlaque = this.getPlaqueIfExists(x, y);
            if ((_existingPlaque.get('x') === x) && (_existingPlaque.get('y') === y)) {
                _isExistingPlaque = true;
            }

            //get the incremented severity of the plaque
            _newSeverity = _existingPlaque.get('severity') - 1;

            //check if flagged
            _isFlagged = _existingPlaque.get('flagged');
            //if it is valid to increase the severity then do it
            if (!_isFlagged && _isExistingPlaque) {
                if (_newSeverity > MIN_SEVERITY) {
                    _existingPlaque.set({
                        'severity': _newSeverity
                    });
                    _existingPlaque.flag();
                } else {
                    this.removePlaqueAt(x, y);
                }

            }
        },

        increasePlaqueAt: function (x, y, location) {
            "use strict";
            var MAX_SEVERITY = 6,
                _isExistingPlaque = false,
                _newSeverity,
                _isFlagged,
                //check if the plaque exists
                _existingPlaque = this.getPlaqueIfExists(x, y);
            if ((_existingPlaque.get('x') === x) && (_existingPlaque.get('y') === y)) {
                _isExistingPlaque = true;
            }

            if (_isExistingPlaque) {//if the plaque does not exist then add a new plaque
                //the the incremented severity of the plaque
                _newSeverity = _existingPlaque.get('severity') + 1;
                _isFlagged = _existingPlaque.get('flagged');
                //if it is valid to increase the severity then do it
                if (!_isFlagged && _newSeverity <= MAX_SEVERITY) {
                    _existingPlaque.set({
                        'severity': _newSeverity
                    });
                    _existingPlaque.flag();
                }
            } else {
                this.addPlaque(x, y, 1, location).flag();
            }
        },

        /**
         * Parses the collection data and returns information about the
         * covered area in regions
         *
         * @return {object} Object containing information for each
         *         region
         */
        getCoverageData: function () {
            "use strict";
            var HEAD_REGION = 0,
                TRUNK_REGION = 2,
                ARM_REGION = 1,
                LEG_REGION = 3,
                regionData = {
                    head: {
                        plaqueCount: 0,
                        severities: []
                    },
                    trunk: {
                        plaqueCount: 0,
                        severities: []
                    },
                    legs: {
                        plaqueCount: 0,
                        severities: []
                    },
                    arms: {
                        plaqueCount: 0,
                        severities: []
                    }
                };

            this.each(function (plaque) {
                var loc = plaque.get("bodyLocation"),
                    severity = plaque.get("severity"),
                    region;
                switch (loc) {
                case HEAD_REGION:
                    regionData.head.plaqueCount += 1;
                    region = regionData.head;
                    break;
                case TRUNK_REGION:
                    regionData.trunk.plaqueCount += 1;
                    region = regionData.trunk;
                    break;
                case LEG_REGION:
                    regionData.legs.plaqueCount += 1;
                    region = regionData.legs;
                    break;
                case ARM_REGION:
                    regionData.arms.plaqueCount += 1;
                    region = regionData.arms;
                    break;
                }
                region.severities.push(severity);
            });
            return regionData;
        },

        removeUsingPlaque: function (plaque) {
            "use strict";
            var x,
                y;
            x = plaque.get('x');
            y = plaque.get('y');
            this.removePlaqueAt(x, y);
            return true;
        },

        /**
         * this is Obsolete Method which is no longer used.
         * The method Clears all the plaques from the body by moving each plaque from the model
         */
        clearAllPlaques: function () {
            "use strict";
            var _numPlaques = this.length,
                _index,
                _plaque;
            for (_index = _numPlaques - 1; _index >= 0; _index -= 1) {
                _plaque = this.at(_index);
                this.removePlaque(_plaque);
            }
        }

    }),

    Gender: {
        MALE: 0,
        FEMALE: 1
    },
    YesNo: {
        NO: 0,
        YES: 1
    },
    KgsLbs: {
        KGS: 0,
        LBS: 1
    },
    InitStatus: {
        START: 0,
        EDIT: 1
    },
    PatientModel: Backbone.Model.extend({
        defaults: {
            name: "",
            gender: 0,
            age: 18,
            weight: 20, /* always in kgs */
            actualWeight: 20, /* may be in kgs or lbs, default unit is kgs */
            weightUnit: 0,
            initState: 0,
            employed: 0,
            duration: 0,
            pain: 0,
            itch: 0
        },
        initialize: function (options) {
            "use strict";
            this.eventBus = options.eventBus;

            if (!(this.getDuration())) {
                this.setDuration(this.defaults.duration);
            }

            if (!(this.getEmployed())) {
                this.setEmployed(this.defaults.employed);
            }

            if (!(this.getWeight())) {
                this.setWeight(this.defaults.weight);
            }

            if (!(this.getActualWeight())) {
                this.setActualWeight(this.defaults.actualWeight);
            }

            if (!(this.getWeightUnit())) {
                this.setWeightUnit(this.defaults.weightUnit);
            }
            if (!(this.getInitState())) {
                this.setInitState(this.defaults.initState);
            }

            if (!(this.getAge())) {
                this.setAge(this.defaults.age);
            }

            if (!(this.getGender())) {
                this.setGender(this.defaults.gender);
            }

            if (!(this.getPain())) {
                this.setPain(this.defaults.gender);
            }

            if (!(this.getItch())) {
                this.setItch(this.defaults.gender);
            }

            if (!(this.getName())) {
                this.setGender(this.defaults.name);
            }

            this.bind('change', this.attributeChanged);
        },

        getName: function () {
            "use strict";
            return this.get('name');
        },

        getGender: function () {
            "use strict";
            return this.get('gender');
        },

        getAge: function () {
            "use strict";
            return this.get('age');
        },

        getWeight: function () {
            "use strict";
            return Math.round(this.get('weight'));
        },

        getActualWeight: function () {
            "use strict";
            return this.get('actualWeight');
        },

        getWeightUnit: function () {
            "use strict";
            return this.get('weightUnit');
        },

        getInitState: function () {
            "use strict";
            return this.get('initState');
        },

        getDuration: function () {
            "use strict";
            return this.get('duration');
        },

        getEmployed: function () {
            "use strict";
            return this.get('employed');
        },

        getPain: function () {
            "use strict";
            return this.get('pain');
        },

        getItch: function () {
            "use strict";
            return this.get('itch');
        },

        setName: function (name) {
            "use strict";
            this.set({ 'name': name });
        },

        setGender: function (gender) {
            "use strict";
            this.set({ 'gender': gender });
            this.eventBus.trigger('GenderChanged', this.getGender());
        },

        setAge: function (age) {
            "use strict";
            this.set({ 'age': age });
        },

        setWeight: function (weight) {
            "use strict";
            this.set({ 'weight': weight });
        },

        setActualWeight: function (actualWeight) {
            "use strict";
            this.set({ 'actualWeight': actualWeight });
        },

        setWeightUnit: function (weightUnit) {
            "use strict";
            this.set({ 'weightUnit': weightUnit });
        },

        setInitState: function (initState) {
            "use strict";
            this.set({ 'initState': initState });
        },

        setDuration: function (duration) {
            "use strict";
            this.set({ 'duration': duration });
        },

        setEmployed: function (employed) {
            "use strict";
            this.set({ 'employed': employed });
        },

        setPain: function (pain) {
            "use strict";
            this.set({ 'pain': pain });
        },

        setItch: function (itch) {
            "use strict";
            this.set({ 'itch': itch });
        },

        attributeChanged: function () {
            "use strict";
            this.eventBus.trigger(BodyAtlas.EventNames.PatientUpdate, this);
        }

    }),

    PlaqueModel: Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0,
            bodyLocation: 0,
            severity: 0,
            flagged: false
        },

        initialize: function () {
            "use strict";
            if (!this.get("x")) {
                this.set({
                    "x": this.defaults.x
                });
            }

            if (!this.get("y")) {
                this.set({
                    "y": this.defaults.y
                });
            }

            if (!this.get("bodyLocation")) {
                this.set({
                    "bodyLocation": this.defaults.bodyLocation
                });
            }

            if (!this.get("severity")) {
                this.set({
                    "severity": this.defaults.severity
                });
            }
            if (!this.get("flagged")) {
                this.set({
                    "flagged": this.defaults.flagged
                });
            }
        },
        flag: function () {
            "use strict";
            this.set({ 'flagged': true });
        },

        clearFlag: function () {
            "use strict";
            this.set({ 'flagged': false });
        }
    }),
    BrushLevel: {
        LEVLE1: 1,
        LEVLE2: 2,
        LEVLE3: 3,
        LEVLE4: 4,
        LEVLE5: 5,
        LEVLE6: 6,
        INCREASE: 7,
        REDUCE: 8,
        REMOVE: 9
    },
    PalletteSelection: Backbone.Model.extend({
        defaults: {
            severityBrushLevel: 1
        },
        initialize: function (options) {
            "use strict";
            this.eventBus = options.eventBus;

            if (!(this.getBrushLevel())) {
                this.setBrushLevel(this.defaults.severityBrushLevel);
            }
        },

        getBrushLevel: function () {
            "use strict";
            return this.get('brushlevel');
        },

        setBrushLevel: function (level) {
            "use strict";
            this.set({ 'brushlevel': level });
            this.eventBus.trigger('brushChanged', level);
        }
    }),

    /**
     * DLQI Input model. Marshalls the inputs from patient and the body graph
     * and send to the list of models.
     */
    DLQIInput: Backbone.Model.extend({
        /**
         * random default values
         * TO-DO:update to 0?
         */
        defaults: {
            inputs: {
                Age: 18,
                Female: 0,
                Weight: 20,
                Pruritis: 0,
                Pain: 0,
                PsoriaticArthritis: 1,
                PsoriasisDuration: 0,
                HeadScore: 0,
                HeadArea: 0,
                UpperLimbScore: 0,
                UpperLimbArea: 0,
                TrunkScore: 0,
                TrunkArea: 0,
                LowerLimbScore: 0,
                LowerLimbArea: 0
            }
        },

        initialize: function (options) {
            "use strict";
            this.eventBus = options.eventBus;

            if (options.input) {
                this.set({ "inputs": options.inputs });
            } else {
                this.set({ "inputs": this.defaults.inputs });
            }

            _.bindAll(this, "processPatientinput", "processPASIinput", "calculateItchPrediction", "calculatePainPrediction");
            options.eventBus.bind(BodyAtlas.EventNames.PASIUpdate, this.processPASIinput);
            options.eventBus.bind(BodyAtlas.EventNames.PatientUpdate, this.processPatientinput);
            options.eventBus.bind(BodyAtlas.EventNames.ItchPrediction, this.calculateItchPrediction);
            options.eventBus.bind(BodyAtlas.EventNames.PainPrediction, this.calculatePainPrediction);
        },

        processPatientinput: function (updatedPatient) {
            "use strict";
            var _inputs = this.get("inputs");

            _inputs.Age = updatedPatient.getAge();
            _inputs.Female = updatedPatient.getGender();
            _inputs.Weight = updatedPatient.getWeight();
            _inputs.Pruritis = updatedPatient.getItch();
            _inputs.Pain = updatedPatient.getPain();
            _inputs.PsoriasisDuration = updatedPatient.getDuration();
            if (updatedPatient.getEmployed() === BodyAtlas.Model.YesNo.YES) {
                _inputs.Employed = 1;
            } else {
                _inputs.Employed = 0;
            }

            this.eventBus.trigger(BodyAtlas.EventNames.RecalculateGraphs, _inputs);
        },

        processPASIinput: function (updatedPASI) {
            "use strict";
            var _inputs = this.get("inputs");

            _inputs.HeadScore = updatedPASI.HeadScore;
            _inputs.HeadArea = updatedPASI.HeadArea;
            _inputs.UpperLimbScore = updatedPASI.UpperLimbScore;
            _inputs.UpperLimbArea = updatedPASI.UpperLimbArea;
            _inputs.TrunkScore = updatedPASI.TrunkScore;
            _inputs.TrunkArea = updatedPASI.TrunkArea;
            _inputs.LowerLimbScore = updatedPASI.LowerLimbScore;
            _inputs.LowerLimbArea = updatedPASI.LowerLimbArea;

            this.eventBus.trigger(BodyAtlas.EventNames.RecalculateGraphs, _inputs);
        },

        calculateItchPrediction: function () {
            "use strict";
            var _inputs = this.get("inputs"),
                score = 0;
            if (_inputs.Female === 0) {

                score = 1.76041980619506 + (_inputs.Age * 0.007505576487649) + (-0.7762995909968) + (_inputs.Weight * 0.002339766380975) + (_inputs.PsoriasisDuration * -0.013946138216876) + (_inputs.HeadScore * 0.6995138420686) + (_inputs.UpperLimbScore * 0.29348159650358) + (_inputs.TrunkScore * 0.099521178270647) + (_inputs.LowerLimbScore * 0.2517902501074);
            } else {
                score = 1.76041980619506 + (_inputs.Age * 0.007505576487649) + (_inputs.Weight * 0.002339766380975) + (_inputs.PsoriasisDuration * -0.013946138216876) + (_inputs.HeadScore * 0.6995138420686) + (_inputs.UpperLimbScore * 0.29348159650358) + (_inputs.TrunkScore * 0.099521178270647) + (_inputs.LowerLimbScore * 0.2517902501074);
            }
            score = Math.round(score);
            if (score > 10) {
                score = 10;
            }

            $('#txtItch').val(score);
            $('#sliderItch').children().attr('style', 'left:' + (score * 10) + '%;');
            this.eventBus.trigger(BodyAtlas.EventNames.ItchUpdate, score);
        },

        calculatePainPrediction: function () {
            "use strict";
            var _inputs = this.get("inputs"),
                score = 0;

            if (_inputs.Female === 0) {

                score = (8.44589411785874 + (_inputs.Age * 0.047904627588226) + (-6.18151345923435) + (_inputs.Weight * 0.027703431068545) + (_inputs.PsoriasisDuration * -0.11209107512859) + (_inputs.HeadScore * 3.79539458716651) + (_inputs.UpperLimbScore * 2.19848391006327) + (_inputs.TrunkScore * 0.93352633288271) + (_inputs.LowerLimbScore * 1.38380609796297));
            } else {
                score = (8.44589411785874 + (_inputs.Age * 0.047904627588226) + (_inputs.Weight * 0.027703431068545) + (_inputs.PsoriasisDuration * -0.11209107512859) + (_inputs.HeadScore * 3.79539458716651) + (_inputs.UpperLimbScore * 2.19848391006327) + (_inputs.TrunkScore * 0.93352633288271) + (_inputs.LowerLimbScore * 1.38380609796297));
            }
            score = Math.round(score / 10);
            if (score > 10) {
                score = 10;
            }
            $('#txtPain').val(score);
            $('#sliderPain').children().attr('style', 'left:' + (score * 10) + '%;');
            this.eventBus.trigger(BodyAtlas.EventNames.PainUpdate, score * 10);
        }
    }),

    /**
     * QOLIndividual is a model for individual quality of life graphs
     */
    QOLIndividual: Backbone.Model.extend({

        /**
         * random default values
         * TO-DO:update to 0?
         */
        defaults: {
            id: '0',
            name: 'no name',
            coefficients: {},
            calculator: {},
            display: true,
            percentage: 10
        },

        initialize: function (options) {
            "use strict";
            _.bindAll(this, "toObjectLiteral", "calculatePercentage");

            if (options.name) {
                this.set({ name: options.name });
            }

            if (options.coefficients) {
                this.set({ coefficients: options.coefficients });
            }

            this.set({ calculator: new BodyAtlas.DLQI.DLQIIndividualPredictor(
                this.get('name'),
                this.get('coefficients'),
                options.inputs
            )});


            if (options.inputs) {
                this.set({ input: options.inputs });
            }
            if (options.id) {
                this.set({ 'id': options.Id });
            }

            if (options.display) {
                this.set({ 'display': options.display });
            } else {
                this.set({ 'display': this.defaults.display });
            }
        },

        calculatePercentage: function (input) {
            "use strict";
            var _calculator = this.get('calculator'),
                _percentage = _calculator.convertQOLNormalIndicatorToPercentageResults(_calculator.calcQOLRawScores(this.get('coefficients'), input));

            this.set({ display: true });
            //if this is the work productivity graph
            if (this.get('id') === 2) {
                if (!input.Employed) {
                    this.set({ display: false });
                }
            }

            this.set({ percentage: _percentage });

            return _percentage;
        },

        toObjectLiteral: function () {
            "use strict";
            var cssBubbleContainerId = '',
                cssBubbleTextId = '',
                cssBubbleIconId = '',
                infoText = '';

            if (this.get('id') === 1) {
                cssBubbleContainerId = 'activities-bubble-container';
                cssBubbleTextId = 'activities-bubble';
                cssBubbleIconId = 'activities-bubble-icon';
                infoText = 'Daily activity means the usual activities you do, such as work around the house, shopping, childcare, exercising, studying, etc.';
            } else if (this.get('id') === 2) {
                cssBubbleContainerId = 'work-productivity-bubble-container';
                cssBubbleTextId = 'work-productivity-bubble';
                cssBubbleIconId = 'work-productivity-bubble-icon';
                infoText = 'Work productivity means the amount or the kind of work that you can do or accomplish on a regular day.';
            }

            return {
                id: this.get('id'),
                name: this.get('name'),
                percentage: this.get('percentage'),
                displayedPercentage: Math.round(this.get('percentage')),
                cssBubbleContainerId: cssBubbleContainerId,
                cssBubbleTextId: cssBubbleTextId,
                cssBubbleIconId: cssBubbleIconId,
                infoText: infoText
            };
        }
    }),

    /**
     * Represents a collection for QOL graphs
     */
    QOLIndividualModelList: Backbone.Collection.extend({
        model: this.QOLIndividual,

        initialize: function (options) {
            "use strict";
            _.bindAll(this, "refresh");
            this.eventBus = options.eventBus;
            options.eventBus.bind(BodyAtlas.EventNames.RecalculateGraphs, this.refresh);
            this.models = [];

        },

        /**
         * Temporary function to update the model/ui based on inpuy
         * @param options
         */
        refresh: function (options) {
            "use strict";
            //Should call recalculatePercentags to update individual grpahs
            //then trigger event to update aggregatedlqi graphs
            var _activityScore = 0,
                _productivityScore = 0;
            _.each(this.models, function (qolGraph) {
                var _percentage = qolGraph.calculatePercentage(options);
                if (qolGraph.get('id') === 1) {
                    _activityScore = _percentage;
                }
                if (qolGraph.get('id') === 2) {
                    _productivityScore = _percentage;
                }
            });
            this.eventBus.trigger(BodyAtlas.EventNames.OQLActivityProductivityUpdate, { 'Activity': Math.round(_activityScore), 'Productivity': Math.round(_productivityScore) });
        }
    }),

    /**
     * DLQIIndividual is a model for individual dlqi graphs
     */
    DLQIIndividual: Backbone.Model.extend({

        /**
         * random default values
         * TO-DO:update to 0?
         */
        defaults: {
            id: '0',
            name: 'no name',
            highPercent: 10,
            lowPercent: 20,
            midPercent: 30,
            coefficients: {},
            calculator: {},
            percentages: {}
        },

        initialize: function (options) {
            "use strict";
            _.bindAll(this, "toObjectLiteral", "calculatePercentages");

            if (options.name) {
                this.set({ name: options.name });
            }

            if (options.coefficients) {
                this.set({ coefficients: options.coefficients });
            }

            this.set({ calculator: new BodyAtlas.DLQI.DLQIIndividualPredictor(
                this.get('name'),
                this.get('coefficients'),
                options.inputs
            )});

            if (options.inputs) {
                this.set({ input: options.inputs });
            }
            if (options.id) {
                this.set({ 'id': options.Id });
            }

        },

        calculatePercentages: function (input) {
            "use strict";
            var _calculator = this.get('calculator'),
                _percentages = _calculator.convertNormalIndicatorToPercentagesResults(_calculator.calcRawScores(this.get('coefficients'), input));

            this.set({ percentages: _percentages });
            this.set({ highPercent: _.select(_percentages, function (vo) {
                return _.isEqual(vo.Value, _calculator.scoreType().VERY_MUCH);
            })[0].Percentage });
            this.set({ midPercent: _.select(_percentages, function (vo) {
                return _.isEqual(vo.Value, _calculator.scoreType().A_LOT);
            })[0].Percentage });
            this.set({ lowPercent: _.select(_percentages, function (vo) {
                return _.isEqual(vo.Value, _calculator.scoreType().A_LITTLE);
            })[0].Percentage });

            return _percentages;
        },

        toObjectLiteral: function () {
            "use strict";
            return {
                id: this.get('id'),
                name: this.get('name'),
                highPercent: this.get('highPercent'),
                lowPercent: this.get('lowPercent'),
                midPercent: this.get('midPercent')
            };
        },

        toPercentages: function () {
            "use strict";
            return this.get('percentages');
        }
    }),


    /**
     * Represents a collection for DLQI graphs
     */
    DLQIIndividualModelList: Backbone.Collection.extend({
        model: this.DLQIIndividual,

        initialize: function (options) {
            "use strict";
            _.bindAll(this, "refresh");
            this.eventBus = options.eventBus;
            options.eventBus.bind(BodyAtlas.EventNames.RecalculateGraphs, this.refresh);
            this.models = [];

        },

        /**
         * Temporary function to update the model/ui based on inpuy
         * @param options
         */
        refresh: function (options) {
            "use strict";
            //Should call recalculatePercentags to update individual grpahs
            //then trigger event to update aggregatedlqi graphs
            var _percentages = [];
            _.each(this.models, function (dlqi) {
                _percentages.push(dlqi.calculatePercentages(options));
            });

            // uncomment when invidual gaphs are working.
            this.eventBus.trigger(BodyAtlas.EventNames.DLQIIndividualCalculationsUpdated, _percentages);
        }
    }),

    AggregateScoreModel: Backbone.Model.extend({
        defaults: {
            pASIScore: 0,
            coverage: 0
        },
        initialize: function (options) {
            "use strict";
            _.bindAll(this, "setCoverageAndPASIScore");

            //set defaults or values passed to the constructor
            if (!options.pASIScore) {
                this.set({ "pASIScore": this.defaults.pASIScore });
            } else {
                this.set({ "pASIScore": options.pASIScore });
            }

            if (!options.coverage) {
                this.set({ "coverage": this.defaults.coverage });
            } else {
                this.set({ "coverage": options.coverage });
            }

            this.eventBus = options.eventBus;
            options.eventBus.bind(BodyAtlas.EventNames.RecalculateGraphs, this.setCoverageAndPASIScore);
        },

        setCoverageAndPASIScore: function (inputs) {
            "use strict";
            var _predictor = new BodyAtlas.DLQI.DLQIIndividualPredictor("PASI", {}, inputs),
                //get and set updated PASI Score
                _pASIScore = Math.round(_predictor.calculateAdjustedPASI(inputs)),
                _coverage;
            this.set({ "pASIScore": _pASIScore });

            //get and set updated Coverage
            _coverage = Math.round(_predictor.calculateTotalCoverage(inputs));
            this.set({ "coverage": _coverage });

            this.eventBus.trigger(BodyAtlas.EventNames.AggregateScoreUpdate, { 'Coverage': _coverage, 'PasiScore': _pASIScore });

        }
    }),

    DLQIAggregateModel: Backbone.Model.extend({

        defaults: {
            QOLEffect: "No Effect",
            QOLValue: 0
        },

        initialize: function (options) {
            "use strict";
            _.bindAll(this, "refresh", "toObjectLiteral");

            this.eventBus = options.eventBus;

            if (!options.QOLEffect) {
                this.set({ "QOLEffect": this.defaults.QOLEffect });
            } else {
                this.set({ "QOLEffect": options.QOLEffect });
            }

            if (!options.QOLValue) {
                this.set({ "QOLValue": this.defaults.QOLValue });
            } else {
                this.set({ "QOLValue": options.QOLValue });
            }

            if (!options.calculator) {
                this.set({ "calculator": new BodyAtlas.DLQI.DLQIAggregateCalculator() });
            } else {
                this.set({ "calculator": options.calculator });
            }

            this.eventBus.bind(BodyAtlas.EventNames.DLQIIndividualCalculationsUpdated, this.refresh);
        },

        refresh: function (individualResults) {
            "use strict";
            var _calculator = this.get('calculator'),
                _calculationValue = _calculator.calculateAggreagateDLQI(individualResults),
                _calculationEffect = _calculator.determineQOLEffect(_calculationValue);
            this.set({ 'QOLValue': _calculationValue });
            this.set({ 'QOLEffect': _calculationEffect });
            this.eventBus.trigger(BodyAtlas.EventNames.OQLAggregateScoreUpdate, { 'OQLAggregateScore': _calculationValue, 'OQLEffect': _calculationEffect });
        },

        toObjectLiteral: function () {
            "use strict";
            return { QOLValue: this.get('QOLValue'), QOLEffect: this.get('QOLEffect') };
        }
    })
};
