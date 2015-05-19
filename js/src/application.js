/*jslint nomen : true*/
/*jslint bitwise : true*/
/*jslint browser : true*/
/*jslint unparam: true */
/*global $, BodyAtlas, _, Backbone */

window.BodyAtlas = {

    EventBus: function () {
        "use strict";
        return _.extend({}, Backbone.Events);
    },

    /**
     * Class help position plaque so they are placed in a grid like fashion.
     */
    MouseManager: function (eventBus) {
        "use strict";
        $("body").mouseup(function (e) {
            eventBus.trigger("mouseState", { state: "up" });
        }).mousedown(function () {
            eventBus.trigger("mouseState", { state: "down" });
        });
    },

    EventNames: {
        PatientUpdate: "UpdatePatient",
        PASIUpdate: "UpdatePasi",
        RecalculateGraphs: "RecalculateGraphs",
        ShowMainScreen: 'ShowMainScreen',
        GenderChanged: 'GenderChanged',
        ItchUpdate: 'ItchUpdate',
        PainUpdate: 'PainUpdate',
        ResetItchSlider: 'ResetItchSlider',
        ResetPainSlider: 'ResetPainSlider',
        PrintClick: 'PrintClick',
        PatientEdit: 'PatientEdit',
        AggregateScoreUpdate: 'AggregateScoreUpdate',
        OQLAggregateScoreUpdate: 'OQLAggregateScoreUpdate',
        OQLActivityProductivityUpdate: 'OQLActivityProductivityUpdate',
        ItchPrediction: 'ItchPrediction',
        PainPrediction: 'PainPrediction',
        ItchPredictionCalculation: 'ItchPredictionCalculation',
        PainPredictionCalculation: 'PainPredictionCalculation'
    },

    UI : {
        AppView: Backbone.View.extend({

            initialize: function () {
                "use strict";
                _.bindAll(this, "render");

                /* hardcoded inputs */
                var _inputs = {

                    Age: 25,
                    Female: 1,
                    Weight: 75,
                    Pruritis: 0,
                    Pain: 0,
                    PsoriaticArthritis: 1,
                    PsoriasisDuration: 20,
                    HeadScore: 0,
                    HeadArea: 0,
                    UpperLimbScore: 0,
                    UpperLimbArea: 0,
                    TrunkScore: 0,
                    TrunkArea: 0,
                    LowerLimbScore: 0,
                    LowerLimbArea: 0
                };

                this.eventBus = new BodyAtlas.EventBus();
                this.dlqiInput = new BodyAtlas.Model.DLQIInput({ eventBus: this.eventBus });
                this.canvas = new BodyAtlas.View.PsoriasisCanvas({ eventBus: this.eventBus });
                this.mouseManager = new BodyAtlas.MouseManager(this.eventBus);
                this.palletteBar = new BodyAtlas.View.PalletteBar({ eventBus: this.eventBus});
                this.tabPanel = new BodyAtlas.View.TabPanel({});
                this._graph = this.graphModels(_inputs, this.eventBus);
                this._qOLGraph = this.qOLgraphModels(_inputs, this.eventBus);
                this._aggregateGraph = new BodyAtlas.View.DLQIAggregateGraph({
                    eventBus: this.eventBus,
                    model: new BodyAtlas.Model.DLQIAggregateModel({ eventBus: this.eventBus })
                });
                this._aggregateScorePanel = new BodyAtlas.View.AggregateScorePanel({
                    eventBus: this.eventBus,
                    model: new BodyAtlas.Model.AggregateScoreModel({ eventBus: this.eventBus })
                });
                this._dlqiSummary = new BodyAtlas.View.DLQISummary({
                    eventBus: this.eventBus
                });
                this.test = new BodyAtlas.View.TestView({ eventBus: this.eventBus });

                this.patientModel = new BodyAtlas.Model.PatientModel({ eventBus: this.eventBus });
                this.patientWindow = new BodyAtlas.View.PatientDataWindow({
                    eventBus: this.eventBus,
                    model: this.patientModel
                });

                this.instructionsPanel = new BodyAtlas.View.InstructionsPanel({
                    eventBus: this.eventBus
                });

                this.patientViewWindow = new BodyAtlas.View.PatientDataViewWindow({
                    eventBus: this.eventBus
                });

                this.helpScreenExplanation = new BodyAtlas.View.BodyAtlasHelpScreenExplanation({
                    eventBus: this.eventBus
                });

                this.mainScreenDisplay = new BodyAtlas.View.BodyAtlasDisplayPane({
                    eventBus: this.eventBus
                });

                this._itchingLevelPanel = new BodyAtlas.View.ItchingLevelPanel({
                    eventBus: this.eventBus,
                    model: this.patientModel
                });

                this._painLevelPanel = new BodyAtlas.View.PainLevelPanel({
                    eventBus: this.eventBus,
                    model: this.patientModel
                });

                this._printPane = new BodyAtlas.View.PrintPane({
                    eventBus: this.eventBus
                });
            },
            graphModels : function (_inputs, eventBus) {
                "use strict";
                var dlqiData,
                    _graphModels = new BodyAtlas.Model.DLQIIndividualModelList({ eventBus: eventBus });
                for (dlqiData in BodyAtlas.DLQI.DLQIData) {
                    if (BodyAtlas.DLQI.DLQIData.hasOwnProperty(dlqiData)) {
                        _graphModels.add(new BodyAtlas.Model.DLQIIndividual({
                            Id: BodyAtlas.DLQI.DLQIData[dlqiData].Id,
                            name: BodyAtlas.DLQI.DLQIData[dlqiData].Name,
                            coefficients: BodyAtlas.DLQI.DLQIData[dlqiData].Coefficients,
                            inputs: _inputs
                        }));
                    }
                }
                return new BodyAtlas.View.DLQIGraphs({ model: _graphModels, eventBus: eventBus });
            },

            qOLgraphModels : function (_inputs, eventBus) {
                "use strict";
                var qolData,
                    _qOLgraphModels = new BodyAtlas.Model.QOLIndividualModelList({ eventBus: eventBus });
                for (qolData in BodyAtlas.DLQI.QOLData) {
                    if (BodyAtlas.DLQI.QOLData.hasOwnProperty(qolData)) {
                        _qOLgraphModels.add(new BodyAtlas.Model.QOLIndividual({
                            Id: BodyAtlas.DLQI.QOLData[qolData].Id,
                            name: BodyAtlas.DLQI.QOLData[qolData].Name,
                            coefficients: BodyAtlas.DLQI.QOLData[qolData].Coefficients,
                            inputs: _inputs
                        }));
                    }
                }
                return new BodyAtlas.View.QOLGraphs({ model: _qOLgraphModels, eventBus: eventBus });
            },

            render: function () {
                "use strict";
                return this;
            }
        })
    },

    // change value to false to disable debug logger
    Logger : window.appendLogger().debugEnabled(true)
};
