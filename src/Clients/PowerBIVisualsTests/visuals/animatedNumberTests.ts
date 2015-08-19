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
    import AnimatedNumber = powerbi.visuals.AnimatedNumber;
    import animatedNumberCapabilities = powerbi.visuals.animatedNumberCapabilities;

    describe("AnimatedNumber", () => {

        it("AnimatedNumber registered capabilities", () => {
            expect(powerbi.visuals.visualPluginFactory.create().getPlugin("animatedNumber").capabilities).toBe(animatedNumberCapabilities);
        });

        it("FormatString property should match calculated", () => {
            expect(powerbi.data.DataViewObjectDescriptors.findFormatString(animatedNumberCapabilities.objects)).toEqual(AnimatedNumber.formatStringProp);
        });
    });

    describe("AnimatedNumber DOM tests", () => {
        var dataViewBuilder: DataViewBuilder;

        beforeEach(() => {
            dataViewBuilder = new DataViewBuilder();
        });

        it("AnimatedText onDataChanged sets text (no settings)", () => {
            dataViewBuilder.columns = [{displayName: "col1", isMeasure: true}];
            dataViewBuilder.singleValue = 123.456;

            dataViewBuilder.onDataChanged();

            expect($(".animatedNumber")).toBeInDOM();
            expect($(".mainText")).toBeInDOM();
        });
    });

    class DataViewBuilder {
        private visual;
        
        private element: JQuery;

        private width: string;

        private height: string;

        private host: powerbi.IVisualHostServices;

        private style: powerbi.IVisualStyle;

        private _metadata;

        private _dataView;

        public get metadata() {
            if (!this._metadata) {
                this.buildMetadata();
            }

            return this._metadata;
        }

        public singleValue: number;

        public columns: any[] = [];

        constructor(width: string = "200", height: string = "300") {
            this.host = powerbitests.mocks.createVisualHostServices();
            this.style = powerbi.visuals.visualStyles.create();

            this.setSize(width, height);

            this.visual = new AnimatedNumber();

            this.init();
        }

        private init() {
            this.visual.init({
                element: this.element,
                host: this.host,
                style: this.style,
                viewport: {
                    height: this.element.height(),
                    width: this.element.width()
                },
                animation: {
                    transitionImmediate: true
                }
            });
        }

        private buildElement() {
            this.element = powerbitests.helpers.testDom(this.height, this.width);
        }

        private buildMetadata() {
            this._metadata = {
                columns: this.columns
            };
        }

        private buildDataView() {
            this._dataView = {
                metadata: this.metadata,
                single: { value: this.singleValue }
            };
        }

        public get dataView() {
            if (!this._dataView) {
                this.buildDataView();
            }

            return this._dataView;
        }

        public setSize(width: string, height: string) {
            this.width = width;
            this.height = height;

            this.buildElement();
        }

        public onDataChanged() {
            this.visual.onDataChanged({ dataViews: [this.dataView] });
        }
    }
}