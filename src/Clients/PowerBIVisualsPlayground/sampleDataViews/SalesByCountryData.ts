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

module powerbi.visuals.sampleDataViews {
    import DataViewTransform = powerbi.data.DataViewTransform;

    export class SalesByCountryData extends SampleDataViews implements ISampleDataViewsMethods {

        public name: string = "SalesByCountryData";
        public displayName: string = "Sales By Country";

        public visuals: string[] = ['default'];

        private sampleData = [
            [742731.43, 162066.43, 283085.78, 300263.49, 376074.57, 814724.34],
            [123455.43, 40566.43, 200457.78, 5000.49, 320000.57, 450000.34]
        ];
        
        private sampleMin: number = 30000;
        private sampleMax: number = 1000000;

        private sampleSingleData: number = 55943.67;

        public getDataViews(): DataView[] {

            var fieldExpr = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: "table1", column: "country" });

            var categoryValues = ["Australia", "Canada", "France", "Germany", "United Kingdom", "United States"];
            var categoryIdentities = categoryValues.map(function (value) {
                var expr = powerbi.data.SQExprBuilder.equal(fieldExpr, powerbi.data.SQExprBuilder.text(value));
                return powerbi.data.createDataViewScopeIdentity(expr);
            });
        
            // Metadata, describes the data columns, and provides the visual with hints
            // so it can decide how to best represent the data
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    {
                        displayName: 'Country',
                        queryName: 'Country',
                        type: powerbi.ValueType.fromDescriptor({ text: true })
                    },
                    {
                        displayName: 'Sales Amount (2014)',
                        isMeasure: true,
                        format: "$0,000.00",
                        queryName: 'sales1',
                        type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                        objects: { dataPoint: { fill: { solid: { color: 'purple' } } } },
                    },
                    {
                        displayName: 'Sales Amount (2015)',
                        isMeasure: true,
                        format: "$0,000.00",
                        queryName: 'sales2',
                        type: powerbi.ValueType.fromDescriptor({ numeric: true })
                    }
                ]
            };

            var columns = [
                {
                    source: dataViewMetadata.columns[1],
                    // Sales Amount for 2014
                    values: this.sampleData[0],
                },
                {
                    source: dataViewMetadata.columns[2],
                    // Sales Amount for 2015
                    values: this.sampleData[1],
                }
            ];

            var dataValues: DataViewValueColumns = DataViewTransform.createValueColumns(columns);
            var tableDataValues = categoryValues.map(function (countryName, idx) {
                return [countryName, columns[0].values[idx], columns[1].values[idx]];
            });

            return [{
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: categoryValues,
                        identity: categoryIdentities,
                    }],
                    values: dataValues
                },
                table: {
                    rows: tableDataValues,
                    columns: dataViewMetadata.columns,
                },
                single: { value: this.sampleSingleData }
            }];
        }

        
        public randomize(): void {

            this.sampleData = this.sampleData.map((item) => {
                return item.map(() => this.getRandomValue(this.sampleMin, this.sampleMax));
            });

            this.sampleSingleData = this.getRandomValue(this.sampleMin, this.sampleMax);
        }
        
    }
}