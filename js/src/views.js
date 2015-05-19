/*jslint nomen : true*/
/*jslint bitwise : true*/
/*jslint browser : true*/
/*jslint unparam: true */
/*global $, BodyAtlas, _, Backbone */
BodyAtlas.View = {

    BodyAtlasHelpScreenExplanation: Backbone.View.extend({
        el: $('#help-screen-explanationOfOutputs'),

        events: {
            'click #abtLink': 'abtLinkClick'
        },
        initialize: function (options) {
            "use strict";
            this.eventBus = options.eventBus;
        },

        abtLinkClick: function () {
            "use strict";
            if ($('#container-cover').css('display') === 'none') {
                //set selected navigation option
                $('#home-nav-option').attr('class', 'home-nav-option');
                $('#help-nav-option').attr('class', 'help-nav-option');
                $('#patient-nav-option').attr('class', 'patient-nav-option');
                $('#about-nav-option').attr('class', 'about-nav-option-selected');
                //display main screen
                $('#container').css('display', 'none');
                $('#patient-screen').css('display', 'none');
                $('#about-screen').css('display', 'block');
                $('#help-screen').css('display', 'none');
                $('#leftBorder').attr('class', 'leftBorder-for-about-page');
                $('#rightBorder').attr('class', 'rightBorder-for-about-page');
            }
        }
    }),

    BodyAtlasDisplayPane: Backbone.View.extend({
        el: $('#topNavigationBar'),

        events: {
            'click #home-nav-option': 'homeOptionClick',
            'click #about-nav-option': 'aboutOptionClick',
            'click #print-nav-option': 'printOptionClick',
            'click #help-nav-option': 'helpOptionClick',
            'click #patient-nav-option': 'patientOptionClick'
        },

        initialize: function (options) {
            "use strict";
            _.bindAll(this, 'homeOptionClick', 'aboutOptionClick', 'printOptionClick', 'helpOptionClick', 'patientOptionClick');
            this.eventBus = options.eventBus;
            this.eventBus.bind(BodyAtlas.EventNames.ShowMainScreen, this.displayMainScreen);
            this.eventBus.bind(BodyAtlas.EventNames.PatientEdit, this.hideMainScreen);
        },

        /**
         * Display main application screen
         */
        displayMainScreen: function () {
            "use strict";
            //hide the disabled layers
            $('#container-cover').css('display', 'none');
        },
        /**
         * Hide main application screen
         */
        hideMainScreen: function () {
            "use strict";
            //hide the disabled layers
            $('#container-cover').css('display', 'block');
        },

        homeOptionClick: function () {
            "use strict";
            if ($('#container-cover').css('display') === 'none') {
                //set selected navigation option
                $('#home-nav-option').attr('class', 'home-nav-option-selected');
                $('#about-nav-option').attr('class', 'about-nav-option');
                $('#help-nav-option').attr('class', 'help-nav-option');
                $('#patient-nav-option').attr('class', 'patient-nav-option');

                //display main screen
                $('#container').css('display', 'block');
                $('#about-screen').css('display', 'none');
                $('#help-screen').css('display', 'none');
                $('#patient-screen').css('display', 'none');
                $('#leftBorder').attr('class', 'leftBorder');
                $('#rightBorder').attr('class', 'rightBorder');

            }
        },
        aboutOptionClick: function () {
            "use strict";
            if ($('#container-cover').css('display') === 'none') {
                //set selected navigation option
                $('#home-nav-option').attr('class', 'home-nav-option');
                $('#help-nav-option').attr('class', 'help-nav-option');
                $('#patient-nav-option').attr('class', 'patient-nav-option');
                $('#about-nav-option').attr('class', 'about-nav-option-selected');
                //display main screen
                $('#container').css('display', 'none');
                $('#about-screen').css('display', 'block');
                $('#help-screen').css('display', 'none');
                $('#patient-screen').css('display', 'none');
                $('#leftBorder').attr('class', 'leftBorder-for-about-page');
                $('#rightBorder').attr('class', 'rightBorder-for-about-page');
            }
        },
        helpOptionClick: function () {
            "use strict";
            if ($('#container-cover').css('display') === 'none') {
                //set selected navigation option
                $('#home-nav-option').attr('class', 'home-nav-option');
                $('#about-nav-option').attr('class', 'about-nav-option');
                $('#patient-nav-option').attr('class', 'patient-nav-option');
                $('#help-nav-option').attr('class', 'help-nav-option-selected');

                //display main screen
                $('#container').css('display', 'none');
                $('#help-screen').css('display', 'block');
                $('#about-screen').css('display', 'none');
                $('#patient-screen').css('display', 'none');
                $('#leftBorder').attr('class', 'leftBorder-for-help-page');
                $('#rightBorder').attr('class', 'rightBorder-for-help-page');
            }
        },
        patientOptionClick: function(){
            "use strict";
            if ($('#container-cover').css('display') === 'none') {
                //set selected navigation option
                $('#home-nav-option').attr('class', 'home-nav-option');
                $('#about-nav-option').attr('class', 'about-nav-option');
                $('#help-nav-option').attr('class', 'help-nav-option');
                $('#patient-nav-option').attr('class', 'patient-nav-option-selected');

                //display main screen
                $('#container').css('display', 'none');
                $('#help-screen').css('display', 'none');
                $('#about-screen').css('display', 'none');
                $('#patient-screen').css('display', 'block');
                $('#leftBorder').attr('class', 'leftBorder-for-help-page');
                $('#rightBorder').attr('class', 'rightBorder-for-help-page');
            }
        },

        printOptionClick: function () {
            "use strict";
            if ($('#container-cover').css('display') === 'none') {
                this.eventBus.trigger(BodyAtlas.EventNames.PrintClick);
            }
        }
    }),

    PrintPane: Backbone.View.extend({
        el: $('#print-screen'),
        currentGender: 0,

        events: {
        },

        initialize: function (options) {
            "use strict";
            this.eventBus = options.eventBus;
            options.eventBus.bind(BodyAtlas.EventNames.PatientUpdate, this.updatePatientInformation);
            options.eventBus.bind(BodyAtlas.EventNames.PrintClick, this.generatePrintScreen);
            options.eventBus.bind(BodyAtlas.EventNames.AggregateScoreUpdate, this.setAggregateScores);
            options.eventBus.bind(BodyAtlas.EventNames.OQLAggregateScoreUpdate, this.setOQLAggregateScore);
            options.eventBus.bind(BodyAtlas.EventNames.OQLActivityProductivityUpdate, this.setActivityProdScore);
        },
        setActivityProdScore: function (scores) {
            "use strict";
            $('#printActivityVal').html(scores.Activity + ' %');
            $('#printWorkProdVal').html(scores.Productivity + ' %');
        },
        setOQLAggregateScore: function (aggregateScore) {
            "use strict";
            $('#printOQLVal').html(aggregateScore.OQLAggregateScore + ' (' + aggregateScore.OQLEffect + ')');
        },
        setAggregateScores: function (aggreateScores) {
            "use strict";
            $('#printCovergeVal').html(aggreateScores.Coverage + ' %');
            $('#printPasiVal').html(aggreateScores.PasiScore);
        },
        updatePatientInformation: function (patientData) {
            "use strict";
            $('#printNameVal').html(patientData.getName());
            $('#printWeightVal').html(patientData.getWeight() + ' kgs');
            $('#printAgeVal').html(patientData.getAge() + ' years');
            $('#printDurationVal').html(patientData.getDuration() + ' years');
            $('#printItchVal').html(patientData.getItch());
            $('#printPainVal').html(patientData.getPain());

            this.currentGender = patientData.getGender();
            if (patientData.getGender() === BodyAtlas.Model.Gender.FEMALE) {
                $('#printGenderVal').html('Female');
            } else {
                $('#printGenderVal').html('Male');
            }

            if (patientData.getEmployed() === BodyAtlas.Model.YesNo.YES) {
                $('#printEmployedVal').html('Yes');
            } else {
                $('#printEmployedVal').html('No');
            }
        },
        /**
         * generate the html for the print screen and display it in a new window
         */
        generatePrintScreen: function () {
            "use strict";
            //get the html for the current body image displayed
            $('#print-body-outline').html($('#psoriasis-canvas-container').html());
            var mask = $('#print-screen').find('#masking-image'),
                printHTML,
                xopen;

            //set the masking layer to white for printing
            if (this.currentGender === BodyAtlas.Model.Gender.FEMALE) {
                mask.attr('src', '/images/female_front_back_transparent_print.png');
            } else {
                mask.attr('src', '/images/male_front_back_transparent_print.png');
            }
            //get html for dlqi graphs
            $('#printGraphs').html($('#dlqigraphs').html());
            //$('#print-about-page').html($('#about-screen').html());
            //$('#print-about-page').html($('#about-screen').html());

            //get the html for the data to be printed
            printHTML = $('#print-screen').html();

            //open new window with data for printing
            xopen = window.open('about:blank');
            xopen.document.open();
            xopen.document.write('<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><title>Abbott - Psoriasis Body Atlas</title><link rel="stylesheet" type="text/css" href="/css/print.css" /></head><body class="print-body">' + printHTML + '</body></html>');
            xopen.document.close();


        }

    }),

    PainLevelPanel: Backbone.View.extend({
        el: $('#pain-slider'),

        events: {
            'mouseup #sliderPain': 'painSliderStop',
            'keyup #sliderPain': 'painSliderStop',
            'slide #sliderPain': 'slide',
            'slidestop #sliderPain': 'painSliderStop',
            'keyup #txtPain': 'painValueChanged',
            'keypress #txtPain': 'inputValidation',
            'blur #txtPain': 'stabilize',
            'mouseover #painToolTipIcon': 'painMenuSelectorOnMouseOver'
        },

        initialize: function (options) {
            "use strict";
            this.model = options.model;
            this.eventBus = options.eventBus;
            _.bindAll(this, 'resetPainSlider', 'painMenuSelectorOnMouseOver');

            $('#calculatePain').removeClass('radio-button').addClass('radio-button-selected');
            $('#calculatePain').attr('checked', 'checked');


            options.eventBus.bind(BodyAtlas.EventNames.ResetPainSlider, this.resetPainSlider);

            this.sliderHelper = new BodyAtlas.Utility.SliderHelper('#sliderPain', '#txtPain', 0, 10);
            this.sliderHelper.resetSlider();

            //            $('#txtPain').attr('disabled', 'disabled');
            //            $('#sliderPain').slider("option", "disabled", true);

        },

        painMenuSelectorOnMouseOver: function (e) {
            "use strict";
            $('#itchMenuSelector').attr('style', 'display:block;top:' + e.pageY + 'px;left:' + e.pageX + 'px;');
        },

        slide: function (event, ui) {
            "use strict";
            $('#txtPain').val(ui.value).removeClass('error');
            this.eventBus.trigger(BodyAtlas.EventNames.PainUpdate, ui.value * 10);

        },
        painSliderStop: function (e, ui) {
            "use strict";
            this.model.setPain($('#txtPain').val());
            $('#setItch').removeClass('pi-radio-button').addClass('pi-radio-button-selected');
            $('#calculateItch').removeClass('pi-radio-button-selected').addClass('pi-radio-button');
        },

        painValueChanged: function () {
            "use strict";
            var value = this.sliderHelper.setSliderValueWithValidation();
            this.eventBus.trigger(BodyAtlas.EventNames.PainUpdate, value * 10);
            this.model.setPain(value);
            $('#setItch').removeClass('pi-radio-button').addClass('pi-radio-button-selected');
            $('#calculateItch').removeClass('pi-radio-button-selected').addClass('pi-radio-button');
        },

        resetPainSlider: function () {
            "use strict";
            this.sliderHelper.resetSlider();
            this.model.setPain($('#txtPain').val());
        },

        stabilize: function () {
            "use strict";
            this.sliderHelper.stabilize();
        },

        /**
         * Validates that the value being entered in the control is a number
         *
         * @param e
         */
        inputValidation: function (e) {
            "use strict";
            this.sliderHelper.inputValidation(e);
        }
    }),

    ItchingLevelPanel: Backbone.View.extend({
        el: $('#itch-slider'),
        events: {
            'mouseup #sliderItch': 'itchSliderStop',
            'keyup #sliderItch': 'itchSliderStop',
            'slide #sliderItch': 'slide',
            'slidestop #sliderItch': 'itchSliderStop',
            'keyup #txtItch': 'itchValueChanged',
            'keypress #txtItch': 'inputValidation',
            'blur #txtItch': 'stabilize',
            'click #calculateItch': 'calculateItchClick',
            'click #setItch': 'setItchClick',
            'mouseover #itchToolTipIcon': 'itchMenuSelectorIconOnMouseOver',
            'click #itchMenuSelector': 'itchSelectorButtonClick'
        },
        initialize: function (options) {
            "use strict";
            this.model = options.model;
            this.eventBus = options.eventBus;
            _.bindAll(this, 'resetItchSlider', 'calculateItchClick', 'setItchClick', 'itchMenuSelectorIconOnMouseOver', 'itchSelectorButtonClick');
            options.eventBus.bind(BodyAtlas.EventNames.ResetItchSlider, this.resetItchSlider);
            options.eventBus.bind(BodyAtlas.EventNames.ItchPredictionCalculation, this.itchSelectorButtonClick);

            $('#calculateItch').removeClass('pi-radio-button').addClass('pi-radio-button-selected');
            $('#calculateItch').attr('checked', 'checked');

            $('#calculateItch').removeClass('pi-radio-button').addClass('pi-radio-button-selected');
            $('#calculateItch').attr('checked', 'checked');

            $('#calculateItch').removeClass('pi-radio-button').addClass('pi-radio-button-selected');
            $('#calculateItch').attr('checked', 'checked');

            this.sliderHelper = new BodyAtlas.Utility.SliderHelper('#sliderItch', '#txtItch', 0, 10);
            this.sliderHelper.resetSlider();

            //            $('#txtItch').attr('disabled', 'disabled');
            //            $('#sliderItch').slider("option", "disabled", true);

        },

        itchSelectorButtonClick: function () {
            "use strict";
            if ($('#calculateItch').hasClass('pi-radio-button-selected')) {
                this.eventBus.trigger(BodyAtlas.EventNames.ItchPrediction, '0');
                //$('#txtItch').attr('disabled', 'disabled');
                //$('#sliderItch').slider("option", "disabled", true);
                this.model.setItch($('#txtItch').val());
                this.eventBus.trigger(BodyAtlas.EventNames.PainPrediction, '0');
                //$('#txtPain').attr('disabled', 'disabled');
                //$('#sliderPain').slider("option", "disabled", true);
                this.model.setPain($('#txtPain').val());
                //Commenting it out as per new request from Min not to use mouseover. Leaving it out commented in case she wants to go back.
                //$('#itchMenuSelector').attr('style', 'display:none');
            } else {
                $('#txtItch').attr('disabled', false);
                $('#sliderItch').slider("option", "disabled", false);
                //Commenting it out as per new request from Min not to use mouseover. Leaving it out commented in case she wants to go back.
                //$('#itchMenuSelector').attr('style', 'display:none');
                $('#txtPain').attr('disabled', false);
                $('#sliderPain').slider("option", "disabled", false);
            }

        },

        calculateItchClick: function () {
            "use strict";
            if ($('#calculateItch').hasClass('pi-radio-button')) {
                $('#calculateItch').removeClass('pi-radio-button').addClass('pi-radio-button-selected');
                $('#setItch').removeClass('pi-radio-button-selected').addClass('pi-radio-button');
                $('#setItch').attr('checked', 'checked');
                $('#setItch').attr('checked', false);
            }
        },
        setItchClick: function () {
            "use strict";
            if ($('#setItch').hasClass('pi-radio-button')) {
                $('#setItch').removeClass('pi-radio-button').addClass('pi-radio-button-selected');
                $('#calculateItch').removeClass('pi-radio-button-selected').addClass('pi-radio-button');
                $('#calculateItch').attr('checked', 'checked');
                $('#calculateItch').attr('checked', false);
            }
        },
        itchMenuSelectorIconOnMouseOver: function (e) {
            "use strict";
            BodyAtlas.Logger.log(e);
            //Commenting it out as per new request from Min not to use mouseover. Leaving it out commented in case she wants to go back.
            //$('#itchMenuSelector').attr('style', 'display:block;top:' + e.pageY + 'px;left:' + e.pageX + 'px;');

        },
        itchMenuSelectorOnMouseOver: function (e) {
            "use strict";
            BodyAtlas.Logger.log(e);
            //Commenting it out as per new request from Min not to use mouseover. Leaving it out commented in case she wants to go back.
            //$('#itchMenuSelector').attr('style', 'display:block;');
        },

        itchMenuSelectorOnMouseOut: function (e) {
            "use strict";
            BodyAtlas.Logger.log(e);
            //Commenting it out as per new request from Min not to use mouseover. Leaving it out commented in case she wants to go back.
            //$('#itchMenuSelector').attr('style', 'display:none;');
        },

        itchSliderStop: function (e, ui) {
            "use strict";
            this.model.setItch($('#txtItch').val());
            $('#setItch').removeClass('pi-radio-button').addClass('pi-radio-button-selected');
            $('#calculateItch').removeClass('pi-radio-button-selected').addClass('pi-radio-button');
        },
        slide: function (e, ui) {
            "use strict";
            $('#txtItch').val(ui.value).removeClass('error');
            this.eventBus.trigger(BodyAtlas.EventNames.ItchUpdate, ui.value);

        },

        itchValueChanged: function () {
            "use strict";
            var value = this.sliderHelper.setSliderValueWithValidation();
            this.eventBus.trigger(BodyAtlas.EventNames.ItchUpdate, value);
            this.model.setItch(value);
            $('#setItch').removeClass('pi-radio-button').addClass('pi-radio-button-selected');
            $('#calculateItch').removeClass('pi-radio-button-selected').addClass('pi-radio-button');

        },

        /**
         * Resets the itch slider to zero
         */
        resetItchSlider: function () {
            "use strict";
            this.sliderHelper.resetSlider();
            this.model.setItch($('#txtItch').val());
        },

        stabilize: function () {
            "use strict";
            this.sliderHelper.stabilize();
        },

        /**
         * Validates that the value being entered in the control is a number
         *
         * @param e
         * @param textBoxControl - control being validated
         */
        inputValidation: function (e) {
            "use strict";
            this.sliderHelper.inputValidation(e);
        }
    }),

    PatientDataWindow: Backbone.View.extend({
        el: $('#patient-data-window'),

        events: {
            'keyup #lblName': 'nameValueChanged',
            'click #genderMale': 'genderMaleClick',
            'click #genderFemale': 'genderFemaleClick',
            'click #employedYes': 'employedYesClick',
            'click #employedNo': 'employedNoClick',
            'click #weightUnitKgs': 'weightUnitKgsClick',
            'click #weightUnitLbs': 'weightUnitLbsClick',
            'keyup #txtAge': 'ageValueChanged',
            'keyup #txtDuration': 'durationValueChanged',
            'keyup #txtWeight': 'weightValueChanged',
            'slide #sliderAge': 'ageSlide',
            'slide #sliderWeight': 'weightSlide',
            'slide #sliderDuration': 'durationSlide',
            'click #btnStart': 'startClick',
            'click #btnConfirmCancel': 'btnConfirmCancelClick',
            'click #btnConfirmOk': 'btnConfirmOkClick',
            'keypress #txtAge': 'inputValidation',
            'keypress #txtDuration': 'inputValidation',
            'keypress #txtWeight': 'inputValidation'

        },


        initialize: function (options) {
            "use strict";
            _.bindAll(this, 'nameValueChanged', 'genderMaleClick', 'genderFemaleClick', 'employedYesClick',
                'employedNoClick', 'weightUnitKgsClick', 'weightUnitLbsClick', 'ageValueChanged', 'durationValueChanged',
                'weightValueChanged', 'startClick', 'btnConfirmCancelClick', 'btnConfirmOkClick');

            this.model = options.model;
            this.eventBus = options.eventBus;

            var fhirInfo= {};

            FHIR.oauth2.ready(function(smart){
                var patient = smart.context.patient;

                patient.read().then(function(pt) {
                    fhirInfo.name =
                    pt.name[0].given.join(" ") + " " +
                    pt.name[0].family.join(" ");

                    fhirInfo.dateOfBirth = pt.birthDate;
                    fhirInfo.gender = pt.gender.coding[0].code;
                    this.patientContext = new BodyAtlas.Utility.AppContext();
                    this.patientContext.setPatient(pt);
                    var results = [];
                    patient.Observation.where
                      .nameIn('3141-9')
                      .drain(function(batch){
                        [].push.apply(results, batch);
                        })
                       .then(function(){
                           var vitalsByCode = smart.byCode(results, 'name');

                           pt.weight_arr = _(vitalsByCode["3141-9"]||[]).chain()
                            .map(function(v){
                              return {
                                date: new Date(v.appliesDateTime),
                                weight: smart.units.kg(v.valueQuantity),
                                unit: "kg"
                            };
                          }).value();
                          fhirInfo.weight = _(pt.weight_arr).last() || null;

                          if(fhirInfo.weight){
                              this.weightSliderHelper = new BodyAtlas.Utility.SliderHelper('#sliderWeight', '#txtWeight', 40, 200, fhirInfo.weight.weight);
                              this.weightSliderHelper.resetSlider();
                          }
                       });

                    if(Object.getOwnPropertyNames(fhirInfo).length !== 0){
                        this.nameSliderHelper = new BodyAtlas.Utility.SliderHelper('', '#lblName', 0, 0, fhirInfo.name);
                        this.nameSliderHelper.setInputText();

                        var _calculateAge = function(dateString) { // birthday is a date
                            var today = new Date();
                            var birthDate = new Date(dateString);
                            var age = today.getFullYear() - birthDate.getFullYear();
                            var m = today.getMonth() - birthDate.getMonth();
                            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                age--;
                            }
                            return age;
                        };
                        if(fhirInfo.dateOfBirth){
                            fhirInfo.age = _calculateAge(fhirInfo.dateOfBirth);
                        }

                        if(fhirInfo.age){
                            this.ageSliderHelper = new BodyAtlas.Utility.SliderHelper('#sliderAge', '#txtAge', 5, 90, fhirInfo.age);
                            this.durationSliderHelper = new BodyAtlas.Utility.SliderHelper('#sliderDuration', '#txtDuration', 0, 70, fhirInfo.age - 5);
                            this.ageSliderHelper.resetSlider();
                            this.durationSliderHelper.resetSlider();
                        }else{
                            this.ageSliderHelper = new BodyAtlas.Utility.SliderHelper('#sliderAge', '#txtAge', 5, 90, 56);
                        }

                        if(fhirInfo.gender && fhirInfo.gender == "M"){
                            $('#genderMale').removeClass('radio-button').addClass('radio-button-selected');
                            $('#genderFemale').removeClass('radio-button-selected').addClass('radio-button');
                            $('#genderMaleRadio').attr('checked', 'checked');
                            $('#genderFemaleRadio').attr('checked', false);
                        }else{
                            $('#genderFemale').removeClass('radio-button').addClass('radio-button-selected');
                            $('#genderMale').removeClass('radio-button-selected').addClass('radio-button');
                            $('#genderFemaleRadio').attr('checked', 'checked');
                            $('#genderMaleRadio').attr('checked', false);
                        }
                    }
                });
            });

            this.ageSliderHelper = new BodyAtlas.Utility.SliderHelper('#sliderAge', '#txtAge', 5, 90, 56);
            this.weightSliderHelper = new BodyAtlas.Utility.SliderHelper('#sliderWeight', '#txtWeight', 40, 200, 124);
            this.durationSliderHelper = new BodyAtlas.Utility.SliderHelper('#sliderDuration', '#txtDuration', 0, 70, 36);

            options.eventBus.bind(BodyAtlas.EventNames.ShowMainScreen, this.hideDisplay);
            options.eventBus.bind(BodyAtlas.EventNames.PatientEdit, this.showDisplay);


            $('#psoriaticArthritisYes').removeClass('radio-button').addClass('radio-button-selected');
            $('#psoriaticArthritisYesRadio').attr('checked', 'checked');

            $('#employedYes').removeClass('radio-button').addClass('radio-button-selected');
            $('#employedYesRadio').attr('checked', 'checked');

            $('#genderMale').removeClass('radio-button').addClass('radio-button-selected');
            $('#genderMaleRadio').attr('checked', 'checked');

            this.ageSliderHelper.resetSlider();

            $('#sliderAge-min').html(($('#sliderAge').slider('option', 'min')));
            $('#sliderAge-max').html(($('#sliderAge').slider('option', 'max')));

            $('#weightUnitKgs').removeClass('radio-button').addClass('radio-button-selected');
            $('#weightUnitKgsRadio').attr('checked', 'checked');

            this.weightSliderHelper.resetSlider();

            $('#sliderWeight-min').html(($('#sliderWeight').slider('option', 'min')));
            $('#sliderWeight-max').html(($('#sliderWeight').slider('option', 'max')));

            this.durationSliderHelper.resetSlider();

            $('#sliderDuration-min').html(($('#sliderDuration').slider('option', 'min')));
            $('#sliderDuration-max').html(($('#sliderDuration').slider('option', 'max')));

        },

        ageSlide: function (event, ui) {
            "use strict";
            $('#txtAge').val(ui.value);
        },

        weightSlide: function (event, ui) {
            "use strict";
            $('#txtWeight').val(ui.value);
        },

        durationSlide: function (event, ui) {
            "use strict";
            $('#txtDuration').val(ui.value);
        },

        hideDisplay: function () {
            "use strict";
            $('#patient-data-window').css('display', 'none');
        },

        showDisplay: function () {
            "use strict";
            $('#patient-data-window').css('display', 'block');
        },

        nameValueChanged: function(){
            "use strict";
            //In the event any manipulation of the name field needs to happen add logic here and it will be triggered on keyup see line 481.
        },

        genderMaleClick: function () {
            "use strict";
            if ($('#genderMale').hasClass('radio-button')) {
                $('#genderMale').removeClass('radio-button').addClass('radio-button-selected');
                $('#genderFemale').removeClass('radio-button-selected').addClass('radio-button');
                $('#genderMaleRadio').attr('checked', 'checked');
                $('#genderFemaleRadio').attr('checked', false);
            }
        },

        genderFemaleClick: function () {
            "use strict";
            if ($('#genderFemale').hasClass('radio-button')) {
                $('#genderFemale').removeClass('radio-button').addClass('radio-button-selected');
                $('#genderMale').removeClass('radio-button-selected').addClass('radio-button');
                $('#genderFemaleRadio').attr('checked', 'checked');
                $('#genderMaleRadio').attr('checked', false);
            }
        },

        employedNoClick: function () {
            "use strict";
            if ($('#employedNo').hasClass('radio-button')) {
                $('#employedNo').removeClass('radio-button').addClass('radio-button-selected');
                $('#employedYes').removeClass('radio-button-selected').addClass('radio-button');
                $('#employedNoRadio').attr('checked', 'checked');
                $('#employedYesRadio').attr('checked', false);
            }
        },

        employedYesClick: function () {
            "use strict";
            if ($('#employedYes').hasClass('radio-button')) {
                $('#employedYes').removeClass('radio-button').addClass('radio-button-selected');
                $('#employedNo').removeClass('radio-button-selected').addClass('radio-button');
                $('#employedYesRadio').attr('checked', 'checked');
                $('#employedNoRadio').attr('checked', false);
            }
        },

        weightUnitKgsClick: function () {
            "use strict";
            if ($('#weightUnitKgs').hasClass('radio-button')) {
                $('#weightUnitKgs').removeClass('radio-button').addClass('radio-button-selected');
                $('#weightUnitLbs').removeClass('radio-button-selected').addClass('radio-button');
                $('#weightUnitKgsRadio').attr('checked', 'checked');
                $('#weightUnitLbsRadio').attr('checked', false);

                // adjust slider to use kilograms
                var _math = BodyAtlas.Utility.Math(),
                    kgsValue = _math.convertLbsToKgs($('#sliderWeight').slider('option', 'value'));
                this.weightSliderHelper = new BodyAtlas.Utility.SliderHelper('#sliderWeight', '#txtWeight', 40, 200, kgsValue);
                this.weightSliderHelper.resetSlider();
                $('#sliderWeight-min').html(($('#sliderWeight').slider('option', 'min')));
                $('#sliderWeight-max').html(($('#sliderWeight').slider('option', 'max')));
                $('.slider-text-area .unit').html('kgs');
            }
        },

        weightUnitLbsClick: function () {
            "use strict";
            if ($('#weightUnitLbs').hasClass('radio-button')) {
                $('#weightUnitLbs').removeClass('radio-button').addClass('radio-button-selected');
                $('#weightUnitKgs').removeClass('radio-button-selected').addClass('radio-button');
                $('#weightUnitLbsRadio').attr('checked', 'checked');
                $('#weightUnitKgsRadio').attr('checked', false);

                // adjust slider to use pounds
                var _math = BodyAtlas.Utility.Math(),
                    lbsValue = _math.convertKgsToLbs($('#sliderWeight').slider('option', 'value'));
                this.weightSliderHelper = new BodyAtlas.Utility.SliderHelper('#sliderWeight', '#txtWeight', 88, 440, lbsValue);
                this.weightSliderHelper.resetSlider();
                $('#sliderWeight-min').html(($('#sliderWeight').slider('option', 'min')));
                $('#sliderWeight-max').html(($('#sliderWeight').slider('option', 'max')));
                $('.slider-text-area .unit').html('lbs');
            }
        },

        ageValueChanged: function () {
            "use strict";
            this.ageSliderHelper.setSliderValue();
        },

        durationValueChanged: function () {
            "use strict";
            this.durationSliderHelper.setSliderValue();
        },

        weightValueChanged: function () {
            "use strict";
            this.weightSliderHelper.setSliderValue();
        },
        btnConfirmCancelClick: function () {
            "use strict";
            if ($("input[id=genderFemaleRadio]").attr("checked")) {
                $("input[id=genderFemaleRadio]").attr("checked", "");
                $("input[id=genderMaleRadio]").attr("checked", "checked");
                $('#genderMale').removeClass('radio-button').addClass('radio-button-selected');
                $('#genderFemale').removeClass('radio-button-selected').addClass('radio-button');
            } else {
                $('#genderFemale').removeClass('radio-button').addClass('radio-button-selected');
                $('#genderMale').removeClass('radio-button-selected').addClass('radio-button');
                $("input[id=genderFemaleRadio]").attr("checked", "checked");
                $("input[id=genderMaleRadio]").attr("checked", false);
            }
            $("#confirmChangeDiv").attr('style', 'display:none;');
            this.eventBus.trigger(BodyAtlas.EventNames.ShowMainScreen);
            $("#btnStart").attr('style', 'display:block;');
            $("#divCover").attr('style', 'display:none;');
        },

        btnConfirmOkClick: function () {
            "use strict";
            if ($("input[id=genderFemaleRadio]").attr("checked")) {
                this.model.setGender(BodyAtlas.Model.Gender.FEMALE);
            } else {
                this.model.setGender(BodyAtlas.Model.Gender.MALE);
            }
            $("#confirmChangeDiv").attr('style', 'display:none;');
            this.eventBus.trigger(BodyAtlas.EventNames.ShowMainScreen);
            $("#btnStart").attr('style', 'display:block;');
            $("#divCover").attr('style', 'display:none;');
        },

        startClick: function () {
            "use strict";
            //clear all errors
            var _errorFound = false,
                _errorFoundForDuration = false,
                _durationValue,
                _personAge,
                _duration,
                actualWeight,
                _math,
                _genderBeforeChange,
                _newGender;
            $('#error-message').css('display', 'none');
            this.ageSliderHelper.clearError();
            this.weightSliderHelper.clearError();
            this.durationSliderHelper.clearError();


            //check that age data is within range
            if (!this.ageSliderHelper.isTextBoxValueWithinRange()) {
                this.ageSliderHelper.addError();
                _errorFound = true;
            }

            //check that weight data is within range
            if (!this.weightSliderHelper.isTextBoxValueWithinRange()) {
                this.weightSliderHelper.addError();
                _errorFound = true;
            }

            //check that duration data is within range
            if (!this.durationSliderHelper.isTextBoxValueWithinRange()) {
                this.durationSliderHelper.addError();
                _errorFound = true;
            }

            //check that duration is less than or equal to age
            _durationValue = parseInt(($('#txtDuration').val()), 10);
            _personAge = parseInt($('#txtAge').val(), 10);
            //if duration is greater than age flag the error for duration
            if (!isNaN(_durationValue) && !isNaN(_personAge) && _durationValue > _personAge && !_errorFound) {
                this.durationSliderHelper.addError();
                this.ageSliderHelper.addError();
                _errorFoundForDuration = true;
            }

            if (_errorFound) {
                $('#error-message').css('display', 'block');
                $('#lblErrorMsg').html('The information entered is out of range');
            } else if (_errorFoundForDuration) {
                $('#error-message').css('display', 'block');
                $('#lblErrorMsg').html('The patient\'s psoriasis duration cannot exceed their age');
            } else {
                //update Patient Model
                this.model.setName($('#lblName').text());

                if ($("input[id=employedYesRadio]").attr("checked")) {
                    this.model.setEmployed(BodyAtlas.Model.YesNo.YES);
                } else {
                    this.model.setEmployed(BodyAtlas.Model.YesNo.NO);
                }

                this.model.setAge($('#txtAge').val());
                _duration = $.trim($('#txtDuration').val());
                if (_duration !== '' && _duration !== 0) {
                    this.model.setDuration(_duration); //use the text box if it's not 0 or empty
                } else {
                    this.model.setDuration($('#sliderDuration').slider('value')); //use the slider value instead in the case the textbox is clear
                }

                actualWeight = $('#txtWeight').val();

                this.model.setActualWeight(actualWeight);

                if ($("input[id=weightUnitKgsRadio]").attr("checked")) {
                    this.model.setWeightUnit(BodyAtlas.Model.KgsLbs.KGS);
                    this.model.setWeight(actualWeight);
                } else {
                    this.model.setWeightUnit(BodyAtlas.Model.KgsLbs.LBS);
                    _math = new BodyAtlas.Utility.Math();
                    this.model.setWeight(_math.convertLbsToKgs(actualWeight));
                }
                _genderBeforeChange = this.model.getGender();
                if ($("input[id=genderFemaleRadio]").attr("checked")) {
                    _newGender = BodyAtlas.Model.Gender.FEMALE;
                } else {
                    _newGender = BodyAtlas.Model.Gender.MALE;
                }
                if (this.model.getInitState() !== 0 && _genderBeforeChange !== _newGender) {
                    $("#divCover").attr('style', 'display:block;');
                    $("#btnStart").attr('style', 'display:none;');
                    $("#confirmChangeDiv").attr('style', 'display:block;');
                } else {
                    this.model.setGender(_newGender);
                    this.eventBus.trigger(BodyAtlas.EventNames.ShowMainScreen);
                }
                this.model.setInitState(BodyAtlas.Model.InitStatus.EDIT);

            }
        },

        /**
         * Validates that the value being entered in the control is a number
         * @param e
         */
        inputValidation: function (e) {
            "use strict";
            this.ageSliderHelper.inputValidation(e);
        }

    }),

    InstructionsPanel: Backbone.View.extend({
        el: $("#instructions-panel"),

        events: {
            'click #btnStep1': 'btnStep1Click',
            'click #btnStep2': 'btnStep2Click'
        },

        initialize: function (options) {
            "use strict";
            this.eventBus = options.eventBus;
        },
        btnStep1Click: function (options) {
            "use strict";
            $('#instructionStep1').removeClass('instructionStep1Active').addClass('instructionStep1Inactive');
            $('#btnStep1').attr('style', 'display:none');
            $('#instructionStep2').removeClass('instructionStep2Inactive').addClass('instructionStep2Active');
            $('#btnStep2').removeAttr('display');
            $('#btnStep2').attr('style', 'display:block');

        },
        btnStep2Click: function (options) {
            "use strict";
            this.eventBus.trigger(BodyAtlas.EventNames.ItchPredictionCalculation, '0');
            $('#instructionStep1').removeClass('instructionStep1Inactive').addClass('instructionStep1Active');
            $('#btnStep1').attr('style', 'display:block');
            $('#instructionStep2').removeClass('instructionStep2Active').addClass('instructionStep2Inactive');
            $('#btnStep2').attr('style', 'display:none');
            $('#instructions-panel').css('display', 'none');
            $('#aggregate-score-panel').css('display', 'block');
            $('#impact-graphs').css('display', 'block');
            //TODO: Assign this and send to FHIR.
            console.log($("#coverage_and_Pasi_view").text());

        }

    }),

    PatientDataViewWindow: Backbone.View.extend({
        el: $("#patient-view-window"),

        events: {
            'click #patient-view-window-edit-option': 'displayStartScreen'
        },

        initialize: function (options) {
            "use strict";
            this.eventBus = options.eventBus;

            options.eventBus.bind(BodyAtlas.EventNames.PASIUpdate, this.showGraphs);
            options.eventBus.bind(BodyAtlas.EventNames.ItchUpdate, this.showGraphs);
            options.eventBus.bind(BodyAtlas.EventNames.PainUpdate, this.showGraphs);
            options.eventBus.bind(BodyAtlas.EventNames.PatientUpdate, this.displayPatientData);
        },

        showGraphs: function () {
            "use strict";
            return;
        },

        displayPatientData: function (patientData) {
            "use strict";
            var unitTxt = 'kgs';
            if (patientData.getWeightUnit() === BodyAtlas.Model.KgsLbs.LBS) {
                unitTxt = 'lbs';
            }
            $('#lName').html(patientData.getName());
            $('#lWeight').html(patientData.getActualWeight() + ' ' + unitTxt);
            $('#lAge').html(patientData.getAge() + ' years');
            $('#lPsoriasisDuration').html(patientData.getDuration() + ' years');

            if (patientData.getGender() === BodyAtlas.Model.Gender.FEMALE) {
                $('#lGender').html('Female');
            } else {
                $('#lGender').html('Male');
            }

            if (patientData.getEmployed() === BodyAtlas.Model.YesNo.YES) {
                $('#lEmployed').html('Yes');
            } else {
                $('#lEmployed').html('No');
            }
            $('#lEmployed').css( "color", "red" );
            $('#lPsoriasisDuration').css( "color", "red" );
        },

        displayStartScreen: function () {
            "use strict";
            //unhide the disabled layers
            $('#hiddenClearStatus').val('true');
            this.eventBus.trigger(BodyAtlas.EventNames.UnsortDLQIGraphs);
            this.eventBus.trigger(BodyAtlas.EventNames.PatientEdit);
        }
    }),

    PalletteBar: Backbone.View.extend({
        el: $("#pallette-bar"),

        events: {
            'click #severity-add-option': 'increasePlaque',
            'click #severity-remove-option': 'removePlaque',
            'click #severity-reduce-option': 'reducePlaque',
            'click #severity-plaque-level1': 'levelOnePlaque',
            'click #severity-plaque-level2': 'levelTwoPlaque',
            'click #severity-plaque-level3': 'levelThreePlaque',
            'click #severity-plaque-level4': 'levelFourPlaque',
            'click #severity-plaque-level5': 'levelFivePlaque',
            'click #severity-plaque-level6': 'levelSixPlaque'
        },

        initialize: function (options) {
            "use strict";
            _.bindAll(this, 'render', 'increasePlaque', 'removePlaque',
                'reducePlaque', 'levelOnePlaque', 'levelTwoPlaque',
                'levelThreePlaque', 'levelFourPlaque', 'levelFivePlaque', 'levelSixPlaque');
            this.eventBus = options.eventBus;

            this.model = new BodyAtlas.Model.PalletteSelection({ eventBus: options.eventBus });
        },

        render: function () {
            "use strict";
            return;
        },


        levelOnePlaque: function () {
            "use strict";
            this.model.setBrushLevel(BodyAtlas.Model.BrushLevel.LEVLE1);
            this.setSelectedLevelOption(BodyAtlas.Model.BrushLevel.LEVLE1);
        },

        levelTwoPlaque: function () {
            "use strict";
            this.model.setBrushLevel(BodyAtlas.Model.BrushLevel.LEVLE2);
            this.setSelectedLevelOption(BodyAtlas.Model.BrushLevel.LEVLE2);
        },

        levelThreePlaque: function () {
            "use strict";
            this.model.setBrushLevel(BodyAtlas.Model.BrushLevel.LEVLE3);
            this.setSelectedLevelOption(BodyAtlas.Model.BrushLevel.LEVLE3);
        },

        levelFourPlaque: function () {
            "use strict";
            this.model.setBrushLevel(BodyAtlas.Model.BrushLevel.LEVLE4);
            this.setSelectedLevelOption(BodyAtlas.Model.BrushLevel.LEVLE4);
        },

        levelFivePlaque: function () {
            "use strict";
            this.model.setBrushLevel(BodyAtlas.Model.BrushLevel.LEVLE5);
            this.setSelectedLevelOption(BodyAtlas.Model.BrushLevel.LEVLE5);
        },

        levelSixPlaque: function () {
            "use strict";
            this.model.setBrushLevel(BodyAtlas.Model.BrushLevel.LEVLE6);
            this.setSelectedLevelOption(BodyAtlas.Model.BrushLevel.LEVLE6);
        },

        setSelectedLevelOption: function (selectedLevel) {
            "use strict";
            //deselected all options
            $('#severity-plaque-level1').attr('class', 'severity-plaque-level1');
            $('#severity-plaque-level2').attr('class', 'severity-plaque-level2');
            $('#severity-plaque-level3').attr('class', 'severity-plaque-level3');
            $('#severity-plaque-level4').attr('class', 'severity-plaque-level4');
            $('#severity-plaque-level5').attr('class', 'severity-plaque-level5');
            $('#severity-plaque-level6').attr('class', 'severity-plaque-level6');
            $('#severity-add-option').attr('class', 'severity-add-option');
            $('#severity-reduce-option').attr('class', 'severity-reduce-option');
            $('#severity-remove-option').attr('class', 'severity-remove-option');

            switch (selectedLevel) {
            case BodyAtlas.Model.BrushLevel.LEVLE1:
                $('#severity-plaque-level1').attr('class', 'severity-plaque-level1_selected');
                break;
            case BodyAtlas.Model.BrushLevel.LEVLE2:
                $('#severity-plaque-level2').attr('class', 'severity-plaque-level2_selected');
                break;
            case BodyAtlas.Model.BrushLevel.LEVLE3:
                $('#severity-plaque-level3').attr('class', 'severity-plaque-level3_selected');
                break;
            case BodyAtlas.Model.BrushLevel.LEVLE4:
                $('#severity-plaque-level4').attr('class', 'severity-plaque-level4_selected');
                break;
            case BodyAtlas.Model.BrushLevel.LEVLE5:
                $('#severity-plaque-level5').attr('class', 'severity-plaque-level5_selected');
                break;
            case BodyAtlas.Model.BrushLevel.LEVLE6:
                $('#severity-plaque-level6').attr('class', 'severity-plaque-level6_selected');
                break;
            case BodyAtlas.Model.BrushLevel.INCREASE:
                $('#severity-add-option').attr('class', 'severity-add-option_selected');
                break;
            case BodyAtlas.Model.BrushLevel.REDUCE:
                $('#severity-reduce-option').attr('class', 'severity-reduce-option_selected');
                break;
            case BodyAtlas.Model.BrushLevel.REMOVE:
                $('#severity-remove-option').attr('class', 'severity-remove-option_selected');
                break;
            }
        },

        // callbacks for button clicks
        increasePlaque: function () {
            "use strict";
            this.model.setBrushLevel(BodyAtlas.Model.BrushLevel.INCREASE);
            this.setSelectedLevelOption(BodyAtlas.Model.BrushLevel.INCREASE);
        },

        removePlaque: function () {
            "use strict";
            this.model.setBrushLevel(BodyAtlas.Model.BrushLevel.REMOVE);
            this.setSelectedLevelOption(BodyAtlas.Model.BrushLevel.REMOVE);
        },


        reducePlaque: function () {
            "use strict";
            this.model.setBrushLevel(BodyAtlas.Model.BrushLevel.REDUCE);
            this.setSelectedLevelOption(BodyAtlas.Model.BrushLevel.REDUCE);
        }
    }),

    PlaqueView: Backbone.View.extend({
        tagName: "div",

        initialize: function () {
            "use strict";
            _.bindAll(this, 'render', 'update');
            this.model.bind('change', this.update); // this enables the view
            // to change whenever
            // the plaque is updated
            this.model.view = this;
        },

        render: function () {
            "use strict";
            $(this.el).attr("id", this.constructPlaqueId());
            switch (this.model.get("severity")) {
            case 1:
                $(this.el).attr("class", "plaque_severity_one");
                break;
            case 2:
                $(this.el).attr("class", "plaque_severity_two");
                break;
            case 3:
                $(this.el).attr("class", "plaque_severity_three");
                break;
            case 4:
                $(this.el).attr("class", "plaque_severity_four");
                break;
            case 5:
                $(this.el).attr("class", "plaque_severity_five");
                break;
            case 6:
                $(this.el).attr("class", "plaque_severity_six");
                break;
            }
            $(this.el).css("left", this.model.get("x"));
            $(this.el).css("top", this.model.get("y"));
            return this;
        },

        update: function () {
            "use strict";
            switch (this.model.get("severity")) {
            case 1:
                $(this.el).attr("class", "plaque_severity_one");
                break;
            case 2:
                $(this.el).attr("class", "plaque_severity_two");
                break;
            case 3:
                $(this.el).attr("class", "plaque_severity_three");
                break;
            case 4:
                $(this.el).attr("class", "plaque_severity_four");
                break;
            case 5:
                $(this.el).attr("class", "plaque_severity_five");
                break;
            case 6:
                $(this.el).attr("class", "plaque_severity_six");
                break;
            }
            this.options.eventBus.trigger("plaqueUpdated");
        },

        getImageOffSetBasedOnSeverity: function (sev) {
            "use strict";
            // this formula gets the correct background position of
            // the composed images so
            // that the correct plaque could show based on severity
            var backgroundLeftOffset = sev * 11 - 12;
            return "\r" + (backgroundLeftOffset * -1) + "px 0";
        },

        constructPlaqueId: function () {
            "use strict";
            return ("p-X" + this.model.get("x") + "Y" + this.model
                .get("y")) + "R" + this.model
                .get("bodyLocation");
        },


        /**
         * Removes the view element from the DOM.
         */
        removeFromDom: function () {
            "use strict";
            $(this.el).remove();
        }

    }),

    AggregateScorePanel: Backbone.View.extend({
        el: "#aggregate-score-panel",
        textTemplate: _.template('The plaques you have drawn cover <span><%= coverage %>%</span> of the body surface and approximate a PASI score of <span><%= pasiScore %></span>.'),

        initialize: function () {
            "use strict";
            _.bindAll(this, 'update');
            this.model.bind('change', this.update); // this enables the view
            // to change whenever
            // the model is updated
            this.model.view = this;
            this.update();
        },

        update: function () {
            "use strict";
            var _updatedScore = this.model.get("pASIScore"),
                _updatedCoverage = this.model.get("coverage");
            this.$("#coverage_and_Pasi_view").html(this.textTemplate({ pasiScore: _updatedScore, coverage: _updatedCoverage }));
        }
    }),

    PsoriasisCanvas: Backbone.View.extend({
        el: $("#psoriasis-event-canvas"),


        selectedBrush: 5, // five is a test value
        displayedGender: "Woman",
        hexagonCanvas: $("#psoriasis-hexagon-canvas"),
        HEAD_REGION: 0,
        TRUNK_REGION: 2,
        ARM_REGION: 1,
        LEG_REGION: 3,
        femaleAcceptedPointList: [],
        maleAcceptedPointList: [],
        acceptList: [],

        initialize: function (options) {
            "use strict";
            this.eventBus = options.eventBus;

            this.events = {
                'mousedown #event-image': 'mouseDownOnImage',
                'mousemove #event-image': 'mouseMoveOnImage',
                'mouseup #event-image': 'mouseup',
                'click #psoriasis-event-canvas-bottom': 'onClearClick'
            };

            this.model = new BodyAtlas.Model.AffectedArea();
            _.bindAll(this, 'addOne', 'addAll', 'render', 'hover',
                'unhover', 'toggleGender', 'clearAllPlaquesOnCanvas', 'resetModel', 'mouseDownOnImage', 'mouseMoveOnImage',
                'mouseup', 'changeBrush', 'paintingHandler', 'onClearClick'); //, 'calculateScoresOnUpdate');

            // this ensures that the addOne Method is called,
            // automatically when a plaque is added to
            // the list of plaques
            this.model.bind('add', this.addOne);
            //this.model.bind('remove', this.calculateScoresOnUpdate);

            this.painting = false;
            this.painted = false;

            this.options.eventBus.bind("GenderChanged", this.toggleGender);
            //this.options.eventBus.bind("plaqueUpdated", this.calculateScoresOnUpdate);
            this.options.eventBus.bind("mouseState", this.paintingHandler);
            this.options.eventBus.bind("brushChanged", this.changeBrush);
            this.options.eventBus.bind("ItchUpdate", this.updateItchDisplay);
            this.options.eventBus.bind("PainUpdate", this.updatePainDisplay);
            this.maleAcceptedPointList = BodyAtlas.Points.Male;
            this.femaleAcceptedPointList = BodyAtlas.Points.Female;
            this.displayWoman();
        },

        // TO-CLEAN The following methods could be cleaned up and
        // consolidated
        paintingHandler: function (mouse) {
            "use strict";
            if (mouse.state === "up") {
                this.painting = false;
                this.model.clearAllFlags();
            }
        },

        displayMan: function () {
            "use strict";
            var _femaleMapAreas = $('#femaleMap').children(),
                _area;
            for (_area in _femaleMapAreas) {
                if (_femaleMapAreas.hasOwnProperty(_area)) {
                    $(_area).remove('mousedown');
                    $(_area).remove('mouseup');
                    $(_area).remove('mousemove');
                    $(_area).remove('mouseover');
                    $(_area).remove('mouseout');
                }
            }

            $('#base-image').attr('src', '/images/male_front_back_base.png');
            $('#masking-image').attr('src', '/images/male_front_back_transparent.png');
            $('#itch-image').attr('src', '/images/male_front_back_transparent_itch.png');
            $('#pain-image').attr('src', '/images/male_front_back_transparent_pain.png');
            $('#event-image').attr('src', '/images/male_front_back_base_transparent.png');
            //$('#event-image').attr('usemap', '#maleMap');

            //set the required css for the body images
            $('#base-image').attr('class', 'male-image');
            $('#masking-image').attr('class', 'male-image');
            $('#itch-image').attr('class', 'male-image');
            $('#pain-image').attr('class', 'male-image');
            $('#event-image').attr('class', 'male-image');

            this.delegateEvents(this.events);
            this.displayedGender = "Man";

            //sets the list of acceptable points to the male list
            this.acceptList = this.maleAcceptedPointList;
        },

        /**
         * Updates the itch display based on the itchLevel value specified
         * @param itchLevel
         */
        updateItchDisplay: function (itchLevel) {
            "use strict";
            $("#itch-image").css('opacity', (itchLevel / 10));
        },

        /**
         * Updates the pain display based on the painLevel value specified
         * @param painLevel
         */
        updatePainDisplay: function (painLevel) {
            "use strict";
            $("#pain-image").css('opacity', (painLevel / 100));
        },

        /**
         * Event handler which changes the selected severity on the
         * view
         *
         * @param {Number} brushNumber the number to change the severity too.
         */
        changeBrush: function (brushNumber) {
            "use strict";
            if (this.brushIsValid(brushNumber)) {
                this.selectedBrush = brushNumber;
            }
        },

        /**
         * Determines if the brush Number is within a valid range
         * @return boolean if valid false otherwise
         * @param numberToCheck - the severity number to check
         */
        brushIsValid: function (numberToCheck) {
            "use strict";
            return (0 < numberToCheck && numberToCheck < 10);
        },

        /**
         * Determines the position of the container an individual
         * plaque is being added to. this is used to determine
         * the exact position to place the plaque
         * @return {Object} {x:int, y:int} object which contains the x and y offset
         */
        getOffSetToPlacePlaques: function () {
            "use strict";
            var leftOffSet = 0,
                topOffSet = 0,
                //gets the value for the top and left margin
                marginLeft = parseInt(this.hexagonCanvas.css('margin-left').replace('px', ''), 10),
                marginTop = parseInt(this.hexagonCanvas.css('margin-top').replace('px', ''), 10);
            //gets the correct left offset to use to display the plaque correctly
            if (!isNaN(marginLeft)) {//if margin is a number add it to the left offset
                leftOffSet = this.hexagonCanvas.position().left + marginLeft;
            } else {
                leftOffSet = this.hexagonCanvas.position().left + 111; //else use this hardcoded margin value
            }

            //gets the correct top offset to use to display the plaque correctly
            if (!isNaN(marginTop)) {//if margin is a number add it to the top offset
                topOffSet = this.hexagonCanvas.position().top + marginTop;
            } else {
                topOffSet = this.hexagonCanvas.position().top; //else use this hardcoded margin value
            }

            return { x: leftOffSet, y: topOffSet };

        },

        mouseDownOnImage: function (e) {
            "use strict";
            if (!this.painting) {
                this.painting = true;
                this.applyBrush(e);
            }
        },

        mouseMoveOnImage: function (e) {
            "use strict";
            if (this.painting) {
                this.applyBrush(e);
            }
            return false;
        },

        mouseup: function () {
            "use strict";
            this.calculatesPasiInformation();
            this.painting = false;
            this.eventBus.trigger(BodyAtlas.EventNames.ItchPredictionCalculation, '0');
        },

        /**
         * Applies Plaque to the screen based on position in a
         * region and the selected severity apply plaque
         * @param e
         */
        applyBrush: function (e) {
            "use strict";
            var plaquePositionHelper = BodyAtlas.Utility.PlaquePositioningHelper(),
                posx = 0,
                posy = 0,
                region = 0,
                _offSet,
                actualX,
                actualY,
                _hexPos,
                _acceptablePoint = false,
                i,
                selectedSeverity;

            // get the mouse cursor position relative to the top
            // left
            // corner of the web page
            if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft
                    + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop
                    + document.documentElement.scrollTop;
            }

            _offSet = this.getOffSetToPlacePlaques();

            actualX = posx - _offSet.x;
            actualY = posy - _offSet.y;

            actualX = actualX + 4;
            actualY = actualY + 5;
            _hexPos = plaquePositionHelper.GetNearestHexPosition(actualX, actualY);

            //check if the point is in the list of accepted point (ie not a barely visible edge point)
            //also gets the bounded region for the point
            for (i = 0; i < this.acceptList.length; i += 1) {
                if (this.acceptList[i].x === _hexPos.x && this.acceptList[i].y === _hexPos.y) {
                    region = this.acceptList[i].reg;
                    _acceptablePoint = true;
                    break;
                }
            }

            if (!_acceptablePoint) {
                return;
            }

            switch (this.selectedBrush) {
                //add plaque if a severity brush is selected
            case BodyAtlas.Model.BrushLevel.LEVLE1:
            case BodyAtlas.Model.BrushLevel.LEVLE2:
            case BodyAtlas.Model.BrushLevel.LEVLE3:
            case BodyAtlas.Model.BrushLevel.LEVLE4:
            case BodyAtlas.Model.BrushLevel.LEVLE5:
            case BodyAtlas.Model.BrushLevel.LEVLE6:
                selectedSeverity = this.selectedBrush;
                this.model.addPlaque(_hexPos.x, _hexPos.y,
                    selectedSeverity, region);
                //console.log("This is Matthew trying to grab the coordinates");
                //console.log(_hexPos);
                break;

            case BodyAtlas.Model.BrushLevel.INCREASE: //increase severity if increase brush is selected
                this.model.increasePlaqueAt(_hexPos.x, _hexPos.y, region);
                break;

            case BodyAtlas.Model.BrushLevel.REDUCE: //reduceSeverity if the reduce brush is selected
                this.model.reducePlaqueAt(_hexPos.x, _hexPos.y);
                break;

            case BodyAtlas.Model.BrushLevel.REMOVE: //remove plaque if the remove brush is selected
                this.model.removePlaqueAt(_hexPos.x, _hexPos.y);
                break;
            }

        },

        render: function () {
            "use strict";
            this.hexagonCanvas.html(''); // clear all
            this.addAll(); // add all
            //this.calculatesPasiInformation();
        },

        /**
         * Adds one hexagon plaque to the screen
         * @param plaque - contains the plaque to add
         */
        addOne: function (plaque) {
            "use strict";
            var view = new BodyAtlas.View.PlaqueView({
                model: plaque,
                eventBus: this.options.eventBus
            }).render().el;
            this.hexagonCanvas.append(view);
            //this.calculatesPasiInformation();//update pasi information
        },

        /**
         * Adds all plaque in the model
         */
        addAll: function () {
            "use strict";
            this.model.each(this.addOne);
        },

        displayWoman: function () {
            "use strict";
            var _maleMapAreas = $('#maleMap').children(),
                _area;
            for (_area in _maleMapAreas) {
                if (_maleMapAreas.hasOwnProperty(_area)) {
                    $(_area).remove('mousedown');
                    $(_area).remove('mouseup');
                    $(_area).remove('mousemove');
                    $(_area).remove('mouseover');
                    $(_area).remove('mouseout');
                }
            }

            //set the female body images
            $('#base-image').attr('src', '/images/female_front_back_base.png');
            $('#masking-image').attr('src', '/images/female_front_back_transparent.png');
            $('#itch-image').attr('src', '/images/female_front_back_transparent_itch.png');
            $('#pain-image').attr('src', '/images/female_front_back_transparent_pain.png');
            $('#event-image').attr('src', '/images/female_front_back_base_transparent.png');
            $('#event-image').attr('usemap', '#femaleMap');

            // set the required css for the body images
            $('#base-image').attr('class', 'female-image');
            $('#masking-image').attr('class', 'female-image');
            $('#itch-image').attr('class', 'female-image');
            $('#pain-image').attr('class', 'female-image');
            $('#event-image').attr('class', 'female-image');

            this.delegateEvents(this.events);
            this.displayedGender = "Woman";

            //sets the list of acceptable points to the female list
            this.acceptList = this.femaleAcceptedPointList;
        },

        hover: function () {
            "use strict";
            $(this.el).toggleClass('plaque-cursor');
        },

        unhover: function () {
            "use strict";
            $(this.el).toggleClass('plaque-cursor');
        },

        onClearClick: function () {
            "use strict";
            $('#hiddenClearStatus').val('true');
            this.options.eventBus.trigger(BodyAtlas.EventNames.UnsortDLQIGraphs);
            this.resetModel();
        },
        /**
         *resets the affected area model which effectively clears all plaques.
         *It also resets the pain and itch fields
         */
        resetModel: function () {
            "use strict";
            //first clear the Itch and Pain Sliders
            this.eventBus.trigger(BodyAtlas.EventNames.ResetItchSlider, this); //this.clearItch();
            this.eventBus.trigger(BodyAtlas.EventNames.ResetPainSlider, this); //this.clearPain();
            this.options.eventBus.trigger(BodyAtlas.EventNames.ItchUpdate, '0');
            this.options.eventBus.trigger(BodyAtlas.EventNames.PainUpdate, '0');
            //then clear all plaques
            this.clearAllPlaquesOnCanvas();


            //show getting started instruction panel
            $('#instructions-panel').css('display', 'block');
            $('#aggregate-score-panel').css('display', 'none');
            $('#impact-graphs').css('display', 'none');
        },

        /**
         * Changes the currently displayed gender
         * and clears any statistics if the gender
         * is changed on edit
         */
        toggleGender: function (gender) {
            "use strict";
            if ((gender === BodyAtlas.Model.Gender.MALE) && (this.displayedGender !== 'Man')) {
                this.displayMan();
                this.resetModel();
            } else if ((gender === BodyAtlas.Model.Gender.FEMALE) && (this.displayedGender !== 'Woman')) {
                this.displayWoman();
                this.resetModel();
            }
        },

        /**
         * Calls the function to clear all plaques from the
         * gender models
         */
        clearAllPlaquesOnCanvas: function () {
            "use strict";
            this.hexagonCanvas.html(''); //clear all plaques on the html canvas
            this.model = new BodyAtlas.Model.AffectedArea(); //gets a new affected area with no plaques

            //bind the events to the new model
            this.model.bind('add', this.addOne);
            //this.model.bind('remove', this.calculateScoresOnUpdate);

            //resets the pasi information using the data from the new affected area.
            this.calculatesPasiInformation(); //update pasi information
        },


        /**
         * Calculate basic score and area information for each
         * region and triggers an event containing the data
         */
        calculatesPasiInformation: function () {
            "use strict";
            var coverageData = this.model.getCoverageData(),
                inputs = {},
                dLQICalculator,
                pASI;
            if (this.displayedGender === 'Man') {
                inputs = {
                    Male: 1
                };
            } else {
                inputs = {
                    Male: 0
                };
            }
            dLQICalculator = BodyAtlas.DLQI.DLQIIndividualPredictor("randomName",
                "xcoefficient", {
                    Male: inputs.Male
                });

            pASI = {
                HeadScore: 0,
                HeadArea: 0,
                UpperLimbScore: 0,
                UpperLimbArea: 0,
                TrunkScore: 0,
                TrunkArea: 0,
                LowerLimbScore: 0,
                LowerLimbArea: 0
            };
            pASI.HeadScore = dLQICalculator.calculateSeverity(coverageData.head.severities);
            pASI.HeadArea = dLQICalculator.calculateCoverage(dLQICalculator.bodyRegions().HEAD, coverageData.head.plaqueCount);
            pASI.UpperLimbScore = dLQICalculator.calculateSeverity(coverageData.arms.severities);
            pASI.UpperLimbArea = dLQICalculator.calculateCoverage(dLQICalculator.bodyRegions().UPPER_EXTREMETIES, coverageData.arms.plaqueCount);
            pASI.TrunkScore = dLQICalculator.calculateSeverity(coverageData.trunk.severities);
            pASI.TrunkArea = dLQICalculator.calculateCoverage(dLQICalculator.bodyRegions().TORSO, coverageData.trunk.plaqueCount);
            pASI.LowerLimbScore = dLQICalculator.calculateSeverity(coverageData.legs.severities);
            pASI.LowerLimbArea = dLQICalculator.calculateCoverage(dLQICalculator.bodyRegions().LOWER_EXTREMETIES, coverageData.legs.plaqueCount);
            this.options.eventBus.trigger(BodyAtlas.EventNames.PASIUpdate, pASI);
        }

    }),

    /**
     * A tab UI to hold DLQI and graphs information
     */
    TabPanel: Backbone.View.extend({
        el: $("#impact-graphs"),

        initialize: function () {
            "use strict";
            _.bindAll(this, "render");
            this.render();
        },

        render: function () {
            "use strict";
            $(function () {
                $("#impact-graphs").tabs();
            });

        }

    }),

    /**
     * View for individual Quality of life graphs
     */
    QOLIndividualGraph: Backbone.View.extend({
        tagName: 'div',
        className: 'QOLGraph',

        initialize: function (options) {
            "use strict";
            _.bindAll(this, 'render');
            this.model = options.model;
            this.model.bind('change', this.render);
            this.model.view = this;
            this.render();
            this.eventBus = options.eventBus;
        },

        render: function () {
            "use strict";
            var _graphPrefix = "QOLGraph";
            $(this.el).attr('id', _graphPrefix + this.model.get('id'));
            $(this.el).html(_.template($('#qol-graph-tmpl').html(), this.model.toObjectLiteral()));
            return this;
        }
    }),

    /**
     * View for individual DLQI graphs
     */
    DLQIIndividualGraph: Backbone.View.extend({
        tagName: 'div',
        className: 'barcontainer',

        initialize: function (options) {
            "use strict";
            _.bindAll(this, "render");
            this.model = options.model;
            this.model.bind('change', this.render);
            this.model.view = this;
            this.render();
            this.eventBus = options.eventBus;
        },

        render: function () {
            "use strict";
            var _graphPrefix = "Graph";
            $(this.el).attr('id', _graphPrefix + this.model.get('id'));
            $(this.el).html(_.template($('#individual-dlqigraph-tmpl').html(), this.model.toObjectLiteral()));

            $(this.el).find('img').map(function () {
                $(this).tooltip({ position: "top center" });
            });

            return this;
        }
    }),

    /**
     * A View to hold the list of dlqi individual graphs
     */
    DLQIGraphs: Backbone.View.extend({
        el: $('#tabs-content-left'),

        events: {
            'click #sortButton': 'sortButtonClick',
            'click #unsortButton': 'unsortButtonClick'
        },

        initialize: function (options) {
            "use strict";
            _.bindAll(this, "render", "sortButtonClick", "unsortButtonClick", "unsortOnClear");

            //
            this.model = options.model;
            this.model.comparator = this.sortComparator;
            this.render();
            options.eventBus.bind(BodyAtlas.EventNames.UnsortDLQIGraphs, this.unsortOnClear);
        },


        /**
         * Comparator to be used to compare the graph
         *
         *
         * @return number the value to use to compare graphs
         * @param graph to get the value for
         */
        sortComparator: function (graph) {
            "use strict";
            //the 'very much' and 'a lot' values are used to compare the graphs
            var lowAndHighSum = graph.get('highPercent') + graph.get('midPercent');
            return lowAndHighSum * -1; //sorting is done from smallest to highest. multiplying by -1 make this work from highest to lowest
        },

        sortComparatorById: function (graph) {
            "use strict";
            //the 'very much' and 'a lot' values are used to compare the graphs
            return graph.get('Id'); //sorting is done from smallest to highest. multiplying by -1 make this work from highest to lowest
        },
        sortButtonClick: function () {
            "use strict";
            $('#sortButton').attr('style', 'display:none');
            $('#unsortButton').attr('style', 'display:block');
            this.model.comparator = this.sortComparator;
            this.render();

        },
        unsortButtonClick: function () {
            "use strict";
            this.unsort();
        },
        unsort: function () {
            "use strict";
            $('#sortButton').attr('style', 'display:block');
            $('#unsortButton').attr('style', 'display:none');
            this.model.comparator = this.sortComparatorById;
            this.render();
        },
        unsortOnClear: function () {
            "use strict";
            if ($('#hiddenClearStatus').val() === 'true') {
                this.unsort();
                $('#hiddenClearStatus').val('false');
            }
        },
        render: function () {
            "use strict";
            $('#dlqigraphs').html(''); //clear the graphs
            this.model.sort();
            _.each(this.model.models, function (dlqi) {
                var _view = new BodyAtlas.View.DLQIIndividualGraph({ model: dlqi });
                $('#dlqigraphs').append(_view.render().el);
            });
        }

    }),

    /**
     * A View to hold the two QOL graphs
     */
    QOLGraphs: Backbone.View.extend({
        el: $('#QOL-graphs'),

        events: {
            'mouseover #activities-bubble-icon': 'activitiesBubbleClick',
            'mouseover #work-productivity-bubble-icon': 'workProductivityBubbleClick',
            'mouseout #activities-bubble-icon': 'activitiesBubbleMouseOut',
            'mouseout #work-productivity-bubble-icon': 'workProductivityBubbleMouseOut'
        },

        initialize: function (options) {
            "use strict";
            _.bindAll(this, "render", "activitiesBubbleClick", "workProductivityBubbleClick", "activitiesBubbleMouseOut");
            options.eventBus.bind(BodyAtlas.EventNames.PatientUpdate, this.render);
            // options.eventBus.bind("mouseState", this.hideInfoBubble);
            this.eventBus = options.eventBus;
            this.model = options.model;
            this.render();
        },

        render: function () {
            "use strict";
            $('#QOL-graphs').html(''); //clear the graphs

            _.each(this.model.models, function (qolGraph) {
                if (qolGraph.get('display')) {
                    var _view = new BodyAtlas.View.QOLIndividualGraph({ model: qolGraph });
                    $('#QOL-graphs').append(_view.render().el);
                }
            });
        },

        activitiesBubbleClick: function () {
            "use strict";
            $('#activities-bubble').css('display', 'block');
        },
        activitiesBubbleMouseOut: function () {
            "use strict";
            $('#activities-bubble').css('display', 'none');
        },
        workProductivityBubbleClick: function () {
            "use strict";
            $('#work-productivity-bubble').css('display', 'block');
        },
        workProductivityBubbleMouseOut: function () {
            "use strict";
            $('#work-productivity-bubble').css('display', 'none');
        }

    }),

    /**
     * A view to hold DLQI Summary events
     */
    DLQISummary: Backbone.View.extend({
        el: $('#dlqiaggrgate-graphs'),
        events: {
            'mouseover #quality-bubble-icon': 'qualityBubbleIconMouseOver',
            'mouseout #quality-bubble-icon': 'qualityBubbleIconMouseOut',
            'mouseover #dlqimarker': 'dlqiMarkerMouseOver',
            'mouseout #dlqimarker': 'dlqiMarkerMouseOut'
        },
        initialize: function (options) {
            "use strict";
            _.bindAll(this, "qualityBubbleIconMouseOver", "qualityBubbleIconMouseOut", "dlqiMarkerMouseOver", "dlqiMarkerMouseOut");
            this.eventBus = options.eventBus;
        },
        dlqiMarkerMouseOver: function () {
            "use strict";
            $('#dlqiMarkerScore').css('display', 'block');
        },
        dlqiMarkerMouseOut: function () {
            "use strict";
            $('#dlqiMarkerScore').css('display', 'none');
        },
        qualityBubbleIconMouseOver: function () {
            "use strict";
            $('#quality-bubble').css('display', 'block');
        },
        qualityBubbleIconMouseOut: function () {
            "use strict";
            $('#quality-bubble').css('display', 'none');
        }
    }),

    /**
     * A View to hold the aggregate dlqi individual graph
     */
    DLQIAggregateGraph: Backbone.View.extend({
        initialize: function (options) {
            "use strict";
            _.bindAll(this, "render", "getUILiteral");
            this.eventBus = options.eventBus;
            this.model.bind('change', this.render);
            this.model = options.model;
            this.render();

        },

        render: function () {
            "use strict";
            $('#dlqiaggrgate-graphs').html(_.template($('#aggregate-dlqigraph-tmpl').html(), this.getUILiteral()));
        },

        getUILiteral: function () {
            "use strict";
            var _lengthPerEffect = 355 / 5, //355px is the length of the actual graphical scale while 382px is the length of the image of the entire scale plus trailing while space for labels. There are five sections in the scale: No effect, small, moderate, very large, extremely large.
                _offSetEffect = 0,
                _offSetScale = 0,
                _markerPosition = 9,
                _qolValue = parseFloat(this.model.get('QOLValue')),
                _position,
                _dlqibubbleposition,
                _dlqimarkerwidth;
            if (_qolValue < 1.5) {//No effect=0<=DLQI Value<1.5
                _offSetEffect = _lengthPerEffect / 1.49 * _qolValue;
                _offSetScale = _offSetEffect;
            } else if (_qolValue <= 5.0) {//Small=1.5<=DLQI Value<=5
                _offSetEffect = _lengthPerEffect / 3.5 * (_qolValue - 1.49);
                _offSetScale = _offSetEffect + _lengthPerEffect;
                _markerPosition += _lengthPerEffect;
            } else if (_qolValue <= 10.0) {//Moderate=5<DLQI Value<=10
                _offSetEffect = _lengthPerEffect / 5 * (_qolValue - 5);
                _offSetScale = _offSetEffect + 2 * _lengthPerEffect;
                _markerPosition += _lengthPerEffect * 2;
            } else if (_qolValue <= 20.0) {//very large=10<DLQI Value<=20
                _offSetEffect = _lengthPerEffect / 10 * (_qolValue - 10);
                _offSetScale = _offSetEffect + 3 * _lengthPerEffect;
                _markerPosition += _lengthPerEffect * 3;
            } else {//extremely large=20<DLQI Value<=30
                _offSetEffect = _lengthPerEffect / 10 * (_qolValue - 20);
                _offSetScale = _offSetEffect + 4 * _lengthPerEffect;
                _markerPosition += _lengthPerEffect * 4;
            }
            _position = _offSetScale;
            _dlqibubbleposition = _position - 230;
            _dlqimarkerwidth = _lengthPerEffect - 2;
            return { dlqiposition: _position,
                dlqieffect: this.model.get('QOLEffect'),
                dlqivalue: _qolValue,
                dlqiscalemarkerpostion: _markerPosition,
                dlqibubbleposition: _dlqibubbleposition,
                dlqimarkerwidth: _dlqimarkerwidth
                };
        }
    }),

    /**
     * Used to testing/acceptance purposes only.
     */
    TestView: Backbone.View.extend({
        el: $("#console"),

        initialize: function (options) {
            "use strict";
            _.bindAll(this, "render");
            this.eventBus = options.eventBus;
            this.eventBus.bind(BodyAtlas.EventNames.RecalculateGraphs, this.srender);
        },

        srender: function (inputs) {
            "use strict";
            //embarrassment
            inputs.EVeryMuch = $("#Graph1 .highcolor").attr("style").split("width:")[1];
            inputs.EAlot = $("#Graph1 .midcolor").attr("style").split("width:")[1];
            inputs.EALittle = $("#Graph1 .lowcolor").attr("style").split("width:")[1];

            //itch/pain
            inputs.EVeryMuch2 = $("#Graph2 .highcolor").attr("style").split("width:")[1];
            inputs.EAlot2 = $("#Graph2 .midcolor").attr("style").split("width:")[1];
            inputs.EALittle2 = $("#Graph2 .lowcolor").attr("style").split("width:")[1];

            //SexualDifficulties
            inputs.EVeryMuch3 = $("#Graph3 .highcolor").attr("style").split("width:")[1];
            inputs.EAlot3 = $("#Graph3 .midcolor").attr("style").split("width:")[1];
            inputs.EALittle3 = $("#Graph3 .lowcolor").attr("style").split("width:")[1];

            //SocialActivities
            inputs.EVeryMuch4 = $("#Graph4 .highcolor").attr("style").split("width:")[1];
            inputs.EAlot4 = $("#Graph4 .midcolor").attr("style").split("width:")[1];
            inputs.EALittle4 = $("#Graph4 .lowcolor").attr("style").split("width:")[1];

            //Work/Study
            inputs.EVeryMuch5 = $("#Graph5 .highcolor").attr("style").split("width:")[1];
            inputs.EAlot5 = $("#Graph5 .midcolor").attr("style").split("width:")[1];
            inputs.EALittle5 = $("#Graph5 .lowcolor").attr("style").split("width:")[1];

            //Sports
            inputs.EVeryMuch6 = $("#Graph6 .highcolor").attr("style").split("width:")[1];
            inputs.EAlot6 = $("#Graph6 .midcolor").attr("style").split("width:")[1];
            inputs.EALittle6 = $("#Graph6 .lowcolor").attr("style").split("width:")[1];

            //Treatment
            inputs.EVeryMuch7 = $("#Graph7 .highcolor").attr("style").split("width:")[1];
            inputs.EAlot7 = $("#Graph7 .midcolor").attr("style").split("width:")[1];
            inputs.EALittle7 = $("#Graph7 .lowcolor").attr("style").split("width:")[1];

            //Clothing
            inputs.EVeryMuch8 = $("#Graph8 .highcolor").attr("style").split("width:")[1];
            inputs.EAlot8 = $("#Graph8 .midcolor").attr("style").split("width:")[1];
            inputs.EALittle8 = $("#Graph8 .lowcolor").attr("style").split("width:")[1];

            //Household Activities
            inputs.EVeryMuch9 = $("#Graph9 .highcolor").attr("style").split("width:")[1];
            inputs.EAlot9 = $("#Graph9 .midcolor").attr("style").split("width:")[1];
            inputs.EALittle9 = $("#Graph9 .lowcolor").attr("style").split("width:")[1];

            //Family/Friends
            inputs.EVeryMuch10 = $("#Graph10 .highcolor").attr("style").split("width:")[1];
            inputs.EAlot10 = $("#Graph10 .midcolor").attr("style").split("width:")[1];
            inputs.EALittle10 = $("#Graph10 .lowcolor").attr("style").split("width:")[1];

            //PASI and coverage score.
            var _predictor = new BodyAtlas.DLQI.DLQIIndividualPredictor("PASI", {}, inputs),
                _math = new BodyAtlas.Utility.Math();
            inputs.pASIScore = _math.roundToXDecimal(_predictor.calculateAdjustedPASI(inputs), 3);

            inputs.coverage = _math.roundToXDecimal(_predictor.calculateTotalCoverage(inputs), 3);

            $('#console').html(_.template($('#console-tmpl').html(), inputs));

            //$(_graphSelector).html(_.template($('#individual-dlqigraph-tmpl').html(), this.model.toObjectLiteral()));
        }

    })
};
