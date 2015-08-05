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

module powerbitests {
    describe("converterHelper tests", () => {
        var dataViewBuilder: DataViewBuilder;
        var dataView: powerbi.DataViewCategorical;

        beforeEach(() => {
            dataViewBuilder = new DataViewBuilder(["a", "b"], [100, 200]);
            dataView = dataViewBuilder.build();
        });

        it("categoryIsAlsoSeriesRole default", () => {
            expect(powerbi.visuals.converterHelper.categoryIsAlsoSeriesRole(dataView, "Series", "Category")).toBeFalsy();

            // Only a "Series" role prevents us from using the Default strategy
            dataViewBuilder.buildWithUpdateRoles({ "Category": true });
            expect(powerbi.visuals.converterHelper.categoryIsAlsoSeriesRole(dataView, "Series", "Category")).toBeFalsy();

            dataView = dataViewBuilder.buildWithUpdateRoles({ "E === mc^2": true });
            expect(powerbi.visuals.converterHelper.categoryIsAlsoSeriesRole(dataView, "Series", "Category")).toBeFalsy();
        });

        it("categoryIsAlsoSeriesRole series and category", () => {
            dataView = dataViewBuilder.buildWithUpdateRoles({ "Series": true, "Category": true });
            expect(powerbi.visuals.converterHelper.categoryIsAlsoSeriesRole(dataView, "Series", "Category")).toBe(true);

            dataView = dataViewBuilder.buildWithUpdateRoles({ "Series": true, "F === ma": true, "Category": true });
            expect(powerbi.visuals.converterHelper.categoryIsAlsoSeriesRole(dataView, "Series", "Category")).toBe(true);
        });

        it("getPivotedCategories default", () => {
            var categoryInfo = powerbi.visuals.converterHelper.getPivotedCategories(dataView, formatStringProp());

            // Note: Since the result includes a function property we can"t perform a toEqual directly on the result, so check each part individually.
            expect(categoryInfo.categories).toEqual(["a", "b"]);
            expect(categoryInfo.categoryIdentities).toEqual([dataView.categories[0].identity[0], dataView.categories[0].identity[1]]);
        });

        it("getPivotedCategories empty categories", () => {
            // Empty the categories array
            dataView.categories = [];

            var categoryInfo = powerbi.visuals.converterHelper.getPivotedCategories(dataView, formatStringProp());
            validateEmptyCategoryInfo(categoryInfo);
        });

        it("getPivotedCategories empty category values", () => {
            // Empty the category values array
            dataView.categories[0].values = [];

            var categoryInfo = powerbi.visuals.converterHelper.getPivotedCategories(dataView, formatStringProp());
            expect(categoryInfo.categories).toEqual([]);
            expect(categoryInfo.categoryIdentities).toBeUndefined();
        });

        function validateEmptyCategoryInfo(categoryInfo: powerbi.visuals.PivotedCategoryInfo): void {
            // Note: Since the result includes a function property we can"t perform a toEqual directly on the result, so check each part individually.
            expect(categoryInfo.categories).toEqual([null]);
            expect(categoryInfo.categoryIdentities).toBeUndefined();
        }

        function formatStringProp(): powerbi.DataViewObjectPropertyIdentifier {
            return { objectName: "general", propertyName: "formatString" };
        }
    });

    class DataViewBuilder {
        private _roles: any;

        public get roles(): any {
            return this._roles;
        }

        public set roles(value) {
            this._roles = value;
            this.createMetadata();
        }

        private categoriesValues: any[];

        private metadata: powerbi.DataViewMetadata;

        private categoryIdentities: powerbi.DataViewScopeIdentity[];

        private values: any[];

        constructor(categoriesValues: any[], values: any[], roles: any = {}) {
            this.categoriesValues = categoriesValues;
            this.values = values;
            this.roles = roles;

            this.createMetadata();
            this.createCategoryIdentities();
        }

        private createCategoryIdentities() {
            var categoryIdentities: any[] = [];

            for (var i = 0; i < this.categoriesValues.length; i++) {
                categoryIdentities.push(mocks.dataViewScopeIdentity(this.categoriesValues[i]));
            }

            this.categoryIdentities = categoryIdentities;
        }

        private createMetadata() {
            this.metadata = {
                columns: [
                    { displayName: "col1", roles: this.roles },
                    { displayName: "col2", isMeasure: true, roles: { "Y": true } }
                ]
            };
        }

        public buildWithUpdateRoles(roles): powerbi.DataViewCategorical {
            this.roles = roles;
            return this.build();
        }

        public build(): powerbi.DataViewCategorical {
            return {
                categories: [{
                    source: this.metadata.columns[0],
                    values: this.categoriesValues,
                    identity: this.categoryIdentities
                }],
                values: powerbi.data.DataViewTransform.createValueColumns([
                    {
                        source: this.metadata.columns[1],
                        values: this.values
                    }])
            };
        }
    }
}