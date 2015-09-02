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

module powerbi.visuals {
    export var slicerCapabilities: VisualCapabilities = {
        dataRoles: [
            {
                name: 'Values',
                kind: VisualDataRoleKind.Grouping,
                displayName: powerbi.data.createDisplayNameGetter('Role_DisplayName_Field'),
            }
        ],
        objects: {
            general: {
                displayName: data.createDisplayNameGetter('Visual_General'),
                properties: {
                    selected: {
                        type: { bool: true }
                    },
                    filter: {
                        type: { filter: {} },
                        rule: {
                            output: {
                                property: 'selected',
                                selector: ['Values'],
                            }
                        }
                    },
                    formatString: {
                        type: { formatting: { formatString: true } },
                    },
                    outlineColor: {
                        displayName: data.createDisplayNameGetter('Visual_outlineColor'),
                        type: { fill: { solid: { color: true } } }
                    },
                    outlineWeight: {
                        displayName: data.createDisplayNameGetter('Visual_outlineWeight'),
                        type: { numeric: true }
                    }
                },
            },
            header: {
                displayName: data.createDisplayNameGetter('Visual_Header'),
                properties: {
                    show: {
                        displayName: data.createDisplayNameGetter('Visual_Show'),
                        type: { bool: true }
                    },
                    fontColor: {
                        displayName: data.createDisplayNameGetter('Visual_FontColor'),
                        type: { fill: { solid: { color: true } } }
                    },
                    background: {
                        displayName: data.createDisplayNameGetter('Visual_Background'),
                        type: { fill: { solid: { color: true } } }
                    },
                    outline: {
                        displayName: data.createDisplayNameGetter('Visual_Outline'),
                        type: { formatting: { outline: true } }
                    }
                }
            },
            Rows: {
                displayName: data.createDisplayNameGetter('Role_DisplayName_Rows'),
                properties: {
                    fontColor: {
                        displayName: data.createDisplayNameGetter('Visual_FontColor'),
                        type: { fill: { solid: { color: true } } }
                    },
                    background: {
                        displayName: data.createDisplayNameGetter('Visual_Background'),
                        type: { fill: { solid: { color: true } } }
                    },
                    outline: {
                        displayName: data.createDisplayNameGetter('Visual_Outline'),
                        type: { formatting: { outline: true } }
                    }
                }
            }
        },
        dataViewMappings: [{
            conditions: [{ 'Values': { max: 1 } }],
            categorical: {
                categories: {
                    for: { in: 'Values' },
                    dataReductionAlgorithm: { window: {} }
                },
                includeEmptyGroups: true,
            }
        }],

        sorting: {
            default: {},
        },
        suppressDefaultTitle: true,
    };

    export var slicerProps = {
        general: {
            outlineColor: <DataViewObjectPropertyIdentifier>{ objectName: 'general', propertyName: 'outlineColor' },
            outlineWeight: <DataViewObjectPropertyIdentifier>{ objectName: 'general', propertyName: 'outlineWeight' }
        },
        header: {
            show: <DataViewObjectPropertyIdentifier>{ objectName: 'header', propertyName: 'show' },
            fontColor: <DataViewObjectPropertyIdentifier>{ objectName: 'header', propertyName: 'fontColor' },
            background: <DataViewObjectPropertyIdentifier>{ objectName: 'header', propertyName: 'background' },
            outline: <DataViewObjectPropertyIdentifier>{ objectName: 'header', propertyName: 'outline' }
        },
        Rows: {
            fontColor: <DataViewObjectPropertyIdentifier>{ objectName: 'Rows', propertyName: 'fontColor' },
            background: <DataViewObjectPropertyIdentifier>{ objectName: 'Rows', propertyName: 'background' },
            outline: <DataViewObjectPropertyIdentifier>{ objectName: 'Rows', propertyName: 'outline' }
        },
        selectedPropertyIdentifier: <DataViewObjectPropertyIdentifier>{ objectName: 'general', propertyName: 'selected' },
        filterPropertyIdentifier: <DataViewObjectPropertyIdentifier> { objectName: 'general', propertyName: 'filter' },
        formatString: <DataViewObjectPropertyIdentifier> { objectName: 'general', propertyName: 'formatString' },

    };

}