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

/// <reference path="../../_references.ts"/>

module powerbitests {
    import ValueType = powerbi.ValueType;
    import PrimitiveType = powerbi.PrimitiveType;
    import DataViewTransform = powerbi.data.DataViewTransform;
    import IVisualWarning = powerbi.IVisualWarning;

    describe("InvalidDataValuesCheckerTests", () => {
        var dataViewBuilder: DataViewBuilder;

        var categoryValues = ["a", "b", "c", "d", "e"];

        var dataViewMetadata: powerbi.DataViewMetadata = {
            columns: [
                {
                    displayName: "stringColumn",
                    type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text)
                },
                {
                    displayName: "numberColumn",
                    isMeasure: true,
                    type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double),
                    format: "0.000"
                },
                {
                    displayName: "dateTimeColumn",
                    isMeasure: true,
                    type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.DateTime)
                }
            ]
        };

        beforeEach(() => {
            dataViewBuilder = new DataViewBuilder();

            dataViewBuilder.metadata = dataViewMetadata;
            dataViewBuilder.categoryValues = categoryValues;
        });

        it("empty values does not display a warning all supported.", () => {
            dataViewBuilder.values = [];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                true,
                true,
                true);

            expect(warnings.length).toBe(0);
        });

        it("empty values does not display a warning none supported.", () => {
            dataViewBuilder.values = [];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(0);
        });

        it("single value does not display a warning all supported.", () => {
            dataViewBuilder.values = [300];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                true,
                true,
                true);

            expect(warnings.length).toBe(0);
        });

        it("single value does not display a warning none supported.", () => {
            dataViewBuilder.values = [300];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(0);
        });

        it("NaN value does not display a warning when supported.", () => {
            dataViewBuilder.values = [NaN];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                true,
                true,
                true);

            expect(warnings.length).toBe(0);
        });

        it("NaN value does not display a warning when others not supported.", () => {
            dataViewBuilder.values = [NaN];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                true,
                false,
                false);

            expect(warnings.length).toBe(0);
        });

        it("NaN value displays a warning when not supported.", () => {
            dataViewBuilder.values = [NaN];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(1);
            expect(warnings[0].code).toBe("NaNNotSupported");
        });

        it("NaN value displays a warning when not supported but others are supported.", () => {
            dataViewBuilder.values = [[NaN]];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                true,
                true);

            expect(warnings.length).toBe(1);
            expect(warnings[0].code).toBe("NaNNotSupported");
        });

        it("Negative infinity value does not display a warning when supported.", () => {
            dataViewBuilder.values = [Number.NEGATIVE_INFINITY];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                true,
                true,
                true);

            expect(warnings.length).toBe(0);
        });

        it("Negative infinity value does not display a warning when others not supported.", () => {
            dataViewBuilder.values = [Number.NEGATIVE_INFINITY];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                true,
                false);

            expect(warnings.length).toBe(0);
        });

        it("Negative infinity value displays a warning when not supported.", () => {
            dataViewBuilder.values = [Number.NEGATIVE_INFINITY];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(1);
            var i: number = 0;
            expect(warnings[i++].code).toBe("InfinityValuesNotSupported");
        });

        it("Negative infinity value displays a warning when not supported but others are supported.", () => {
            dataViewBuilder.values = [Number.NEGATIVE_INFINITY];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                true,
                false,
                true);

            expect(warnings.length).toBe(1);
            expect(warnings[0].code).toBe("InfinityValuesNotSupported");
        });

        it("Positive infinity value does not display a warning when supported.", () => {
            dataViewBuilder.values = [Number.NEGATIVE_INFINITY];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                true,
                true,
                true);

            expect(warnings.length).toBe(0);
        });

        it("Positive infinity value does not display a warning when others not supported.", () => {
            dataViewBuilder.values = [Number.POSITIVE_INFINITY];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                true);

            expect(warnings.length).toBe(0);
        });

        it("Postive infinity value displays a warning when not supported.", () => {
            dataViewBuilder.values = [Number.POSITIVE_INFINITY];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(1);
            expect(warnings[0].code).toBe("InfinityValuesNotSupported");
        });

        it("Positive infinity value displays a warning when not supported but others are supported.", () => {
            dataViewBuilder.values = [Number.POSITIVE_INFINITY];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                true,
                true,
                false);

            expect(warnings.length).toBe(1);
            expect(warnings[0].code).toBe("InfinityValuesNotSupported");
        });

        it("Out of range value displays a warning when others are supported.", () => {
            dataViewBuilder.values = [1e301];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                true,
                true,
                true);

            expect(warnings.length).toBe(1);
            expect(warnings[0].code).toBe("ValuesOutOfRange");
        });

        it("Negative out of range value displays a warning when others are supported.", () => {
            dataViewBuilder.values = [-27e300];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                true,
                true,
                true);

            expect(warnings.length).toBe(1);
            expect(warnings[0].code).toBe("ValuesOutOfRange");
        });

        it("Out of range value displays a warning when others are not supported.", () => {
            dataViewBuilder.values = [1e301];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(1);
            expect(warnings[0].code).toBe("ValuesOutOfRange");
        });

        it("Negative out of range value displays a warning when others are not supported.", () => {
            dataViewBuilder.values = [1e301];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(1);
            expect(warnings[0].code).toBe("ValuesOutOfRange");
        });

        it("NaN and infinity sends warning for both when all not supported", () => {
            dataViewBuilder.values = [NaN, Number.POSITIVE_INFINITY];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(2);
            var i: number = 0;
            expect(warnings[i++].code).toBe("NaNNotSupported");
            expect(warnings[i++].code).toBe("InfinityValuesNotSupported");
        });

        it("NaN and infinity and out of range sends warning for all when all not supported", () => {
            dataViewBuilder.values = [NaN, Number.POSITIVE_INFINITY, 1e301];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(3);
            var i: number = 0;
            expect(warnings[i++].code).toBe("NaNNotSupported");
            expect(warnings[i++].code).toBe("InfinityValuesNotSupported");
            expect(warnings[i++].code).toBe("ValuesOutOfRange");
        });

        it("NaN and infinity and out of range sends warning for all when all not supported has no duplications", () => {
            dataViewBuilder.values = [NaN, Number.POSITIVE_INFINITY, 1e301];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(3);
            var index: number = 0;
            expect(warnings[index++].code).toBe("NaNNotSupported");
            expect(warnings[index++].code).toBe("InfinityValuesNotSupported");
            expect(warnings[index++].code).toBe("ValuesOutOfRange");
        });

        it("NaN and infinity and out of range sends warning for all when Infinity supported has no infinity warning", () => {
            dataViewBuilder.values = [NaN, Number.POSITIVE_INFINITY, NaN, 1e301];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                true,
                true);

            expect(warnings.length).toBe(2);
            var index: number = 0;
            expect(warnings[index++].code).toBe("NaNNotSupported");
            expect(warnings[index++].code).toBe("ValuesOutOfRange");
        });

        it("NaN and infinity and out of range sends warning for all with good values at the beginning", () => {
            dataViewBuilder.values = [100, 200, 300, 400, NaN, Number.POSITIVE_INFINITY, NaN, 1e301];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(3);
            var index: number = 0;
            expect(warnings[index++].code).toBe("NaNNotSupported");
            expect(warnings[index++].code).toBe("InfinityValuesNotSupported");
            expect(warnings[index++].code).toBe("ValuesOutOfRange");
        });

        it("NaN and infinity and out of range sends warning for all with good values throughout", () => {
            dataViewBuilder.values = [100, 200, NaN, 300, Number.POSITIVE_INFINITY, NaN, 400, 1e301, 500];
            var dataView = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView],
                false,
                false,
                false);

            expect(warnings.length).toBe(3);
            var index: number = 0;
            expect(warnings[index++].code).toBe("NaNNotSupported");
            expect(warnings[index++].code).toBe("InfinityValuesNotSupported");
            expect(warnings[index++].code).toBe("ValuesOutOfRange");
        });

        it("Multiple dataViews both good does not show a warning", () => {
            dataViewBuilder.values = [100, 200, 500];
            var dataView = dataViewBuilder.build();

            dataViewBuilder.values = [200, 300, 400];
            var dataView2 = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView, dataView2],
                false,
                false,
                false);

            expect(warnings.length).toBe(0);
        });

        it("Multiple dataviews first has invalid shows warnings", () => {
            dataViewBuilder.values = [100, 200, NaN, undefined];
            var dataView = dataViewBuilder.build();

            dataViewBuilder.values = [100, 200, 300];
            var dataView2 = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView, dataView2],
                false,
                false,
                false);

            expect(warnings.length).toBe(1);
            var index: number = 0;
            expect(warnings[index++].code).toBe("NaNNotSupported");
        });

        it("Multiple datasets last has invalid values shows warnings", () => {
            dataViewBuilder.values = [100, 200, 300, 400];
            var dataView = dataViewBuilder.build();

            dataViewBuilder.values = [100, 200, NaN, 300, Number.POSITIVE_INFINITY, NaN, 400, 1e301, 500];
            var dataView2 = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView, dataView2],
                false,
                false,
                false);

            expect(warnings.length).toBe(3);
            var index: number = 0;
            expect(warnings[index++].code).toBe("NaNNotSupported");
            expect(warnings[index++].code).toBe("InfinityValuesNotSupported");
            expect(warnings[index++].code).toBe("ValuesOutOfRange");
        });

        it("Multiple dataViews both have invalid values shows correct warning", () => {
            dataViewBuilder.values = [100, 200, Number.NaN, 300, Number.POSITIVE_INFINITY, NaN, 400, 1e301, 500];
            var dataView = dataViewBuilder.build();

            dataViewBuilder.values = [Number.NEGATIVE_INFINITY, Number.NaN, 300, 1e301];
            var dataView2 = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView, dataView2],
                false,
                false,
                false);

            expect(warnings.length).toBe(3);
            var index: number = 0;
            expect(warnings[index++].code).toBe("NaNNotSupported");
            expect(warnings[index++].code).toBe("InfinityValuesNotSupported");
            expect(warnings[index++].code).toBe("ValuesOutOfRange");
        });

        it("Multiple dataViews both have invalid values not overlapping shows correct warning", () => {
            dataViewBuilder.values = [100, 200, 300, Number.POSITIVE_INFINITY, 400, 1e301, 500];
            var dataView = dataViewBuilder.build();

            dataViewBuilder.values = [Number.NEGATIVE_INFINITY, Number.NaN, 300];
            var dataView2 = dataViewBuilder.build();

            var warnings: IVisualWarning[] = powerbi.visuals.getInvalidValueWarnings(
                [dataView, dataView2],
                false,
                false,
                false);

            expect(warnings.length).toBe(3);
            var index: number = 0;
            expect(warnings[index++].code).toBe("NaNNotSupported");
            expect(warnings[index++].code).toBe("InfinityValuesNotSupported");
            expect(warnings[index++].code).toBe("ValuesOutOfRange");
        });
    });

    class DataViewBuilder {
        public metadata: powerbi.DataViewMetadata;

        public categoryValues: any[];

        public values: any[];

        private categoryIdentities: powerbi.DataViewScopeIdentity[];

        private buildCategoryIdentities() {
            if (this.categoryValues) {
                this.categoryIdentities =
                this.categoryValues.map((item) => mocks.dataViewScopeIdentity(item));
            }
        }

        public build(): powerbi.DataView {
            this.buildCategoryIdentities();

            return {
                metadata: this.metadata,
                categorical: {
                    categories: [{
                        source: this.metadata.columns[0],
                        values: this.categoryValues,
                        identity: this.categoryIdentities
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: this.metadata.columns[1],
                        values: this.values
                    }])
                }
            };
        }
    }
} 