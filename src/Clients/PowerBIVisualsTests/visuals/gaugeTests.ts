/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved. 
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *   
 *  The above copyright notice and this permission notice shall be included in 
 *  all copies or substantial portions of the Software.
 *   
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

/// <reference path="../_references.ts"/>

module powerbitests {
    import DataViewTransform = powerbi.data.DataViewTransform;
    import GaugeVisual = powerbi.visuals.Gauge;
    import gaugeVisualCapabilities = powerbi.visuals.gaugeCapabilities;
    import SVGUtil = powerbi.visuals.SVGUtil;

    var sideNumbersVisibleMinHeight: number = powerbi.visuals.visualPluginFactory.MobileVisualPluginService.MinHeightGaugeSideNumbersVisible;
    var sideNumbersVisibleGreaterThanMinHeight: number = sideNumbersVisibleMinHeight + 1;
    var sideNumbersVisibleSmallerThanMinHeight: number = sideNumbersVisibleMinHeight - 1;
    var sideNumbersVisibleGreaterThanMinHeightString: string = sideNumbersVisibleGreaterThanMinHeight.toString();
    var sideNumbersVisibleSmallerThanMinHeightString: string = sideNumbersVisibleSmallerThanMinHeight.toString();
    var marginsOnSmallViewPort: number = powerbi.visuals.visualPluginFactory.MobileVisualPluginService.GaugeMarginsOnSmallViewPort;

    class GaugeDataBuilder {
        private _dataViewMetadata: powerbi.DataViewMetadata = {
            columns: [
                {
                    displayName: "col1",
                    roles: { "Y": true },
                    isMeasure: true,
                    objects: { general: { formatString: "$0" } },
                }, {
                    displayName: "col2",
                    roles: { "MinValue": true },
                    isMeasure: true
                }, {
                    displayName: "col3",
                    roles: { "MaxValue": true },
                    isMeasure: true
                }, {
                    displayName: "col4",
                    roles: { "TargetValue": true },
                    isMeasure: true
                }],
            groups: [],
            measures: [0],
        };

        public get dataViewMetadata(): powerbi.DataViewMetadata {
            return this._dataViewMetadata;
        }

        public set dataViewMetadata(value: powerbi.DataViewMetadata) {
            this._dataViewMetadata = value;
        }

        private _visual: powerbi.IVisual;

        public get visual(): powerbi.IVisual {
            return this._visual;
        }
        
        private _element: JQuery;

        public get element(): JQuery {
            return this._element;
        }

        private _height: string;

        public get height(): string {
            return this._height;
        }

        public set height(value: string) {
            this._height = value;

            this.init();
        }

        private _width: string;

        public get width(): string {
            return this._width;
        }

        public set width(value: string) {
            this._width = value;

            this.init();
        }

        private _pluginName: string;

        public get pluginName(): string {
            return this._pluginName;
        }

        public set pluginName(value: string) {
            this._pluginName = value;
        }

        private _hostServices: powerbi.IVisualHostServices;

        public get hostServices(): powerbi.IVisualHostServices {
            return this._hostServices;
        }

        public set hostServices(value: powerbi.IVisualHostServices) {
            this._hostServices = value;
        }

        private _style: powerbi.IVisualStyle;

        public get style(): powerbi.IVisualStyle {
            return this._style;
        }

        private _singleValue: any;

        public get singleValue(): any {
            return this._singleValue;
        }

        public set singleValue(value: any) {
            this._singleValue = value;
        }

        private _categoricalValues: powerbi.DataViewValueColumns;

        public get categoricalValues(): powerbi.DataViewValueColumns {
            return this._categoricalValues;
        }

        public set categoricalValues(value: powerbi.DataViewValueColumns) {
            this._categoricalValues = value;
        }

        private _values: any[] = [];

        public get values(): any[] {
            return this._values;
        }

        public set values(value: any[]) {
            this._values = value;

            this.buildCategorialValues();
        }

        private _isMobile: boolean = false;

        public get isMobile(): boolean {
            return this._isMobile;
        }

        public set isMobile(value: boolean) {
            this._isMobile = value;

            this.init();
        }

        private _dataView: powerbi.DataView;

        public get dataView(): powerbi.DataView {
            if (!this._dataView) {
                this.buildDataView();
            }

            return this._dataView;
        }

        constructor(pluginName: string, height: string = "500", width: string = "500", isMobile: boolean = false) {
            this._pluginName = pluginName;
            this._height = height;
            this._width = width;

            this.init();
        }

        private init() {
            this._element = powerbitests.helpers.testDom(this.height, this.width);
            
            this.buildVisual();

            this._hostServices = powerbitests.mocks.createVisualHostServices();
            this._style = powerbi.visuals.visualStyles.create();

            this.visualInit();
        }

        private buildVisual() {
            if (this.isMobile) {
                this._visual = powerbi.visuals.visualPluginFactory.createMobile().getPlugin(this.pluginName).create();
            } else {
                this._visual = powerbi.visuals.visualPluginFactory.create().getPlugin(this.pluginName).create();
            }
        }

        private buildCategorialValues() {
            var categorialValues: any[] = [];

            for (var i = 0; i < this.values.length; i++) {
                var categorialValue = {
                    source: this.dataViewMetadata.columns[i],
                    values: this.values[i]
                };

                categorialValues.push(categorialValue);
            }

            this._categoricalValues = DataViewTransform.createValueColumns(categorialValues);
        }

        public visualInit() {
            this.visual.init({
                element: this.element,
                host: this.hostServices,
                style: this.style,
                viewport: {
                    height: this.element.height(),
                    width: this.element.width()
                },
                animation: { transitionImmediate: true }
            });
        }

        private buildDataView() {
            this._dataView = {
                metadata: this.dataViewMetadata,
                single: {value: this.singleValue},
                categorical: {
                    values: this.categoricalValues
                }
            };
        } 

        public onDataChanged() {
            this.visual.onDataChanged({
                dataViews: [this.dataView]
            });
        }
    }

    class GaugeVisualDataBuilder extends GaugeDataBuilder {
        public get gauge() {
            return <GaugeVisual> this.visual;
        }

        private _warningSpy;

        public get warningSpy() {
            return this._warningSpy;
        }

        constructor(pluginName: string) {
            super(pluginName);

            this._warningSpy = jasmine.createSpy("warning");
            this.hostServices.setWarnings = this.warningSpy;

            this.initGaugeSpy();
        }

        private initGaugeSpy() {
            spyOn(this.gauge, "getGaugeVisualProperties").and.callThrough();
            spyOn(this.gauge, "getAnimatedNumberProperties").and.callThrough();
            spyOn(this.gauge, "drawViewPort").and.callThrough();
        }

        public onDataChanged() {
            this.gauge.onDataChanged({
                dataViews: [this.dataView]
            });
        }

        public onResizing(height: number, width: number) {
            this.gauge.onResizing({
                height: height,
                width: width
            });
        }
    }

    describe("Gauge", () => {
        beforeEach(() => {
            powerbitests.mocks.setLocale();
        });

        it("Capabilities should include dataViewMappings", () => {
            expect(gaugeVisualCapabilities.dataViewMappings).toBeDefined();
        });

        it("Capabilities should include dataRoles", () => {
            expect(gaugeVisualCapabilities.dataRoles).toBeDefined();
        });

        it("Capabilities should not suppressDefaultTitle", () => {
            expect(gaugeVisualCapabilities.suppressDefaultTitle).toBeUndefined();
        });

        it("Capabilities should include dataRoles", () => {
            expect(gaugeVisualCapabilities.dataRoles).toBeDefined();
        });

        it("FormatString property should match calculated", () => {
            expect(powerbi.data.DataViewObjectDescriptors.findFormatString(gaugeVisualCapabilities.objects)).toEqual(GaugeVisual.formatStringProp);
        });
    });

    describe("Gauge DOM tests", () => {
        var gaugeDataBuilder: GaugeDataBuilder;

        beforeEach(() => {
            gaugeDataBuilder = new GaugeDataBuilder("gauge");
        });

        it("Ensure min & target dont overlap", (done) => {
            gaugeDataBuilder.singleValue = 10;
            gaugeDataBuilder.values = [[10], [0], [300], [0]];

            gaugeDataBuilder.onDataChanged();

            setTimeout(() => {
                var targetText = $(".targetText");
                var maxLabel = $($(".labelText")[0]);
                expect(targetText.length).toBe(1);

                var xyTarget = { x: targetText.attr("x"), y: targetText.attr("y") };
                var xyMaxlabel = { x: maxLabel.attr("x"), y: maxLabel.attr("y") };

                expect(xyTarget.x).not.toEqual(xyMaxlabel.x);
                expect(xyTarget.y).not.toEqual(xyMaxlabel.y);
                done();

            }, DefaultWaitForRender);
        });

        it("Ensure max & target dont overlap", (done) => {
            gaugeDataBuilder.singleValue = 10;
            gaugeDataBuilder.values = [[10], [0], [300], [300]];

            gaugeDataBuilder.onDataChanged();

            setTimeout(() => {
                var targetText = $(".targetText");
                var maxLabel = $($(".labelText")[1]);
                expect(targetText.length).toBe(1);

                var xyTarget = { x: targetText.attr("x"), y: targetText.attr("y") };
                var xyMaxlabel = { x: maxLabel.attr("x"), y: maxLabel.attr("y") };

                expect(xyTarget.x).not.toEqual(xyMaxlabel.x);
                expect(xyTarget.y).not.toEqual(xyMaxlabel.y);
                done();

            }, DefaultWaitForRender);
        });

        it("Check Gauge DOM", (done) => {
            gaugeDataBuilder.singleValue = 10;
            gaugeDataBuilder.values = [[10], [0], [300], [200]];

            gaugeDataBuilder.onDataChanged();

            setTimeout(() => {
                // Check Arc Drawn
                var backgroundArc = $(".backgroundArc");
                var foregroundArc = $(".foregroundArc");

                expect(backgroundArc.length).toBe(1);
                expect(backgroundArc.attr("d")).toBeDefined();

                expect(foregroundArc.length).toBe(1);
                expect(foregroundArc.attr("d")).toBeDefined();

                expect($(".mainText").length).toBe(1);
                expect($(".mainText").text()).toEqual("$10");

                var translateString = $(".animatedNumber").attr("transform");
                var xy = SVGUtil.parseTranslateTransform(translateString);
                expect(xy.x).toBeGreaterThan(120);
                expect(xy.y).toBeGreaterThan(220);

                done();
            }, DefaultWaitForRender);
        });

        it("If value less that zero, then scale should be 0-1, but number should show negative value", (done) => {
            gaugeDataBuilder.values = [[-25]];

            gaugeDataBuilder.onDataChanged();

            setTimeout(() => {
                var backgroundArc = $(".backgroundArc");
                var foregroundArc = $(".foregroundArc");

                expect(backgroundArc.length).toBe(1);
                expect(backgroundArc.attr("d")).toBeDefined();

                expect(foregroundArc.length).toBe(1);
                expect(foregroundArc.attr("d")).toBeDefined();

                var labels = $(".labelText");

                expect(labels.length).toBe(2);
                expect($(labels[0]).text()).toEqual("$0");
                expect($(labels[1]).text()).toEqual("$1");
                expect($(".mainText").length).toBe(1);
                expect($(".mainText").text()).toEqual("-$25");
                done();

            }, DefaultWaitForRender);
        });

        it("Check Gauge DOM on Style Changed", (done) => {
            gaugeDataBuilder.singleValue = 10;
            gaugeDataBuilder.values = [[10], [0], [500], [200]];

            gaugeDataBuilder.onDataChanged();

            var dataColors: powerbi.IDataColorPalette = new powerbi.visuals.DataColorPalette();

            gaugeDataBuilder.visual.onStyleChanged({
                titleText: {
                    color: { value: "rgba(51,51,51,1)" }
                },
                subTitleText: {
                    color: { value: "rgba(145,145,145,1)" }
                },
                labelText: {
                    color: {
                        value: "#008000",
                    },
                    fontSize: "11px"
                },
                colorPalette: {
                    dataColors: dataColors,
                },
                isHighContrast: false,
            });

            setTimeout(() => {
                var labels = $(".labelText");
                var color = $(labels[0]).css("fill");
                expect(color === "#008000" || color === "rgb(0, 128, 0)").toBeTruthy();
                done();

            }, DefaultWaitForRender);
        });
    });

    describe("Gauge Data Tests", () => {
        var gaugeDataBuilder: GaugeDataBuilder;

        beforeEach(() => {
            powerbitests.mocks.setLocale();

            gaugeDataBuilder = new GaugeDataBuilder("gauge");

            gaugeDataBuilder.dataViewMetadata.columns[3].objects = {
                general: {formatString: "$0"}
            };
        });

        it("Gauge registered capabilities", () => {
            expect(powerbi.visuals.visualPluginFactory.create().getPlugin("gauge").capabilities).toBe(gaugeVisualCapabilities);
        });

        it("FormatString property should match calculated", () => {
            expect(powerbi.data.DataViewObjectDescriptors.findFormatString(gaugeVisualCapabilities.objects)).toEqual(GaugeVisual.formatStringProp);
        });

        it("Gauge_greaterThanMax", () => {
            gaugeDataBuilder.singleValue = 500;
            gaugeDataBuilder.values = [[500], [0], [300], [200]];

            gaugeDataBuilder.onDataChanged();

            expect(GaugeVisual.converter(gaugeDataBuilder.dataView).percent).toBe(1);
        });

        it("Gauge_smallerThanMin", () => {
            gaugeDataBuilder.singleValue = -3;
            gaugeDataBuilder.values = [[-3], [0], [300], [200]];

            gaugeDataBuilder.onDataChanged();

            expect(GaugeVisual.converter(gaugeDataBuilder.dataView).percent).toBe(0);
        });

        it("Gauge_betweenMinMax", () => {
            gaugeDataBuilder.singleValue = 200;
            gaugeDataBuilder.values = [[200], [100], [300], [200]];

            gaugeDataBuilder.onDataChanged();

            expect(GaugeVisual.converter(gaugeDataBuilder.dataView).percent).toBe(0.5);
        });

        it("Gauge_Nulls", () => {
            gaugeDataBuilder.singleValue = null;
            gaugeDataBuilder.values = [[null], [null], [null], [null]];

            gaugeDataBuilder.onDataChanged();

            var data = GaugeVisual.converter(gaugeDataBuilder.dataView);
            expect(data.percent).toBe(0);
            expect(data.targetSettings).toEqual({
                min: 0,
                max: 0,
                target: 0,
            });
        });

        it("Gauge_tooltip_work", () => {
            gaugeDataBuilder.singleValue = 500;
            gaugeDataBuilder.values = [[10], [0], [500], [200]];

            gaugeDataBuilder.onDataChanged();

            var data = GaugeVisual.converter(gaugeDataBuilder.dataView);
            var expectedValues = {
                percent: 0.02,
                adjustedTotal: 10,
                total: 10,
                metadataColumn: gaugeDataBuilder.dataViewMetadata.columns[0],
                targetSettings: {
                    min: 0,
                    max: 500,
                    target: 200
                },
                tooltipInfo: [{ displayName: "col1", value: "$10" }, { displayName: "col4", value: "$200" }],
            };
            expect(data).toEqual(expectedValues);
        });

        it("Gauge_Nulls_Tooltip_Data", () => {
            gaugeDataBuilder.singleValue = null;
            gaugeDataBuilder.values = [[null], [null], [null], [null]];

            gaugeDataBuilder.onDataChanged();

            var data = GaugeVisual.converter(gaugeDataBuilder.dataView);
            var expectedValues = {
                percent: 0,
                adjustedTotal: 0,
                total: 0,
                metadataColumn: gaugeDataBuilder.dataViewMetadata.columns[0],
                targetSettings: { min: 0, max: 0, target: 0 },
                tooltipInfo: []
            };
            expect(data).toEqual(expectedValues);
        });

        it("Gauge_betweenMinMax_Tooltip_Data", () => {
            gaugeDataBuilder.singleValue = 200;
            gaugeDataBuilder.values = [[200], [100], [300], [200]];

            gaugeDataBuilder.onDataChanged();

            var data = GaugeVisual.converter(gaugeDataBuilder.dataView);
            var expectedValues = {
                percent: 0.5,
                adjustedTotal: 200,
                total: 200,
                metadataColumn: {
                    displayName: "col1",
                    roles: { Y: true },
                    isMeasure: true,
                    objects: { general: { formatString: "$0" } },
                },
                targetSettings: { min: 100, max: 300, target: 200 },
                tooltipInfo: [{ displayName: "col1", value: "$200" }, { displayName: "col4", value: "$200" }]
            };

            expect(data).toEqual(expectedValues);
        });

        describe("Gauge Rendering Tests", () => {
            var gaugeVisualDataBuilder: GaugeVisualDataBuilder;

            beforeEach(() => {
                gaugeDataBuilder = new GaugeDataBuilder("gauge");
                gaugeDataBuilder.singleValue = 10;
                gaugeDataBuilder.values = [[10], [0], [300], [200]];

                gaugeVisualDataBuilder = new GaugeVisualDataBuilder("gauge");

                gaugeVisualDataBuilder.dataViewMetadata.columns[3].objects = {
                    general: { formatString: "$0" }
                };

                gaugeVisualDataBuilder.singleValue = 10;
                gaugeVisualDataBuilder.values = [[10], [0], [300], [200]];
            });

            it("Get_Animated_Number_Properties works", () => {
                var expectedNumberProperty = {
                    transformString: "translate(0.2928932188134524,0.29289321881345254)",
                    viewport: {
                        "height": 0.7071067811865475,
                        "width": 1.4142135623730951
                    }
                };

                var animatedNumberProperty = gaugeVisualDataBuilder.gauge.getAnimatedNumberProperties(1, 1, 1, 1);
                expect(animatedNumberProperty).toEqual(expectedNumberProperty);
            });

            it("Get_Viewport_Properties works", () => {
                var expectedViewPortProperty = {
                    radius: 205,
                    innerRadiusOfArc: 143.5,
                    left: 250,
                    top: 352.5,
                    height: 460,
                    width: 410,
                    margin: {
                        top: 20,
                        bottom: 20,
                        left: 45,
                        right: 45
                    },
                    transformString: "translate(250,352.5)",
                    innerRadiusFactor: 0.7
                };

                var viewPortProperty = gaugeVisualDataBuilder.gauge.getGaugeVisualProperties();
                expect(viewPortProperty).toEqual(expectedViewPortProperty);
            });

            it("NaN in values shows a warning", (done) => {
                gaugeVisualDataBuilder.values = [[10], [0], [NaN, 1], [200]];
                gaugeVisualDataBuilder.onDataChanged();

                setTimeout(() => {
                    expect(gaugeVisualDataBuilder.warningSpy).toHaveBeenCalled();
                    expect(gaugeVisualDataBuilder.warningSpy.calls.count()).toBe(1);
                    expect(gaugeVisualDataBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("NaNNotSupported");
                    done();

                }, DefaultWaitForRender);
            });

            it("Negative Infinity in values shows a warning", (done) => {
                gaugeVisualDataBuilder.values = [[10], [0], [Number.NEGATIVE_INFINITY], [200]];
                gaugeVisualDataBuilder.onDataChanged();

                setTimeout(() => {
                    expect(gaugeVisualDataBuilder.warningSpy).toHaveBeenCalled();
                    expect(gaugeVisualDataBuilder.warningSpy.calls.count()).toBe(1);
                    expect(gaugeVisualDataBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("InfinityValuesNotSupported");
                    done();

                }, DefaultWaitForRender);
            });

            it("Positive Infinity in values shows a warning", (done) => {
                gaugeVisualDataBuilder.values = [[10], [0], [Number.POSITIVE_INFINITY], [200]];
                gaugeVisualDataBuilder.onDataChanged();

                setTimeout(() => {
                    expect(gaugeVisualDataBuilder.warningSpy).toHaveBeenCalled();
                    expect(gaugeVisualDataBuilder.warningSpy.calls.count()).toBe(1);
                    expect(gaugeVisualDataBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("InfinityValuesNotSupported");
                    done();

                }, DefaultWaitForRender);
            });

            it("Value out of range in values shows a warning", (done) => {
                gaugeVisualDataBuilder.values = [[10], [0], [1e301], [200]];
                gaugeVisualDataBuilder.onDataChanged();

                setTimeout(() => {
                    expect(gaugeVisualDataBuilder.warningSpy).toHaveBeenCalled();
                    expect(gaugeVisualDataBuilder.warningSpy.calls.count()).toBe(1);
                    expect(gaugeVisualDataBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("ValuesOutOfRange");
                    done();

                }, DefaultWaitForRender);
            });

            it("All okay in values shows a warning", (done) => {
                gaugeVisualDataBuilder.values = [[10], [0], [20], [200]];
                gaugeVisualDataBuilder.onDataChanged();

                setTimeout(() => {
                    expect(gaugeVisualDataBuilder.warningSpy).not.toHaveBeenCalled();
                    done();
                }, DefaultWaitForRender);
            });

            it("OnDataChange calls expected methods", (done) => {
                gaugeVisualDataBuilder.values = [[10], [0], [300], [200]];
                gaugeVisualDataBuilder.onDataChanged();

                setTimeout(() => {
                    expect(gaugeVisualDataBuilder.gauge.drawViewPort).toHaveBeenCalled();

                    //Changing data should trigger new calls for viewport and animated number properties
                    expect(gaugeVisualDataBuilder.gauge.getGaugeVisualProperties).toHaveBeenCalled();
                    expect(gaugeVisualDataBuilder.gauge.getAnimatedNumberProperties).toHaveBeenCalled();
                    done();

                }, DefaultWaitForRender);
            });

            it("onResizing calls expected methods", (done) => {
                gaugeVisualDataBuilder.values = [[10], [0], [300], [200]];
                gaugeVisualDataBuilder.onDataChanged();
                gaugeVisualDataBuilder.onResizing(200, 300);

                setTimeout(() => {
                    expect(gaugeVisualDataBuilder.gauge.getGaugeVisualProperties).toHaveBeenCalled();
                    expect(gaugeVisualDataBuilder.gauge.getAnimatedNumberProperties).toHaveBeenCalled();
                    expect(gaugeVisualDataBuilder.gauge.drawViewPort).toHaveBeenCalled();

                    done();
                }, DefaultWaitForRender);
            });

            it("onResizing aspect ratio check", (done) => {
                gaugeVisualDataBuilder.values = [[10], [0], [300], [200]];
                gaugeVisualDataBuilder.onDataChanged();
                gaugeVisualDataBuilder.onResizing(100, 400);

                setTimeout(() => {
                    var foregroundArc = $(".foregroundArc");
                    var path: string = foregroundArc.attr("d");
                    // ensure the radius is correct
                    expect(path.indexOf("A 60 60") > -1 || path.indexOf("A60,60") > -1 || path.indexOf("A60 60") > -1).toBeTruthy();

                    done();
                }, DefaultWaitForRender);
            });

            it("check target has decimal values", (done) => {
                gaugeVisualDataBuilder.dataViewMetadata.columns[0].objects = {
                    general: { formatString: "0.00" }
                };

                gaugeVisualDataBuilder.values = [[5.5], [0], [10], [6.5]];
                gaugeVisualDataBuilder.onDataChanged();
                gaugeVisualDataBuilder.onResizing(100, 400);

                setTimeout(() => {
                    var targetText = $(".targetText").text();
                    expect(targetText).toEqual("6.50");

                    done();
                }, DefaultWaitForRender);
            });

            it("Gauge_default_gauge_values", () => {
                var dataView: powerbi.DataView = {
                    metadata: null,
                    single: { value: 500 },
                    categorical: null
                };

                var expectedValues = {
                    percent: 0,
                    adjustedTotal: 0,
                    total: 0,
                    metadataColumn: null,
                    targetSettings: {
                        min: 0,
                        max: 1,
                        target: undefined
                    },
                    tooltipInfo: undefined
                };

                expect(GaugeVisual.converter(dataView)).toEqual(expectedValues);
            });
        });
    });

    describe("Gauge margins tests", () => {
        var gaugeVisualDataBuilder: GaugeVisualDataBuilder;

        beforeEach(() => {
            powerbitests.mocks.setLocale();

            gaugeVisualDataBuilder = new GaugeVisualDataBuilder("gauge");
        });

        it("Gauge margin test with view port sideNumbersVisibleGreaterThanMinHeightString", () => {
            gaugeVisualDataBuilder.height = gaugeVisualDataBuilder.width =
                sideNumbersVisibleGreaterThanMinHeightString;

            var expectedViewPortProperty = {
                margin: {
                    top: 20,
                    bottom: 20,
                    left: 45,
                    right: 45
                },
            };

            var viewPortProperty = gaugeVisualDataBuilder.gauge.getGaugeVisualProperties();
            expect(viewPortProperty.margin).toEqual(expectedViewPortProperty.margin);
        });

        it("Gauge margin test with view port sideNumbersVisibleSmallerThanMinHeightString", () => {
            gaugeVisualDataBuilder.height = gaugeVisualDataBuilder.width =
                sideNumbersVisibleGreaterThanMinHeightString;
            
            var expectedViewPortProperty = {
                margin: {
                    top: 20,
                    bottom: 20,
                    left: 45,
                    right: 45
                },
            };

            var viewPortProperty = gaugeVisualDataBuilder.gauge.getGaugeVisualProperties();
            expect(viewPortProperty.margin).toEqual(expectedViewPortProperty.margin);
        });

        it("Gauge margin test with view port sideNumbersVisibleGreaterThanMinHeightString mobile", () => {
            gaugeVisualDataBuilder.height = gaugeVisualDataBuilder.width =
                sideNumbersVisibleGreaterThanMinHeightString;
            gaugeVisualDataBuilder.isMobile = true;

            var expectedViewPortProperty = {
                margin: {
                    top: 20,
                    bottom: 20,
                    left: 45,
                    right: 45
                },
            };

            var viewPortProperty = gaugeVisualDataBuilder.gauge.getGaugeVisualProperties();
            expect(viewPortProperty.margin).toEqual(expectedViewPortProperty.margin);
        });

        it("Gauge margin test with view port sideNumbersVisibleSmallerThanMinHeightString mobile", () => {
            gaugeVisualDataBuilder.height = gaugeVisualDataBuilder.width =
                sideNumbersVisibleSmallerThanMinHeightString;
            gaugeVisualDataBuilder.isMobile = true;

            var expectedViewPortProperty = {
                margin: {
                    top: marginsOnSmallViewPort,
                    bottom: marginsOnSmallViewPort,
                    left: marginsOnSmallViewPort,
                    right: marginsOnSmallViewPort
                },
            };

            var viewPortProperty = gaugeVisualDataBuilder.gauge.getGaugeVisualProperties();
            expect(viewPortProperty.margin).toEqual(expectedViewPortProperty.margin);
        });

        it("Gauge margin test with height greater than width", () => {
            gaugeVisualDataBuilder.height = "200";
            gaugeVisualDataBuilder.width = "199";

            var expectedViewPortProperty = {
                margin: {
                    top: 20,
                    bottom: 20,
                    left: 15,
                    right: 15
                },
            };

            var viewPortProperty = gaugeVisualDataBuilder.gauge.getGaugeVisualProperties();
            expect(viewPortProperty.margin).toEqual(expectedViewPortProperty.margin);
        });

        it("Gauge margin test with target on left and height greater than width", () => {
            gaugeVisualDataBuilder.height = "200";
            gaugeVisualDataBuilder.width = "199";

            gaugeVisualDataBuilder.singleValue = 10;
            gaugeVisualDataBuilder.values = [[10], [0], [300], [0]];

            gaugeVisualDataBuilder.onDataChanged();

            var expectedViewPortProperty = {
                margin: {
                    top: 20,
                    bottom: 20,
                    left: 45,
                    right: 15
                },
            };

            var viewPortProperty = gaugeVisualDataBuilder.gauge.getGaugeVisualProperties();
            expect(viewPortProperty.margin).toEqual(expectedViewPortProperty.margin);
        });

        it("Gauge margin test with target on right and height greater than width", () => {
            gaugeVisualDataBuilder.height = "200";
            gaugeVisualDataBuilder.width = "199";

            gaugeVisualDataBuilder.singleValue = 10;
            gaugeVisualDataBuilder.values = [[10], [0], [300], [250]];

            gaugeVisualDataBuilder.onDataChanged();

            var expectedViewPortProperty = {
                margin: {
                    top: 20,
                    bottom: 20,
                    left: 15,
                    right: 45
                },
            };

            var viewPortProperty = gaugeVisualDataBuilder.gauge.getGaugeVisualProperties();
            expect(viewPortProperty.margin).toEqual(expectedViewPortProperty.margin);
        });

        it("Gauge margin test with small width and target", () => {
            gaugeVisualDataBuilder.height = "200";
            gaugeVisualDataBuilder.width = "140";

            gaugeVisualDataBuilder.singleValue = 10;
            gaugeVisualDataBuilder.values = [[10], [0], [300], [250]];

            gaugeVisualDataBuilder.onDataChanged();

            var expectedViewPortProperty = {
                margin: {
                    top: 20,
                    bottom: 20,
                    left: 15,
                    right: 15
                },
            };

            var viewPortProperty = gaugeVisualDataBuilder.gauge.getGaugeVisualProperties();
            expect(viewPortProperty.margin).toEqual(expectedViewPortProperty.margin);
        });
    });

    describe("Gauge side number tests", () => {
        var gaugeDataBuilder: GaugeDataBuilder;

        beforeEach(() => {
            powerbitests.mocks.setLocale();

            gaugeDataBuilder = new GaugeDataBuilder("gauge");
        });

        it("Gauge margin test with view port sideNumbersVisibleSmallerThanMinHeightString mobile", (done) => {
            gaugeDataBuilder.height = gaugeDataBuilder.width = sideNumbersVisibleSmallerThanMinHeightString;
            gaugeDataBuilder.values = [[-25]];
            gaugeDataBuilder.isMobile = true;

            gaugeDataBuilder.onDataChanged();

            setTimeout(() => {
                var labels = $(".labelText");

                expect(labels.length).toBe(0);
                expect($(labels[0]).text()).toEqual("");
                expect($(labels[1]).text()).toEqual("");
                done();

            }, DefaultWaitForRender);
        });

        it("Gauge margin test with view port sideNumbersVisibleGreaterThanMinHeightString mobile", (done) => {
            gaugeDataBuilder.height = gaugeDataBuilder.width = sideNumbersVisibleGreaterThanMinHeightString;
            gaugeDataBuilder.values = [[-25]];
            gaugeDataBuilder.isMobile = true;

            gaugeDataBuilder.onDataChanged();

            setTimeout(() => {
                var labels = $(".labelText");

                expect(labels.length).toBe(2);
                expect($(labels[0]).text()).toEqual("$0");
                expect($(labels[1]).text()).toEqual("$1");
                done();

            }, DefaultWaitForRender);
        });

        it("Gauge margin test with view port sideNumbersVisibleSmallerThanMinHeightString", (done) => {
            gaugeDataBuilder.height = gaugeDataBuilder.width = sideNumbersVisibleSmallerThanMinHeightString;
            gaugeDataBuilder.isMobile = false;
            gaugeDataBuilder.values = [[-25]];

            gaugeDataBuilder.onDataChanged();

            setTimeout(() => {
                var labels = $(".labelText");

                expect(labels.length).toBe(2);
                expect($(labels[0]).text()).toEqual("$0");
                expect($(labels[1]).text()).toEqual("$1");
                done();

            }, DefaultWaitForRender);
        });

        it("Gauge margin test with view port sideNumbersVisibleGreaterThanMinHeightString", (done) => {
            gaugeDataBuilder.height = gaugeDataBuilder.width = sideNumbersVisibleGreaterThanMinHeightString;
            gaugeDataBuilder.isMobile = false;
            gaugeDataBuilder.values = [[-25]];

            gaugeDataBuilder.onDataChanged();

            setTimeout(() => {
                var labels = $(".labelText");

                expect(labels.length).toBe(2);
                expect($(labels[0]).text()).toEqual("$0");
                expect($(labels[1]).text()).toEqual("$1");
                done();

            }, DefaultWaitForRender);
        });
    });
}