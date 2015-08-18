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
    
    export class SimpleMatrixData extends SampleDataViews implements ISampleDataViewsMethods {

        public name: string = "SimpleMatrixData";
        public displayName: string = "Simple matrix data";

        public visuals: string[] = ['matrix',
        ];

        public getDataViews(): DataView[] {
            var dataTypeNumber = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double);
            var dataTypeString = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text);
            
            var measureSource1: DataViewMetadataColumn = { displayName: 'measure1', type: dataTypeNumber, isMeasure: true, index: 3, objects: { general: { formatString: '#.0' } } };
            var measureSource2: DataViewMetadataColumn = { displayName: 'measure2', type: dataTypeNumber, isMeasure: true, index: 4, objects: { general: { formatString: '#.00' } } };
            var measureSource3: DataViewMetadataColumn = { displayName: 'measure3', type: dataTypeNumber, isMeasure: true, index: 5, objects: { general: { formatString: '#' } } };

            var rowGroupSource1: DataViewMetadataColumn = { displayName: 'RowGroup1', queryName: 'RowGroup1', type: dataTypeString, index: 0 };
            var rowGroupSource2: DataViewMetadataColumn = { displayName: 'RowGroup2', queryName: 'RowGroup2', type: dataTypeString, index: 1 };
            var rowGroupSource3: DataViewMetadataColumn = { displayName: 'RowGroup3', queryName: 'RowGroup3', type: dataTypeString, index: 2 };

            var matrixThreeMeasuresThreeRowGroups: DataViewMatrix = {
                rows: {
                    root: {
                        children: [
                            {
                                level: 0,
                                value: 'North America',
                                children: [
                                    {
                                        level: 1,
                                        value: 'Canada',
                                        children: [
                                            {
                                                level: 2,
                                                value: 'Ontario',
                                                values: {
                                                    0: { value: 1000 },
                                                    1: { value: 1001, valueSourceIndex: 1 },
                                                    2: { value: 1002, valueSourceIndex: 2 }
                                                }
                                            },
                                            {
                                                level: 2,
                                                value: 'Quebec',
                                                values: {
                                                    0: { value: 1010 },
                                                    1: { value: 1011, valueSourceIndex: 1 },
                                                    2: { value: 1012, valueSourceIndex: 2 }
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        level: 1,
                                        value: 'USA',
                                        children: [
                                            {
                                                level: 2,
                                                value: 'Washington',
                                                values: {
                                                    0: { value: 1100 },
                                                    1: { value: 1101, valueSourceIndex: 1 },
                                                    2: { value: 1102, valueSourceIndex: 2 }
                                                }
                                            },
                                            {
                                                level: 2,
                                                value: 'Oregon',
                                                values: {
                                                    0: { value: 1110 },
                                                    1: { value: 1111, valueSourceIndex: 1 },
                                                    2: { value: 1112, valueSourceIndex: 2 }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                level: 0,
                                value: 'South America',
                                children: [
                                    {
                                        level: 1,
                                        value: 'Brazil',
                                        children: [
                                            {
                                                level: 2,
                                                value: 'Amazonas',
                                                values: {
                                                    0: { value: 2000 },
                                                    1: { value: 2001, valueSourceIndex: 1 },
                                                    2: { value: 2002, valueSourceIndex: 2 }
                                                }
                                            },
                                            {
                                                level: 2,
                                                value: 'Mato Grosso',
                                                values: {
                                                    0: { value: 2010 },
                                                    1: { value: 2011, valueSourceIndex: 1 },
                                                    2: { value: 2012, valueSourceIndex: 2 }
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        level: 1,
                                        value: 'Chile',
                                        children: [
                                            {
                                                level: 2,
                                                value: 'Arica',
                                                values: {
                                                    0: { value: 2100 },
                                                    1: { value: 2101, valueSourceIndex: 1 },
                                                    2: { value: 2102, valueSourceIndex: 2 }
                                                }
                                            },
                                            {
                                                level: 2,
                                                value: 'Parinacota',
                                                values: {
                                                    0: { value: 2110 },
                                                    1: { value: 2111, valueSourceIndex: 1 },
                                                    2: { value: 2112, valueSourceIndex: 2 }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },

                        ]
                    },
                    levels: [
                        { sources: [rowGroupSource1] },
                        { sources: [rowGroupSource2] },
                        { sources: [rowGroupSource3] }
                    ]
                },
                columns: {
                    root: {
                        children: [
                            { level: 0 },
                            { level: 0, levelSourceIndex: 1 },
                            { level: 0, levelSourceIndex: 2 }
                        ]
                    },
                    levels: [{
                        sources: [
                            measureSource1,
                            measureSource2,
                            measureSource3
                        ]
                    }]
                },
                valueSources: [
                    measureSource1,
                    measureSource2,
                    measureSource3
                ]
            };

            return [{
                metadata: { columns: [rowGroupSource1, rowGroupSource2, rowGroupSource3], segment: {} },
                matrix: matrixThreeMeasuresThreeRowGroups
            }];
        }

        public randomize(): void {
        }
        
    }
}