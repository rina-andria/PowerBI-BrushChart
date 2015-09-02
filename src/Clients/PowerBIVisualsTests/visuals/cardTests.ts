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
    import Card = powerbi.visuals.Card;
    import cardCapabilities = powerbi.visuals.cardCapabilities;
    import DataViewTransform = powerbi.data.DataViewTransform;
    import ValueType = powerbi.ValueType;
    import SVGUtil = powerbi.visuals.SVGUtil;

    describe("Card", () => {
        it("Card_registered_capabilities", () => {
            expect(powerbi.visuals.visualPluginFactory.create().getPlugin("card").capabilities).toBe(cardCapabilities);
        });

        it("Capabilities should include dataViewMappings", () => {
            expect(cardCapabilities.dataViewMappings).toBeDefined();
            expect(cardCapabilities.dataViewMappings.length).toBe(1);
        });

        it("Capabilities should have condition", () => {
            expect(cardCapabilities.dataViewMappings[0].conditions[0][cardCapabilities.dataRoles[0].name].max).toBe(1);
        });

        it("Capabilities should include dataRoles", () => {
            expect(cardCapabilities.dataRoles).toBeDefined();
            expect(cardCapabilities.dataRoles.length).toBe(1);
        });

        it("Capabilities should suppressDefaultTitle", () => {
            expect(cardCapabilities.suppressDefaultTitle).toBe(true);
        });

        it("FormatString property should match calculated", () => {
            expect(powerbi.data.DataViewObjectDescriptors.findFormatString(cardCapabilities.objects)).toEqual(Card.formatStringProp);
        });

        it("cardChart preferred capabilities requires at most 1 row", () => {
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    { displayName: "col1" },
                    { displayName: "col2", isMeasure: true }]
            };

            var dataViewWithTwoRows: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ["John Domo", "Delta Force"],
                        identity: [mocks.dataViewScopeIdentity("a"), mocks.dataViewScopeIdentity("b")]
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200],
                        subtotal: 300
                    }])
                }
            };

            var plugin = powerbi.visuals.visualPluginFactory.create().getPlugin("card");
            expect(powerbi.DataViewAnalysis.supports(dataViewWithTwoRows, plugin.capabilities.dataViewMappings[0], true)).toBe(false);
        });

        it("cardChart preferred capabilities requires 1 row", () => {
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    { displayName: "numeric", type: ValueType.fromDescriptor({ numeric: true }) }
                ],
            };

            var data: powerbi.DataView = {
                metadata: dataViewMetadata,
                single: { value: 123.456 }
            };

            var plugin = powerbi.visuals.visualPluginFactory.create().getPlugin("card");
            expect(powerbi.DataViewAnalysis.supports(data, plugin.capabilities.dataViewMappings[0], true)).toBe(true);
        });
    });
    
    describe("enumerateObjectInstances", () => {
        let cardBuilder: CardBuilder;

        var dataViewMetadata: powerbi.DataViewMetadata = {
            columns: [{ displayName: "col1", isMeasure: true, objects: { "general": { formatString: "#0" } } }],
            groups: [],
            measures: [0],
            objects: {
                labels: {
                    color: { solid: { color: "#222222"}},
                    labelPrecision: 3,
                    labelDisplayUnits: 1000
                }
            }
        };

        beforeEach(() => {
            cardBuilder = new CardBuilder(undefined, undefined, "500", "500");
        });

        it("verify default values", () => {
            cardBuilder.onDataChanged();
            
            verifyLabels(cardBuilder.card);
            verifyTitle(cardBuilder.card);
        });

        it("changed data", () => {
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = 20;
            cardBuilder.onDataChanged();

            verifyLabels(cardBuilder.card, "#222222", 3, 1000);
        });

        it("changed title", () => {
            var metadata: powerbi.DataViewMetadata = {
                columns: [{ displayName: "col1", isMeasure: true, objects: { "general": { formatString: "#0" } } }],
                groups: [],
                measures: [0],
                objects: {
                    cardTitle: {
                        show: false
                    }
                }
            };
            
            cardBuilder.metadata = metadata;
            cardBuilder.singleValue = 0;
            cardBuilder.onDataChanged();

            var objects = cardBuilder.card.enumerateObjectInstances({ objectName: "cardTitle" });
            expect(objects.length).toBe(1);
            expect(objects[0].properties["show"]).toBeDefined();
            expect(objects[0].properties["show"]).toBe(false); 

        });

        function verifyTitle(card: Card) {
            var objects = card.enumerateObjectInstances({ objectName: "cardTitle" });
            expect(objects.length).toBe(1);
            expect(objects[0].properties["show"]).toBeDefined(); 
            expect(objects[0].properties["show"]).toBe(true); 
        }
        
        function verifyLabels(card: Card, color?: string, precision?: number, displayUnits?: number) {
            var objects = card.enumerateObjectInstances({ objectName: "labels" });
            var defaultLabelSettings = powerbi.visuals.dataLabelUtils.getDefaultLabelSettings();

            expect(objects.length).toBe(1);
            expect(objects[0].properties).toBeDefined();

            // Default values
            color = color ? color : Card.DefaultStyle.value.color;
            precision = precision ? precision : 0;
            displayUnits = displayUnits ? displayUnits : defaultLabelSettings.displayUnits;

            var properties = objects[0].properties;
            expect(properties["color"]).toBe(color);
            expect(properties["labelPrecision"]).toBe(precision);
            expect(properties["labelDisplayUnits"]).toBe(displayUnits);
        }
    });

    describe("Card DOM tests", () => {
        let cardBuilder: CardBuilder;
        
        var dataViewMetadata: powerbi.DataViewMetadata = {
            columns: [{ displayName: "col1", isMeasure: true, objects: { "general": { formatString: "#0" } } }],
            groups: [],
            measures: [0],
        };
        
        var dataViewmetadataWithLabelProperties: powerbi.DataViewMetadata = {
            columns: [{ displayName: "col1", isMeasure: true, objects: { "general": { formatString: "#0" } } }],
            groups: [],
            measures: [0],
            objects: {
                labels: {
                    color: { solid: { color: "#222222" } },
                    labelPrecision: 3,
                    labelDisplayUnits: 1000
                },
                cardTitle: {
                    show: true
                }
            }
        };
        var cardStyles = Card.DefaultStyle.card;

        beforeEach(() => {
            cardBuilder = new CardBuilder();
        });
        
        it("Card_getAdjustedFontHeight with seed font size fitting in available width but equal/larger than MaxFontSize", () => {
            cardBuilder.setCurrentViewport(500, 500);
            
            expect(cardBuilder.card.getAdjustedFontHeight(cardBuilder.card.currentViewport.width, "t", cardStyles.maxFontSize)).toBe(cardStyles.maxFontSize);
            expect(cardBuilder.card.getAdjustedFontHeight(cardBuilder.card.currentViewport.width, "t", cardStyles.maxFontSize + 5)).toBe(cardStyles.maxFontSize);
        });

        it("Card_getAdjustedFontHeight with seed font size not fitting in available width and smaller than MaxFontSize", () => {
            cardBuilder.setCurrentViewport(30, 30);
            
            expect(cardBuilder.card.getAdjustedFontHeight(cardBuilder.card.currentViewport.width, "t", cardStyles.maxFontSize)).toBeLessThan(cardStyles.maxFontSize);
        });

        it("Card_onDataChanged (single value)", () => {
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = "7191394482447.7";
            
            cardBuilder.onDataChanged();

            cardBuilder.onResizing();
            
            expect($(".card")).toBeInDOM();
            expect($(".mainText")).toBeInDOM();
            var titleText = $(".card").find("title").text();
            expect(titleText).toBe("7191394482447.7");
        });

        it("Card_onDataChanged (0)", () => {
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = 0;
            
            cardBuilder.onDataChanged();

            expect($(".card")).toBeInDOM();
            expect($(".mainText")).toBeInDOM();
            var titleText = $(".card").find("title").text();
            expect(titleText).toBe("0");
        });

        it("Card with null dataview", (done) => {
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = 0;
            
            cardBuilder.onDataChanged();

            setTimeout(() => {
                expect($(".mainText").first().text()).toBe("0");
                
                cardBuilder.singleValue = null;
                cardBuilder.onDataChanged();
                
                setTimeout(() => {
                    expect($(".mainText").first().text()).toBe("(Blank)");
                    done();
                }, DefaultWaitForRender);

            }, DefaultWaitForRender);
        });

        it("Card updated with undefined dataview", (done) => {
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = 0;
            
            cardBuilder.onDataChanged();

            setTimeout(() => {
                expect($(".mainText").first().text()).toBe("0");
                
                cardBuilder.singleValue = undefined;
                cardBuilder.onDataChanged();
                
                setTimeout(() => {
                    expect($(".mainText").first().text()).toBe("");
                    done();
                }, DefaultWaitForRender);

            }, DefaultWaitForRender);
        });

        it("Card_onDataChanged formats number < 10000", (done) => {
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = 85.23498239847123;
            
            cardBuilder.onDataChanged();
            
            expect($(".card")).toBeInDOM();
            expect($(".mainText")).toBeInDOM();
            SVGUtil.flushAllD3Transitions();
            setTimeout(() => {
                expect($(".mainText").text()).toEqual("85");
                done();
            }, DefaultWaitForRender);
        });

        it("Card_onDataChanged verbose display units (explore mode)", (done) => {
            cardBuilder = new CardBuilder(powerbi.DisplayUnitSystemType.Verbose);
            
            var spy = spyOn(powerbi.visuals.valueFormatter, "create");
            spy.and.callThrough();

            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = 900000;
            
            cardBuilder.onDataChanged();

            expect($(".card")).toBeInDOM();
            expect($(".mainText")).toBeInDOM();
            setTimeout(() => {
                expect(spy.calls.count()).toBe(1);

                var args = spy.calls.argsFor(0);
                expect(args).toBeDefined();

                expect(args[0].displayUnitSystemType).toBe(powerbi.DisplayUnitSystemType.Verbose);
                done();
            }, DefaultWaitForRender);
        });

        it("Card_onDataChanged whole display units (dashboard tile mode, default)", (done) => {
            var spy = spyOn(powerbi.visuals.valueFormatter, "create");
            spy.and.callThrough();
            
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = 900000;
            
            cardBuilder.onDataChanged();

            expect($(".card")).toBeInDOM();
            expect($(".mainText")).toBeInDOM();
            setTimeout(() => {
                expect(spy.calls.count()).toBe(1);

                var args = spy.calls.argsFor(0);
                expect(args).toBeDefined();

                expect(args[0].displayUnitSystemType).toBe(powerbi.DisplayUnitSystemType.WholeUnits);
                done();
            }, DefaultWaitForRender);
        });

        it("Card with DateTime value on dashboard", (done) => {
            var dateValue = new Date(2015, 5, 20);
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    { displayName: "date", type: powerbi.ValueType.fromDescriptor({ dateTime: true }), isMeasure: true }
                ],
            };
            
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = dateValue;
            
            cardBuilder.onDataChanged();
            
            setTimeout(() => {
                expect($(".mainText").first().text()).toBe("6/20/2015");
                var transform = SVGUtil.parseTranslateTransform($(".mainText").first().attr("transform"));
                expect(transform.x).toBe("150");
                expect(transform.y).toBe("130");
                done();
            }, DefaultWaitForRender);
        });

        it("Card text alignment", (done) => {
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = 900000;
            
            cardBuilder.onDataChanged();
            
            cardBuilder.onResizing(170, 250);

            setTimeout(() => {
                var transform = SVGUtil.parseTranslateTransform($(".mainText").first().attr("transform"));
                expect(transform.x).toBe("125");
                expect($(".mainText").first().attr("text-anchor")).toBe("middle");
                done();
            }, DefaultWaitForRender);
        });

        it("card label on", (done) => {
            cardBuilder = new CardBuilder(null, true);
            
            var metadata: powerbi.DataViewMetadata = {
                columns: [{ displayName: "col1", isMeasure: true, objects: { "general": { formatString: "#0" } } }],
                groups: [],
                measures: [0],
                objects: {
                    cardTitle: {
                        show: true
                    }
                }
            };

            cardBuilder.metadata = metadata;
            cardBuilder.singleValue = "7191394482447.7";
            
            cardBuilder.onDataChanged();
            
            setTimeout(() => {
                expect($(".label")[0]).toBeDefined();
                expect($(".label")[0].textContent).toBe("col1");
                done();
            }, DefaultWaitForRender);
        });

        it("card label off", (done) => {
            cardBuilder = new CardBuilder(null, true);
            
            var metadata: powerbi.DataViewMetadata = {
                columns: [{ displayName: "col1", isMeasure: true, objects: { "general": { formatString: "#0" } } }],
                groups: [],
                measures: [0],
                objects: {
                    cardTitle: {
                        show: false
                    }
                }
            };

            cardBuilder.metadata = metadata;
            cardBuilder.singleValue = "7191394482447.7";
            
            cardBuilder.onDataChanged();
            
            setTimeout(() => {
                expect($(".label")[0]).toBeUndefined();
                done();
            }, DefaultWaitForRender);
        });

        it("change color", (done) => {
            cardBuilder = new CardBuilder(null, true);
            
            cardBuilder.metadata = dataViewmetadataWithLabelProperties;
            cardBuilder.singleValue = "7191394482447.7";
            
            cardBuilder.onDataChanged();
            
            setTimeout(() => {
                expect($(".card .value").css("fill")).toBe("#222222");
                done();
            }, DefaultWaitForRender);
        });

        it("change precision", (done) => {
            cardBuilder = new CardBuilder(null, true);

            var metadata: powerbi.DataViewMetadata = {
                columns: [{ displayName: "col1", isMeasure: true, objects: { "general": { formatString: "#0" } } }],
                groups: [],
                measures: [0],
                objects: {
                    labels: {
                        labelPrecision: 3,
                        labelDisplayUnits: 1000
                    },
                    cardTitle: {
                        show: true
                    }
                }
            };
            
            cardBuilder.metadata = metadata;
            cardBuilder.singleValue = "7";
            
            cardBuilder.onDataChanged();

            setTimeout(() => {
                expect($(".card .value")[0].textContent).toBe("0.007K");
                done();
            }, DefaultWaitForRender);
        });

        it("change display unit", (done) => {
            cardBuilder = new CardBuilder(null, true);

            var metadataWithDisplayUnits: powerbi.DataViewMetadata = {
                columns: [{ displayName: "col1", isMeasure: true, objects: { "general": { formatString: "#0" } } }],
                groups: [],
                measures: [0],
                objects: {
                    labels: {
                        labelDisplayUnits: 1000
                    },
                    cardTitle: {
                        show: true
                    }
                }
            };
            
            cardBuilder.metadata = metadataWithDisplayUnits;
            cardBuilder.singleValue = "9999";
            
            cardBuilder.onDataChanged();

            setTimeout(() => {
                expect($(".card .value")[0].textContent).toBe("10K");
                //display unit auto
                cardBuilder.metadata = dataViewMetadata;
                
                cardBuilder.onDataChanged();
                
                expect($(".card .value")[0].textContent).toBe("9999");
                done();
            }, DefaultWaitForRender);
        });
    });

    describe("Card tests on Minerva", () => {
        let cardBuilder: CardBuilder;
        
        var dataViewMetadata: powerbi.DataViewMetadata = {
            columns: [{ displayName: "col1", isMeasure: true, objects: { "general": { formatString: "#0" } } }],
            groups: [],
            measures: [0],
        };

        var labelStyles = Card.DefaultStyle.label;
        var valueStyles = Card.DefaultStyle.value;

        beforeEach(() => {
            cardBuilder = new CardBuilder(undefined, undefined, "200", "200", true);
            
            cardBuilder.metadata = dataViewMetadata;
        });
        
        it("Card on Canvas DOM validation", (done) => {
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = 90;
            
            cardBuilder.onDataChanged();
            
            setTimeout(() => {
                expect($(".card")).toBeInDOM();
                expect($(".label")).toBeInDOM();
                expect($(".value")).toBeInDOM();
                expect($(".label").length).toBe(1);
                expect($(".value").length).toBe(1);
                expect($(".label").first().text()).toBe("col1");
                expect($(".value").first().text()).toBe("90");
                done();
            }, DefaultWaitForRender);
        });

        it("Card on Canvas Style validation", (done) => {
            cardBuilder.singleValue = 900000;
            
            cardBuilder.onDataChanged();

            setTimeout(() => {
                expect($(".label")).toBeInDOM();
                expect($(".value")).toBeInDOM();
                expect(parseInt($(".label")[0].style.fontSize, 10)).toBe(labelStyles.fontSize);
                expect(parseInt($(".value")[0].style.fontSize, 10)).toBe(valueStyles.fontSize);
                expect($(".label")[0].style.fill).toBe(labelStyles.color);
                expect($(".value")[0].style.fill).toBe(valueStyles.color);
                expect($(".value")[0].style.fontFamily).toBe(valueStyles.fontFamily);
                done();
            }, DefaultWaitForRender);
        });

        it("Card with DateTime value on canvas", (done) => {
            var dateValue = new Date(2015, 5, 20);
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    { displayName: "date", type: powerbi.ValueType.fromDescriptor({ dateTime: true }), isMeasure: true }
                ],
            };
            
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = dateValue;
            
            cardBuilder.onDataChanged();

            setTimeout(() => {
                expect($(".label").first().text()).toBe("date");
                expect($(".value").first().text()).toBe("6/20/2015");
                done();
            }, DefaultWaitForRender);
        });

        it("Card with zero currency value", (done) => {
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    { displayName: "price", type: powerbi.ValueType.fromDescriptor({ numeric: true }), isMeasure: true, objects: { "general": { formatString: "$0" } } }
                ],
            };
            
            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = 0;
            
            cardBuilder.onDataChanged();

            setTimeout(() => {
                expect($(".label").first().text()).toBe("price");
                expect($(".value").first().text()).toBe("$0");
                done();
            }, DefaultWaitForRender);
        });

        it("Card with null dataview", (done) => {
            cardBuilder.singleValue = 900;
            
            cardBuilder.onDataChanged();

            setTimeout(() => {
                expect($(".value").first().text()).toBe("900");
                expect($(".label").first().text()).toBe("col1");
                
                cardBuilder.singleValue = null;
                cardBuilder.onDataChanged();
                
                setTimeout(() => {
                    expect($(".value").first().text()).toBe("(Blank)");
                    expect($(".label").first().text()).toBe("col1");
                    done();
                }, DefaultWaitForRender);

            }, DefaultWaitForRender);
        });

        it("Card updated with undefined dataview", (done) => {
            cardBuilder.singleValue = 0;
            
            cardBuilder.onDataChanged();

            setTimeout(() => {
                expect($(".value").first().text()).toBe("0");
                expect($(".label").first().text()).toBe("col1");
                
                cardBuilder.singleValue = undefined;
                cardBuilder.onDataChanged();
                
                setTimeout(() => {
                    expect($(".value").first().text()).toBe("");
                    expect($(".label").first().text()).toBe("");
                    done();
                }, DefaultWaitForRender);

            }, DefaultWaitForRender);
        });

        it("card with longer label and value", (done) => {
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [{ displayName: "this is the value that never ends, it just goes on and on my friends. Some axis started rendering it not knowing what it was, and now it keeps on rendering forever just because this the label that never ends", isMeasure: true, format: "#0" }],
                groups: [],
                measures: [0],
            };

            cardBuilder.metadata = dataViewMetadata;
            cardBuilder.singleValue = "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999";
            
            cardBuilder.onDataChanged();

            setTimeout(() => {
                // Note: the exact text will be different depending on the environment in which the test is run, so we can"t do an exact match.
                // Just check that the text is truncated with ellipses.
                var labelText = $(".label").first().text();
                var valueText = $(".value").first().text();
                expect(labelText.length).toBeLessThan(60);
                expect(valueText.length).toBeLessThan(30);
                expect(valueText.substr(valueText.length - 3)).toBe("...");
                expect(labelText.substr(labelText.length - 3)).toBe("...");

                done();
            }, DefaultWaitForRender);
        });

    });
    
    class CardBuilder {
        private element: JQuery;
        
        private isScrollable: boolean = false;
        
        private displayUnitSystemType: powerbi.DisplayUnitSystemType;
        
        private host: powerbi.IVisualHostServices;
        
        private style: powerbi.IVisualStyle;
        
        private isMinervaVisualPlugin: boolean = false;
        
        private cardVisual: Card;
        
        public get card(): Card {
            return this.cardVisual;
        }
        
        public metadata: powerbi.DataViewMetadata;
        
        public singleValue: any;
        
        constructor(
            displayUnitSystemType?: powerbi.DisplayUnitSystemType,
            isScrollable?: boolean,
            height: string = "200", 
            width: string = "300",
            isMinervaVisualPlugin: boolean = false) {
            
            this.isScrollable = isScrollable;
            this.displayUnitSystemType = displayUnitSystemType;
            this.isMinervaVisualPlugin = isMinervaVisualPlugin;
            
            this.element = powerbitests.helpers.testDom(height, width);
            this.host = mocks.createVisualHostServices();
            this.style = powerbi.visuals.visualStyles.create();
            
            this.buildCard();
            
            this.cardInit();
        }
        
        private buildCard(): void {
            if (this.isMinervaVisualPlugin) {
                this.buildMinervaCard();
            } else {
                this.buildPlainCard();
            }
        }
        
        private buildMinervaCard(): void {
            this.cardVisual = 
                <Card> powerbi.visuals.visualPluginFactory.createMinerva({}).getPlugin("card").create();
        }
        
        private buildPlainCard(): void {
            this.cardVisual = <Card> new Card({
                displayUnitSystemType: this.displayUnitSystemType,
                isScrollable: this.isScrollable
            });
        }
        
        private cardInit(): void {
            this.card.init({
                element: this.element,
                host: this.host,
                style: this.style,
                viewport: {
                    height: this.element.height(),
                    width: this.element.width()
                },
                animation: { transitionImmediate: true },
                isScrollable: this.isScrollable,
                settings: {
                    DisplayUnitSystemType: this.displayUnitSystemType
                }
            });
        }
        
        public setCurrentViewport(height: number, width: number): void {
             this.card.currentViewport = {
                height: height,
                width: width
            };
        }
        
        public onDataChanged(): void {
            this.card.onDataChanged({
                dataViews: [{
                    metadata: this.metadata,
                    single: {
                        value: this.singleValue
                    }
                }]
            });
        }
        
        public onResizing(
            height: number = this.element.height(),
            width: number = this.element.width()): void {
            this.card.onResizing({
                height: height,
                width: width
            });
        }
    }
}