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
    import ValueType = powerbi.ValueType;
    import PrimitiveType = powerbi.PrimitiveType;
    
    export class SimpleTableData extends SampleDataViews implements ISampleDataViewsMethods {

        public name: string = "SimpleTableData";
        public displayName: string = "Simple table data";

        public visuals: string[] = ['table',
        ];

        public getDataViews(): DataView[] {
            var dataTypeNumber = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double);
            var dataTypeString = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text);            

            var groupSource1: DataViewMetadataColumn = { displayName: 'group1', type: dataTypeString, index: 0 };
            var groupSource2: DataViewMetadataColumn = { displayName: 'group2', type: dataTypeString, index: 1 };
            var groupSource3: DataViewMetadataColumn = { displayName: 'group3', type: dataTypeString, index: 2 };

            var measureSource1: DataViewMetadataColumn = { displayName: 'measure1', type: dataTypeNumber, isMeasure: true, index: 3, objects: { general: { formatString: '#.0' } } };
            var measureSource2: DataViewMetadataColumn = { displayName: 'measure2', type: dataTypeNumber, isMeasure: true, index: 4, objects: { general: { formatString: '#.00' } } };
            var measureSource3: DataViewMetadataColumn = { displayName: 'measure3', type: dataTypeNumber, isMeasure: true, index: 5, objects: { general: { formatString: '#' } } };

            return [{
                metadata: { columns: [groupSource1, measureSource1, groupSource2, measureSource2, groupSource3, measureSource3] },
                table: {
                    columns: [groupSource1, measureSource1, groupSource2, measureSource2, groupSource3, measureSource3],
                    rows: [
                        ['A', 100, 'aa', 101, 'aa1', 102],
                        ['A', 103, 'aa', 104, 'aa2', 105],
                        ['A', 106, 'ab', 107, 'ab1', 108],
                        ['B', 109, 'ba', 110, 'ba1', 111],
                        ['B', 112, 'bb', 113, 'bb1', 114],
                        ['B', 115, 'bb', 116, 'bb2', 117],
                        ['C', 118, 'cc', 119, 'cc1', 120],
                    ]
                }
            }];
        }

        public randomize(): void {
        }
        
    }
}