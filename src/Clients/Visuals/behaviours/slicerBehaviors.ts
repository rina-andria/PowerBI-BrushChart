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
    export interface SlicerBehaviorOptions {
        datapoints: SlicerDataPoint[];
        slicerItemContainers: D3.Selection;
        slicerItemLabels: D3.Selection;
        slicerItemInputs: D3.Selection;
        slicerClear: D3.Selection;
        isInvertedSelectionMode: boolean;
    }

    export class SlicerWebBehavior {
        public updateLabels(selectionLabels: D3.Selection, slicerSettings:SlicerSettings) {
            selectionLabels.style({
                'color': (d: SlicerDataPoint) => {
                    if (d.selected)
                        return slicerSettings.slicerText.selectionColor;
                    else
                        return slicerSettings.slicerText.color;
                }
            });
        }

        public updateItemsInputOnSelectAll(slicerItemInputs: D3.Selection, dataPoint: SlicerDataPoint): void {
            if (dataPoint == null)
                return;

            slicerItemInputs.selectAll('input').each(function (d: SlicerDataPoint) {
                if (d.value === dataPoint.value) {
                    return;
                }
                else {
                    var input = d3.select(this);
                    input.property({ 'checked': (d: SlicerDataPoint) => d.selected });
                }
            });
        }

        public updateSelectAll(slicerItemInputs: D3.Selection, isInvertedSelectionMode: boolean): void {
            slicerItemInputs.select('input').each(function (d: SlicerDataPoint) {
                if (d.isSelectAllDataPoint) {
                    var input = d3.select(this);
                    input.classed('partiallySelected', isInvertedSelectionMode);
                }
            });
        }

        public mouseInteractions(selectionLabels: D3.Selection, slicerSettings: SlicerSettings) {
            selectionLabels.style({
                'color': (d: SlicerDataPoint) => {
                    if (d.mouseOver)
                        return slicerSettings.slicerText.hoverColor;

                    if (d.mouseOut) {
                        if (d.selected)
                            return slicerSettings.slicerText.selectionColor;
                        else
                            return slicerSettings.slicerText.color;
                    }
                }
            });
        }

        public clearSlicers(selectionLabels: D3.Selection, slicerItemInputs: D3.Selection): void {
            slicerItemInputs.selectAll('input').property('checked', false);
            selectionLabels.style('color', Slicer.DefaultStyleProperties().slicerText.color);
        }
    }
}  