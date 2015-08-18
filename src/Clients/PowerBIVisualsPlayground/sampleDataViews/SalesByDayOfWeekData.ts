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
    
    export class SalesByDayOfWeekData extends SampleDataViews implements ISampleDataViewsMethods {

        public name: string = "SalesByDayOfWeekData";
        public displayName: string = "Sales by day of week";

        public visuals: string[] = ['comboChart',
            'dataDotClusteredColumnComboChart',
            'dataDotStackedColumnComboChart',
            'lineStackedColumnComboChart',
            'lineClusteredColumnComboChart'
        ];
        
        private sampleData1 = [
            [742731.43, 162066.43, 283085.78, 300263.49, 376074.57, 814724.34],
            [123455.43, 40566.43, 200457.78, 5000.49, 320000.57, 450000.34]
        ];

        private sampleMin1: number = 30000;
        private sampleMax1: number = 1000000;

        private sampleData2 = [
            [31, 17, 24, 30, 37, 40, 12],
            [30, 35, 20, 25, 32, 35, 15]
        ];

        private sampleMin2: number = 10;
        private sampleMax2: number = 45;

        public getDataViews(): DataView[] {
            //first dataView - Sales by day of week
            var fieldExpr = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: "table1", column: "day of week" });

            var categoryValues = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            var categoryIdentities = categoryValues.map(function (value) {
                var expr = powerbi.data.SQExprBuilder.equal(fieldExpr, powerbi.data.SQExprBuilder.text(value));
                return powerbi.data.createDataViewScopeIdentity(expr);
            });
        
            // Metadata, describes the data columns, and provides the visual with hints
            // so it can decide how to best represent the data
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    {
                        displayName: 'Day',
                        queryName: 'Day',
                        type: powerbi.ValueType.fromDescriptor({ text: true })
                    },
                    {
                        displayName: 'Previous week sales',
                        isMeasure: true,
                        format: "$0,000.00",
                        queryName: 'sales1',
                        type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                        objects: { dataPoint: { fill: { solid: { color: 'purple' } } } },
                    },
                    {
                        displayName: 'This week sales',
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
                    values: this.sampleData1[0],
                },
                {
                    source: dataViewMetadata.columns[2],
                    // Sales Amount for 2015
                    values: this.sampleData1[1],
                }
            ];

            var dataValues: DataViewValueColumns = DataViewTransform.createValueColumns(columns);
            var tableDataValues = categoryValues.map(function (dayName, idx) {
                return [dayName, columns[0].values[idx], columns[1].values[idx]];
            });
            //first dataView - Sales by day of week END

            //second dataView - Temperature by day of week
            var fieldExprTemp = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: "table2", column: "day of week" });

            var categoryValuesTemp = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            var categoryIdentitiesTemp = categoryValuesTemp.map(function (value) {
                var exprTemp = powerbi.data.SQExprBuilder.equal(fieldExprTemp, powerbi.data.SQExprBuilder.text(value));
                return powerbi.data.createDataViewScopeIdentity(exprTemp);
            });
        
            // Metadata, describes the data columns, and provides the visual with hints
            // so it can decide how to best represent the data
            var dataViewMetadataTemp: powerbi.DataViewMetadata = {
                columns: [
                    {
                        displayName: 'Day',
                        queryName: 'Day',
                        type: powerbi.ValueType.fromDescriptor({ text: true })
                    },
                    {
                        displayName: 'Previous week temperature',
                        isMeasure: true,
                        queryName: 'temp1',
                        type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                        //objects: { dataPoint: { fill: { solid: { color: 'purple' } } } },
                    },
                    {
                        displayName: 'This week temperature',
                        isMeasure: true,
                        queryName: 'temp2',
                        type: powerbi.ValueType.fromDescriptor({ numeric: true })
                    }
                ]
            };

            var columnsTemp = [
                {
                    source: dataViewMetadataTemp.columns[1],
                    // temperature prev week
                    values: this.sampleData2[0],
                },
                {
                    source: dataViewMetadataTemp.columns[2],
                    // temperature this week
                    values: this.sampleData2[1],
                }
            ];

            var dataValuesTemp: DataViewValueColumns = DataViewTransform.createValueColumns(columnsTemp);
            var tableDataValuesTemp = categoryValuesTemp.map(function (dayName, idx) {
                return [dayName, columnsTemp[0].values[idx], columnsTemp[1].values[idx]];
            });
            //first dataView - Sales by day of week END
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
                }
            },
            {
                metadata: dataViewMetadataTemp,
                categorical: {
                    categories: [{
                        source: dataViewMetadataTemp.columns[0],
                        values: categoryValuesTemp,
                        identity: categoryIdentitiesTemp,
                    }],
                    values: dataValuesTemp
                },
                table: {
                    rows: tableDataValuesTemp,
                    columns: dataViewMetadataTemp.columns,
                }
            }];
        }

        public randomize(): void {

            this.sampleData1 = this.sampleData1.map((item) => {
                return item.map(() => this.getRandomValue(this.sampleMin1, this.sampleMax1));
            });

            this.sampleData2 = this.sampleData2.map((item) => {
                return item.map(() => this.getRandomValue(this.sampleMin2, this.sampleMax2));
            });
        }
        
    }
}