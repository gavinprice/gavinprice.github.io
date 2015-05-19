/*jslint node: true */
/*jslint es5: true */
/*jslint nomen : true*/
/*jslint browser : true*/
/*jslint devel : true*/
/*jslint bitwise : true*/
/*global describe, before, after, _, it, expect, $, jasmine, App, loadFixtures, xdescribe, xit, require, process, _bodyAtlas_ */
/*
 * Selenium WebDriver JavaScript test with Mocha and NodeJS
 * 
 * Start with: SELENIUM=PATH_TO_SELENIUM_JAR/selenium-server-standalone-2.31.0.jar mocha -t 10000 -R list google-sample.js
 * 
 * Download selenium-server-standalone-2.31.0.jar from https://selenium.googlecode.com/files/selenium-server-standalone-2.31.0.jar
 * 'sudo su' and 'npm install -g colors mocha selenium-webdriver'
 * 
 * http://visionmedia.github.io/mocha/
 * https://code.google.com/p/selenium/wiki/WebDriverJs
 * https://github.com/marak/colors.js/
 * 
 * @author Ferron Hanse
 */
var fs = require('fs'),
    webdriver = require('selenium-webdriver'),
    colors = require('colors'),
    chai = require('chai'),
    _ = require('lodash/dist/lodash.underscore'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert,
    driver,
    testServer = 'http://localhost:8000/index.html',
    seleniumServer = 'http://localhost:4444/wd/hub',
    browserType = {
        fast: 'phantomjs',
        firefox: 'firefox',
        chrome: 'chrome'
    };

// run it once before tests
before(function (done) {
    "use strict";
    driver = new webdriver
        .Builder()
        .usingServer(seleniumServer)
        .withCapabilities({'browserName': browserType.firefox }).build();

    // error handling - if you want do st
//    process.on('uncaughtException', function (err) {
//        console.log("My error handler... " + err);
//
//        if (driver) {
//            //recording screenshot
//            driver.takeScreenshot().then(function (img) {
//                var name = Math.random().toString(36).substr(2, 9);
//                fs.writeFileSync(__dirname + "/error/" + name + ".png", new Buffer(img, 'base64'));
//            });
//        }
//    });

    // using custom template delimiters
    _.templateSettings = {
        'interpolate': /\{\{([\s\S]+?)\}\}/g
    };

    // open start page
    driver.get(testServer).then(function () {
        console.log("opening " + testServer + " ...");
        done();
    });

});

// run it once after tests
after(function (done) {
    "use strict";
    // works with promise
    driver.quit().then(done);
});

// tests
//describe.skip('Google Search', function () {
//    "use strict";
//    it('should work', function (done) {
//
//        var searchBox = driver.findElement(webdriver.By.name('q'));
//        searchBox.sendKeys('webdriver\n').then(function () {
//            return searchBox.getAttribute('value');
//        }).then(function (value) {
//                assert.equal(value, 'webxdriver');
//                done();
//            });
//    });
//});

describe.skip('Testing Start Up Configuration', function () {
    "use strict";

    it('should properly set default values', function () {
        driver.navigate().refresh().then(function () {
            driver.findElement(webdriver.By.id('txtAge')).getAttribute('value').then(function (value) {
                expect(value).to.be.equal('56');
                driver.findElement(webdriver.By.id('txtDuration')).getAttribute('value').then(function (value) {
                    expect(value).to.be.equal('36');
                    driver.findElement(webdriver.By.id('txtWeight')).getAttribute('value').then(function (value) {
                        expect(value).to.be.equal('124');
                        driver.findElement(webdriver.By.id('weightUnitLbs')).click(); // select lbs as weight unit
                        driver.findElement(webdriver.By.id('txtWeight')).getAttribute('value').then(function (value) {
                            expect(value).to.be.equal('273');
                        });
                    });
                });
            });
        });
    });

    it('should properly represent data in the patient information section after clicking start', function () {
        var age = '63',
            weight = '340',
            duration = '49';

        driver.navigate().refresh().then(function () {
            driver.findElement(webdriver.By.id('genderFemale')).click(); // select female
            driver.findElement(webdriver.By.id('employedNo')).click(); // select not employed
            driver.findElement(webdriver.By.id('weightUnitLbs')).click(); // select lbs as weight unit

            driver.findElement(webdriver.By.id('txtAge')).sendKeys('\uE003\uE003' + age + '\n').then(function () {
                driver.findElement(webdriver.By.id('txtWeight')).sendKeys('\uE003\uE003\uE003' + weight + '\n').then(function () {
                    driver.findElement(webdriver.By.id('txtDuration')).sendKeys('\uE003\uE003\uE003\uE003' + duration + '\n').then(function () {
                        driver.findElement(webdriver.By.id('txtAge')).getAttribute('value').then(function (value) {
                            expect(value).to.be.equal(age);
                            driver.findElement(webdriver.By.id('txtWeight')).getAttribute('value').then(function (value) {
                                expect(value).to.be.equal(weight);
                                driver.findElement(webdriver.By.id('txtDuration')).getAttribute('value').then(function (value) {
                                    expect(value).to.be.equal(duration);
                                    driver.findElement(webdriver.By.id('btnStart')).click();

                                    //validate patient information gets persisted to the view
                                    driver.findElement(webdriver.By.id('lAge')).getText().then(function (value) {
                                        expect(value).to.be.equal(_.template('{{ age }} years', { 'age': age }));
                                        driver.findElement(webdriver.By.id('lPsoriasisDuration')).getText().then(function (value) {
                                            expect(value).to.be.equal(_.template('{{ duration }} years', { 'duration': duration }));
                                            driver.findElement(webdriver.By.id('lWeight')).getText().then(function (value) {
                                                expect(value).to.be.equal(_.template('{{ weight }} lbs', { 'weight': weight }));
                                                driver.findElement(webdriver.By.id('lGender')).getText().then(function (value) {
                                                    expect(value).to.be.equal('Female');
                                                    driver.findElement(webdriver.By.id('lEmployed')).getText().then(function (value) {
                                                        expect(value).to.be.equal('No');
                                                    });
                                                });
                                            });
                                        });
                                    });

                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('should display mouse location', function () {
        driver.executeScript(function () {
            window.scrollTo(0, 0);
            return window.scrollY;
        }).then(function (value) {
            expect(value).to.be.equal(0);
        });
    });

});

describe.skip('Testing Basic Navigation of Application', function () {
    "use strict";

    it('patientInfoPopup should be visible when the page loads', function () {
        driver.findElement(webdriver.By.id('patientInfoPopup')).isDisplayed().then(function (value) {
            expect(value).to.be.equal(true);
        });
    });

    it('should hide patientInfoPopup when the start button is clicked', function () {
        driver.findElement(webdriver.By.id('btnStart')).click();
        driver.findElement(webdriver.By.id('patientInfoPopup')).isDisplayed().then(function (value) {
            expect(value).to.be.equal(false);
        });
    });

    it("should see a start value of 0 for the numberOfJointsSelected", function () {
        driver.findElement(webdriver.By.id('numberOfJointsSelected')).getText().then(function (value) {
            expect(value).to.be.equal("0");
        });
    });

    it('should increment the number of numberOfJointsSelected count when a joint is clicked', function () {
        driver.findElement(webdriver.By.id('joint1')).click();
        driver.findElement(webdriver.By.id('joint2')).click();
        driver.findElement(webdriver.By.id('numberOfJointsSelected')).getText().then(function (value) {
            expect(value).to.be.equal("2");
        });
    });

    it('should decrement the number of numberOfJointsSelected count when a joint is clicked', function () {
        driver.findElement(webdriver.By.id('joint1')).click();
        driver.findElement(webdriver.By.id('joint2')).click();
        driver.findElement(webdriver.By.id('numberOfJointsSelected')).getText().then(function (value) {
            expect(value).to.be.equal("0");
        });
    });

    it('should not show sternum on start up', function () {
        driver.findElement(webdriver.By.id('sternum-skeleton')).isDisplayed().then(function (value) {
            expect(value).to.be.equal(false);
        });
    });

    it('should show sternum zoomed view after clicking joint3', function () {
        driver.findElement(webdriver.By.id('joint3')).click();
        driver.findElement(webdriver.By.id('sternum-skeleton')).isDisplayed().then(function (value) {
            expect(value).to.be.equal(true);
            // clicking the done button should hide the screen
            driver.findElement(webdriver.By.className('zoom-out-sternon')).click();
            driver.findElement(webdriver.By.id('sternum-skeleton')).isDisplayed().then(function (val) {
                expect(val).to.be.equal(false);
            });
        });
    });

    it('should show feet zoomed view after clicking joint19', function () {
        driver.findElement(webdriver.By.id('joint18')).click();
        driver.findElement(webdriver.By.id('feet-skeleton')).isDisplayed().then(function (value) {
            expect(value).to.be.equal(true);
            // clicking the done button should hide the screen
            driver.findElement(webdriver.By.className('zoom-out-feet')).click();
            driver.findElement(webdriver.By.id('feet-skeleton')).isDisplayed().then(function (val) {
                expect(val).to.be.equal(false);
            });
        });
    });


    it('should show hands zoomed view after clicking joint19', function () {
        driver.findElement(webdriver.By.id('joint13')).click();
        driver.findElement(webdriver.By.id('hands-skeleton')).isDisplayed().then(function (value) {
            expect(value).to.be.equal(true);
            // clicking the done button should hide the screen
            driver.findElement(webdriver.By.className('zoom-out-hands')).click();
            driver.findElement(webdriver.By.id('hands-skeleton')).isDisplayed().then(function (val) {
                expect(val).to.be.equal(false);
            });
        });
    });

    it('should should show selected joint count for feet and hands', function () {
        driver.findElement(webdriver.By.id('joint12')).click(); // open hands zoomed view
        driver.findElement(webdriver.By.id('joint54')).click(); // click a joint on left hand
        driver.findElement(webdriver.By.id('joint57')).click(); // click a joint on right hand
        driver.findElement(webdriver.By.className('zoom-out-hands')).click(); // close view

        driver.findElement(webdriver.By.id('joint18')).click(); // open hands zoomed view
        driver.findElement(webdriver.By.id('joint77')).click(); // click a joint on left hand
        driver.findElement(webdriver.By.id('joint78')).click(); // click a joint on right hand
        driver.findElement(webdriver.By.className('zoom-out-feet')).click(); // close view

        driver.findElement(webdriver.By.id('numberOfJointsSelected')).getText().then(function (value) {
            expect(value).to.be.equal("4");
        });

        // check the hands + feet joint selection count
        driver.findElement(webdriver.By.id('left-hand-selectedJoints')).getText().then(function (value) {
            expect(value).to.be.equal("1", 'all left hand joints selected');
            driver.findElement(webdriver.By.id('right-hand-selectedJoints')).getText().then(function (value) {
                expect(value).to.be.equal("1", 'all right hand joints selected');
                driver.findElement(webdriver.By.id('left-foot-selectedJoints')).getText().then(function (value) {
                    expect(value).to.be.equal("1", 'all left foot joints selected');
                    driver.findElement(webdriver.By.id('right-foot-selectedJoints')).getText().then(function (value) {
                        expect(value).to.be.equal("1", 'all right foot joints selected');
                    });
                });
            });
        });

        driver.navigate().refresh().then(function () {
            driver.findElement(webdriver.By.id('btnStart')).click();
            driver.findElement(webdriver.By.id('patientInfoPopup')).isDisplayed().then(function (value) {
                expect(value).to.be.equal(false);

                driver.findElement(webdriver.By.id('numberOfJointsSelected')).getText().then(function (value) {
                    expect(value).to.be.equal("0");
                });

            });
        });
    });

    it('should select all 65 joints points and display selected count', function () {

        driver.navigate().refresh().then(function () {
            // click start button
            driver.findElement(webdriver.By.id('btnStart')).click();

            // head selection
            driver.findElement(webdriver.By.id('joint1')).click();
            driver.findElement(webdriver.By.id('joint2')).click();

            //stenun selection
            driver.findElement(webdriver.By.id('joint3')).click(); // open sternun zoomed view
            driver.findElement(webdriver.By.id('joint26')).click();
            driver.findElement(webdriver.By.id('joint27')).click();
            driver.findElement(webdriver.By.id('joint28')).click();
            driver.findElement(webdriver.By.id('joint29')).click();
            driver.findElement(webdriver.By.id('joint30')).click();
            driver.findElement(webdriver.By.id('joint31')).click();
            driver.findElement(webdriver.By.className('zoom-out-sternon')).click(); // close sternun zoomed view

            //elbow selection
            driver.findElement(webdriver.By.id('joint6')).click();
            driver.findElement(webdriver.By.id('joint7')).click();

            //wrist selection
            driver.findElement(webdriver.By.id('joint8')).click();
            driver.findElement(webdriver.By.id('joint11')).click();

            // hands selection
            driver.findElement(webdriver.By.id('joint12')).click(); // open hands zoomed view

            var st = 32;
            while (st < 60) {
                driver.findElement(webdriver.By.id('joint' + st)).click();
                st += 1;
            }

            driver.findElement(webdriver.By.className('zoom-out-hands')).click(); // close hands zoomed view

            // hip selection
            driver.findElement(webdriver.By.id('joint9')).click();
            driver.findElement(webdriver.By.id('joint10')).click();


            // knee selection
            driver.findElement(webdriver.By.id('joint14')).click();
            driver.findElement(webdriver.By.id('joint15')).click();


            // ankle selection
            driver.findElement(webdriver.By.id('joint16')).click();
            driver.findElement(webdriver.By.id('joint17')).click();


            // feet selection

            driver.findElement(webdriver.By.id('joint18')).click();

            st = 61;
            while (st < 83) {
                driver.findElement(webdriver.By.id('joint' + st)).click();
                st += 1;
            }

            driver.findElement(webdriver.By.className('zoom-out-feet')).click();

            // check the hands + feet joint selection count
            driver.findElement(webdriver.By.id('left-hand-selectedJoints')).getText().then(function (value) {
                expect(value).to.be.equal("14", 'all left hand joints selected');
                driver.findElement(webdriver.By.id('right-hand-selectedJoints')).getText().then(function (value) {
                    expect(value).to.be.equal("14", 'all right hand joints selected');
                    driver.findElement(webdriver.By.id('left-foot-selectedJoints')).getText().then(function (value) {
                        expect(value).to.be.equal("11", 'all left foot joints selected');
                        driver.findElement(webdriver.By.id('right-foot-selectedJoints')).getText().then(function (value) {
                            expect(value).to.be.equal("11", 'all right hand joints selected');
                            driver.findElement(webdriver.By.id('numberOfJointsSelected')).getText().then(function (value) {
                                expect(value).to.be.equal("68");
                            });
                        });
                    });
                });
            });

        });
    });
});

describe.skip('Testing Start Up Configuration', function () {
    "use strict";

    it('should properly set default values', function () {
        driver.navigate().refresh().then(function () {
            driver.findElement(webdriver.By.id('txtAge')).getAttribute('value').then(function (value) {
                expect(value).to.be.equal('37');
                driver.findElement(webdriver.By.id('txtWeight')).getAttribute('value').then(function (value) {
                    expect(value).to.be.equal('92');
                    driver.findElement(webdriver.By.id('txtDuration')).getAttribute('value').then(function (value) {
                        expect(value).to.be.equal('13.1');
                    });
                });
            });
        });
    });

    it('should properly represent data in the patient information section after clicking start', function () {
        driver.navigate().refresh().then(function () {
            driver.findElement(webdriver.By.id('genderMale')).click(); // select male
            driver.findElement(webdriver.By.id('employedNo')).click(); // select not employed
            driver.findElement(webdriver.By.id('weightUnitLbs')).click(); // select lbs as weight unit

            driver.findElement(webdriver.By.id('txtAge')).sendKeys('\uE003\uE00353\n').then(function () {
                driver.findElement(webdriver.By.id('txtWeight')).sendKeys('\uE003\uE003\uE003273\n').then(function () {
                    driver.findElement(webdriver.By.id('txtDuration')).sendKeys('\uE003\uE003\uE003\uE00326.1\n').then(function () {
                        driver.findElement(webdriver.By.id('txtAge')).getAttribute('value').then(function (value) {
                            expect(value).to.be.equal('53');
                            driver.findElement(webdriver.By.id('txtWeight')).getAttribute('value').then(function (value) {
                                expect(value).to.be.equal('273');
                                driver.findElement(webdriver.By.id('txtDuration')).getAttribute('value').then(function (value) {
                                    expect(value).to.be.equal('26.1');
                                    driver.findElement(webdriver.By.id('btnStart')).click();
                                    // 37 y/o Female | 92 kgs | Diagnosed 13.1 Years Ago | Employed
                                    driver.findElement(webdriver.By.id('patientInformationText')).getText().then(function (value) {
                                        expect(value).to.be.equal('53 y/o Male | 273 lbs | Diagnosed 26.1 Years Ago | Not Employed');
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

/*
* @author Matthew Ormsby
*/
describe('Canvas', function () {
    "use strict";

    it("should check if all points on the canvas are selected", function () {
        driver.executeScript(function () {
            var arr,
                i,
                x,
                y,
                severity,
                bodyLocation;

            // retrieve all points from json
            $.getJSON("./src/support/plaque_full_male.json", function (data) {
                arr = data;

                // iterate through entire canvas and entire points
                for (i = 0; i <= arr.length - 1; i = i + 1) {
                    x = arr[i].x;
                    y = arr[i].y;
                    severity = arr[i].severity;
                    bodyLocation = arr[i].bodyLocation;
                    // insert point into the canvas
                    _bodyAtlas_.canvas.model.addPlaque(x, y, severity, bodyLocation);
                }
            });
        });
        driver.findElement(webdriver.By.id('btnStart')).click();
        driver.findElement(webdriver.By.id('btnStep1')).click();
        driver.findElement(webdriver.By.id('btnStep2')).click();
        driver.findElement(webdriver.By.id('tab-right')).click();
        driver.findElement(webdriver.By.className('pDisplay')).getText().then(function (value) {
            expect(value).to.be.equal('2%');
        });
    });
});