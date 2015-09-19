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

    export class ProductSalesByDate extends SampleDataViews implements ISampleDataViewsMethods {
        private static seriesCount = 4;
        private static valueCount = 50;
         
        public name: string = "ProductSalesByDate";
        public displayName: string = "Product sales by date";

        public visuals: string[] = ['streamGraph'];

        private sampleData;
        private dates: any[];
        
        public constructor(){
            super();
            this.sampleData = this.generateData(ProductSalesByDate.seriesCount,ProductSalesByDate.valueCount);
            this.dates = this.generateDates(ProductSalesByDate.valueCount);
        }
        
        public getDataViews(): DataView[] {

            var fieldExpr = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: "table1", column: "date" });

            var categoryValues = this.dates;
            var categoryIdentities = categoryValues.map(function(value) {
                var expr = powerbi.data.SQExprBuilder.equal(fieldExpr, powerbi.data.SQExprBuilder.dateTime(value));
                return powerbi.data.createDataViewScopeIdentity(expr);
            });
        
            // Metadata, describes the data columns, and provides the visual with hints
            // so it can decide how to best represent the data
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: this.generateColumnMetadata(ProductSalesByDate.seriesCount)
            };

            var columns = this.generateColumns(dataViewMetadata, ProductSalesByDate.seriesCount);

            var dataValues: DataViewValueColumns = DataViewTransform.createValueColumns(columns);
            var tableDataValues = categoryValues.map(function(countryName, idx) {
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
                single: { value: [].concat.apply([], this.sampleData) }
            }];
        }

        public randomize(): void {
            this.sampleData = this.generateData(ProductSalesByDate.seriesCount,ProductSalesByDate.valueCount);
        }

        private generateColumnMetadata(n: number){
            let columns = [{
                        displayName: 'Date',
                        queryName: 'Date',
                        type: powerbi.ValueType.fromDescriptor({ dateTime: true })
                    }];
                    
            for(let i=0;i<n;i++){
                columns.push({
                        displayName: 'Product '+(i+1),
                        isMeasure: true,
                        format: "$0,000.00",
                        queryName: 'sales'+i,
                        groupName: 'Product ' +(i+1),
                        type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                    });
            }
            
            return columns;
        }
        
        private generateDates(n: number){
            let dates = [];
            for(let i=0;i<n;i++){
                let randDate = this.randomDate(new Date(2014,0,1), new Date(2015,5,10));
                if(_.contains(dates,randDate)){
                    i--;
                }else{
                    dates.push(randDate);
                }
            }
            
            return dates.sort((a,b) => {
                if(a.getTime() > b.getTime()) 
                return 1;
                    return -1;
                });
        }
        
        private randomDate(start, end){
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }
        
        private generateColumns(dataViewMetadata: DataViewMetadata, n: number){
            var columns = [];
            for(let i=0;i<n;i++){
                columns.push({
                    source: dataViewMetadata.columns[i+1],
                    // Sales Amount for 2014
                    values: this.sampleData[i],
                });
            }
            
            return columns;
        }
        
        private generateData(n: number, m: number) {
            let data = [];
            for(let i=0;i<n;i++){
                data.push(this.generateSeries(m));
            }
            return data;
        }
        
        // Inspired by Lee Byron's test data generator.
        private generateSeries(n: number) {
            var generateValue = function(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < n; i++) {
                    var w = (i / n - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            };

            var a = [], i;
            for (i = 0; i < n; ++i) a[i] = 0;
            for (i = 0; i < 5; ++i) generateValue(a);
            return a.map((d, i) => Math.max(0, d) *10000);
        }
    }
}