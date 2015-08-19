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

module powerbi.visuals {
    export var matrixRoleNames = {
        rows: 'Rows',
        columns: 'Columns',
        values: 'Values',
    };

    export var matrixCapabilities: VisualCapabilities = {
        dataRoles: [
            {
                name: matrixRoleNames.rows,
                kind: VisualDataRoleKind.Grouping
            }, {
                name: matrixRoleNames.columns,
                kind: VisualDataRoleKind.Grouping
            }, {
                name: matrixRoleNames.values,
                kind: VisualDataRoleKind.Measure
            }
        ],
        objects: {
            general: {
                displayName: data.createDisplayNameGetter('Visual_General'),
                properties: {
                    formatString: {
                        type: { formatting: { formatString: true } },
                    },
                    rowSubtotals: {
                        type: { bool: true },
                        displayName: data.createDisplayNameGetter('Visual_RowTotals')
                    },
                    columnSubtotals: {
                        type: { bool: true },
                        displayName: data.createDisplayNameGetter('Visual_ColumnTotals')
                    }
                },
            }
        },
        dataViewMappings: [{
            conditions: [
                { 'Rows': { max: 0 }, 'Columns': { max: 0 }, 'Values': { min: 1 } },
                { 'Rows': { min: 1 }, 'Columns': { min: 0 }, 'Values': { min: 0 } },
                { 'Rows': { min: 0 }, 'Columns': { min: 1 }, 'Values': { min: 0 } }
            ],
            matrix: {
                rows: {
                    for: { in: 'Rows' },
                    /* Explicitly override the server data reduction to make it appropriate for matrix. */
                    dataReductionAlgorithm: { window: { count: 100 } }
                },
                columns: {
                    for: { in: 'Columns' },
                    /* Explicitly override the server data reduction to make it appropriate for matrix. */
                    dataReductionAlgorithm: { top: { count: 100 } }
                },
                values: {
                    for: { in: 'Values' }
                }
            }
        }],
        filterMappings: {
            measureFilter: {
                targetRoles: [matrixRoleNames.rows]
            }
        },
        sorting: {
            custom: {},
        },
        suppressDefaultTitle: true,
    }; 
}