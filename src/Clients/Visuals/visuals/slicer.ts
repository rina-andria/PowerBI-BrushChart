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

    export interface SlicerData {
        categorySourceName: string;
        formatString: string;
        slicerDataPoints: SlicerDataPoint[];
        slicerSettings: SlicerSettings;
    }

    export interface SlicerDataPoint extends SelectableDataPoint {
        value: string;
        mouseOver: boolean;
        mouseOut: boolean;
        isSelectAllDataPoint?: boolean;
    }

    export interface SlicerSettings {
        general: {
            outlineColor: string;
            outlineWeight: number;
        };
        header: {
            height: number;
            borderBottomWidth: number;
            show: boolean;
            outline: string;
            fontColor: string;
            background: string;
        };
        headerText: {
            marginLeft: number;
            marginTop: number;
        };
        slicerText: {
            color: string;
            hoverColor: string;
            selectionColor: string;
            marginLeft: number;
            outline: string;
            background: string;
        };
        slicerItemContainer: {
            height: number;
            marginTop: number;
            marginLeft: number;
        };
    }

    export class Slicer implements IVisual, IInteractiveVisual  {
        private element: JQuery;
        private currentViewport: IViewport;
        private dataView: DataView;
        private slicerContainer: D3.Selection;
        private slicerHeader: D3.Selection;
        private slicerBody: D3.Selection;
        private listView: IListView;
        private slicerData: SlicerData;
        private settings: SlicerSettings;
        private interactivityService: IInteractivityService;
        private hostServices: IVisualHostServices;
        private static clearTextKey = 'Slicer_Clear';
        private static selectAllTextKey = 'Slicer_SelectAll';
        private waitingForData: boolean;

        private static Container: ClassAndSelector = {
            class: 'slicerContainer',
            selector: '.slicerContainer'
        };
        private static Header: ClassAndSelector = {
            class: 'slicerHeader',
            selector: '.slicerHeader'
        };
        private static HeaderText: ClassAndSelector = {
            class: 'headerText',
            selector: '.headerText'
        };
        private static Body: ClassAndSelector = {
            class: 'slicerBody',
            selector: '.slicerBody'
        };
        private static ItemContainer: ClassAndSelector = {
            class: 'slicerItemContainer',
            selector: '.slicerItemContainer'
        };
        private static LabelText: ClassAndSelector = {
            class: 'slicerText',
            selector: '.slicerText'
        };
        private static Input: ClassAndSelector = {
            class: 'slicerCheckbox',
            selector: '.slicerCheckbox'
        };
        private static Clear: ClassAndSelector = {
            class: 'clear',
            selector: '.clear'
        };

        public static DefaultStyleProperties(): SlicerSettings {
            return {
                general: {
                    outlineColor: '#000000',
                    outlineWeight: 2
                 },
            header: {
                height: 22,
                borderBottomWidth: 1,
                    show: true,
                    outline: "BottomOnly",
                    fontColor: '#000000',
                    background: '#ffffff',
            },
            headerText: {
                marginLeft: 8,
                    marginTop: 0
            },
            slicerText: {
                color: '#666666',
                hoverColor: '#212121',
                selectionColor: '#212121',
                marginLeft: 8,
                    outline: "None",
                    background: '#ffffff'
            },
            slicerItemContainer: {
                height: 24,
                // The margin is assigned in the less file. This is needed for the height calculations.
                marginTop: 5,
                marginLeft: 8
                }
        };
        }

        public static converter(dataView: DataView, localizedSelectAllText: string, interactivityService: IInteractivityService): SlicerData {
            var slicerData: SlicerData;
            if (!dataView) {
                return;
            }

                var dataViewCategorical = dataView.categorical;
            if (dataViewCategorical == null || dataViewCategorical.categories == null || dataViewCategorical.categories.length === 0)
                return;

            var isInvertedSelectionMode = false;
            var objects = dataView.metadata ? <any> dataView.metadata.objects : undefined;
                    var categories = dataViewCategorical.categories[0];

            if (objects && objects.general && objects.general.filter) {
                var identityFields = categories.identityFields;
                if (!identityFields)
                    return;
                var filter = <powerbi.data.SemanticFilter>objects.general.filter;
                var scopeIds = powerbi.data.SQExprConverter.asScopeIdsContainer(filter, identityFields);
                isInvertedSelectionMode = scopeIds.isNot;
            }
            else if (interactivityService != null) {
                // In few cases like SelectAll/Clear, visual in not updated with the recent selection state so on doing a loadMore after those operations the visual has stale selection data.                
                // So the selection state is read from the Interactivity service to get the updated selection state.
                isInvertedSelectionMode = interactivityService.isSelectionModeInverted();
            }

                    var categoryValuesLen = categories && categories.values ? categories.values.length : 0;
                    var slicerDataPoints: SlicerDataPoint[] = [];

            slicerDataPoints.push({
                value: localizedSelectAllText,
                mouseOver: false,
                mouseOut: true,
                identity: SelectionId.createWithMeasure(localizedSelectAllText),
                selected: isInvertedSelectionMode,
                isSelectAllDataPoint: true
            });                    
                                     
                    // Pass over the values to see if there's a positive or negative selection
                    var hasSelection: boolean = undefined;

                    for (var idx = 0; idx < categoryValuesLen; idx++) {
                        var selected = WebInteractivityService.isSelected(slicerProps.selectedPropertyIdentifier, categories, idx);
                if (selected != null) {
                            hasSelection = selected;
                            break;
                        }
                    }

                    for (var idx = 0; idx < categoryValuesLen; idx++) {
                        var categoryIdentity = categories.identity ? categories.identity[idx] : null;
                var categoryIsSelected = WebInteractivityService.isSelected(slicerProps.selectedPropertyIdentifier, categories, idx);

                if (hasSelection != null) {
                    // If the visual is in InvertedSelectionMode, all the categories should be selected by default unless they are not selected
                    // If the visual is not in InvertedSelectionMode, we set all the categories to be false except the selected category                         
                    if (isInvertedSelectionMode) {
                        if (categories.objects == null)
                            categoryIsSelected = undefined;

                        if (categoryIsSelected != null) {
                            categoryIsSelected = hasSelection;
                        }
                        else if (categoryIsSelected == null)
                            categoryIsSelected = !hasSelection;
                    }
                    else {
                        if (categoryIsSelected == null) {
                            categoryIsSelected = !hasSelection;
                        }
                    }
                        }

                        slicerDataPoints.push({
                            value: categories.values[idx],
                            mouseOver: false,
                            mouseOut: true,
                            identity: SelectionId.createWithId(categoryIdentity),
                    selected: categoryIsSelected
                        });
                    }

                    var defaultSettings = this.DefaultStyleProperties();
                    objects = dataView.metadata.objects;
                    if (objects) {
                        defaultSettings.general.outlineColor = DataViewObjects.getFillColor(objects, slicerProps.general.outlineColor, this.DefaultStyleProperties().general.outlineColor);
                        defaultSettings.general.outlineWeight = DataViewObjects.getValue<number>(objects, slicerProps.general.outlineWeight, this.DefaultStyleProperties().general.outlineWeight);
                        defaultSettings.header.show = DataViewObjects.getValue<boolean>(objects, slicerProps.header.show, this.DefaultStyleProperties().header.show);
                        defaultSettings.header.fontColor = DataViewObjects.getFillColor(objects, slicerProps.header.fontColor, this.DefaultStyleProperties().header.fontColor);
                        defaultSettings.header.background = DataViewObjects.getFillColor(objects, slicerProps.header.background, this.DefaultStyleProperties().header.background);
                        defaultSettings.header.outline = DataViewObjects.getValue<string>(objects, slicerProps.header.outline, this.DefaultStyleProperties().header.outline);
                        defaultSettings.slicerText.color = DataViewObjects.getFillColor(objects, slicerProps.Rows.fontColor, this.DefaultStyleProperties().slicerText.color);
                        defaultSettings.slicerText.background = DataViewObjects.getFillColor(objects, slicerProps.Rows.background, this.DefaultStyleProperties().slicerText.background);
                        defaultSettings.slicerText.outline = DataViewObjects.getValue<string>(objects, slicerProps.Rows.outline, this.DefaultStyleProperties().slicerText.outline);
                    }
                        
                    slicerData = {
                        categorySourceName: categories.source.displayName,
                        formatString: valueFormatter.getFormatString(categories.source, slicerProps.formatString),
                        slicerSettings: defaultSettings,
                        slicerDataPoints: slicerDataPoints
                    };

            return slicerData;
        }

        public init(options: VisualInitOptions): void {
            this.element = options.element;
            this.currentViewport = options.viewport;
            this.interactivityService = VisualInteractivityFactory.buildInteractivityService(options);
            this.hostServices = options.host;
            this.settings = Slicer.DefaultStyleProperties();

            this.initContainer();
        }

        public onDataChanged(options: VisualDataChangedOptions): void {
            var dataViews = options.dataViews;
            debug.assertValue(dataViews, 'dataViews');

            if (this.interactivityService)
                this.interactivityService.clearSelection();

            var existingDataView = this.dataView;
            if (dataViews && dataViews.length > 0) {
                this.dataView = dataViews[0];
            }

            var resetScrollbarPosition = false;
            // Null check is needed here. If we don't check for null, selecting a value on loadMore event will evaluate the below condition to true and resets the scrollbar
            if (options.operationKind !== undefined) {
                resetScrollbarPosition = options.operationKind !== VisualDataChangeOperationKind.Append
                && !DataViewAnalysis.hasSameCategoryIdentity(existingDataView, this.dataView);
            }
            this.updateInternal(resetScrollbarPosition);
            this.waitingForData = false;
        }

        public onResizing(finalViewport: IViewport): void {
            this.currentViewport = finalViewport;
            var slicerViewport = this.getSlicerBodyViewport(this.currentViewport);
            this.slicerBody.style({
                'height': SVGUtil.convertToPixelString(slicerViewport.height),
                'width': SVGUtil.convertToPixelString(slicerViewport.width),
            });
            this.updateInternal();
        }

        public accept(visitor: InteractivityVisitor, options: any): void {
            visitor.visitSlicer(options, this.slicerData.slicerSettings);
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            var data = this.slicerData;
            if (!data)
                return;

            var objectName = options.objectName;
            switch (objectName) {
                case 'Rows':
                    return this.enumerateRows(data);
                case 'header':
                    return this.enumerateHeader(data);
                case 'general':
                    return this.enumerateGeneral(data);
            }
        }

        private enumerateHeader(data: SlicerData): VisualObjectInstance[] {
            var slicerSettings = this.settings;
            var fontColor = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.header && data.slicerSettings.header.fontColor ?
                data.slicerSettings.header.fontColor : slicerSettings.header.fontColor;
            var background = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.header && data.slicerSettings.header.background ?
                data.slicerSettings.header.background : slicerSettings.header.background;
            return [{
                selector: null,
                objectName: 'header',
                properties: {
                    show: slicerSettings.header.show,
                    fontColor: fontColor,
                    background: background,
                    outline: slicerSettings.header.outline
                }
            }];
        }

        private enumerateRows(data: SlicerData): VisualObjectInstance[] {
            var slicerSettings =  this.settings;
            var fontColor = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.slicerText && data.slicerSettings.slicerText.color ?
                data.slicerSettings.slicerText.color : slicerSettings.slicerText.color;
            var background = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.slicerText && data.slicerSettings.slicerText.background ?
                data.slicerSettings.slicerText.background : slicerSettings.slicerText.background;
            return [{
                selector: null,
                objectName: 'rows',
                properties: {
                    fontColor: fontColor,
                    background: background,
                    outline: slicerSettings.slicerText.outline
                }
            }];
        }

        private enumerateGeneral(data: SlicerData): VisualObjectInstance[] {
            var slicerSettings = this.settings;
            var outlineColor = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.general && data.slicerSettings.general.outlineColor ?
                data.slicerSettings.general.outlineColor : slicerSettings.general.outlineColor;
            var outlineWeight = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.general && data.slicerSettings.general.outlineWeight ?
                data.slicerSettings.general.outlineWeight : slicerSettings.general.outlineWeight;
 
            return [{
                selector: null,
                objectName: 'general',
                properties: {
                    outlineColor: outlineColor,
                    outlineWeight: outlineWeight
                }
            }];
        }

        private updateInternal(resetScrollbarPosition: boolean = false) {
            var localizedSelectAllText = this.hostServices.getLocalizedString(Slicer.selectAllTextKey);
            var data = Slicer.converter(this.dataView, localizedSelectAllText, this.interactivityService);
            if (!data) {
                this.listView.empty();
                return;
            }
            data.slicerSettings.general.outlineWeight = data.slicerSettings.general.outlineWeight < 0 ? 0 : data.slicerSettings.general.outlineWeight;
            this.slicerData = data;

            this.settings = this.slicerData.slicerSettings;
            this.listView
                .viewport(this.getSlicerBodyViewport(this.currentViewport))
                .rowHeight(this.getRowHeight())
                .data(data.slicerDataPoints, (d: SlicerDataPoint) => $.inArray(d, data.slicerDataPoints))
                .render(true, resetScrollbarPosition);
        }

        private initContainer() {
            var settings = this.settings;
            var slicerBodyViewport = this.getSlicerBodyViewport(this.currentViewport);
            this.slicerContainer = d3.select(this.element.get(0)).classed(Slicer.Container.class, true);

            this.slicerHeader = this.slicerContainer.append("div").classed(Slicer.Header.class, true)
                .style('height', SVGUtil.convertToPixelString(settings.header.height));

            this.slicerHeader.append("span")
                .classed(Slicer.Clear.class, true)
                .attr('title', this.hostServices.getLocalizedString(Slicer.clearTextKey));

            this.slicerHeader.append("div").classed(Slicer.HeaderText.class, true)
                .style({
                    'margin-left': SVGUtil.convertToPixelString(settings.headerText.marginLeft),
                    'margin-top': SVGUtil.convertToPixelString(settings.headerText.marginTop),
                    'border-style': this.getBorderStyle(settings.header.outline),
                    'border-color': settings.general.outlineColor,
                    'border-width': this.getBorderWidth(settings.header.outline,settings.general.outlineWeight)                 
                });

            this.slicerBody = this.slicerContainer.append("div").classed(Slicer.Body.class, true)
                .style({
                    'height': SVGUtil.convertToPixelString(slicerBodyViewport.height),
                    'width': SVGUtil.convertToPixelString(slicerBodyViewport.width)
                });

            var rowEnter = (rowSelection: D3.Selection) => {
                var labelWidth = SVGUtil.convertToPixelString(this.currentViewport.width - (settings.slicerItemContainer.marginLeft + settings.slicerText.marginLeft + settings.general.outlineWeight*2));
                var listItemElement = rowSelection.append("li")
                    .classed(Slicer.ItemContainer.class, true)
                    .style({
                        'height': SVGUtil.convertToPixelString(settings.slicerItemContainer.height),
                        'margin-left': SVGUtil.convertToPixelString(settings.slicerItemContainer.marginLeft),
                    });

                var labelElement = listItemElement.append("label")
                    .classed(Slicer.Input.class, true);

                labelElement.append("input")
                    .attr('type', 'checkbox');

                labelElement.append("span")
                    .classed(Slicer.LabelText.class, true)
                    .style('width', labelWidth);
            };

            var rowUpdate = (rowSelection: D3.Selection) => {
                if (this.slicerData) {
                    if (this.settings.header.show) {
                        this.slicerHeader.style("display", "inline");
                        this.slicerHeader.select(Slicer.HeaderText.selector)
                            .text(this.slicerData.categorySourceName)
                            .style({
                                'border-style': this.getBorderStyle(this.slicerData.slicerSettings.header.outline),
                                'border-color': this.slicerData.slicerSettings.general.outlineColor,
                                'border-width': this.getBorderWidth(this.slicerData.slicerSettings.header.outline, this.slicerData.slicerSettings.general.outlineWeight),
                                'color': this.slicerData.slicerSettings.header.fontColor,
                                'background-color': this.slicerData.slicerSettings.header.background
                            });

                    }
                    else {
                        this.slicerHeader.style("display", "none");
                    }
                    var slicerText = rowSelection.selectAll(Slicer.LabelText.selector);
                    var formatString = this.slicerData.formatString;
                    slicerText.text((d: SlicerDataPoint) => valueFormatter.format(d.value, formatString));
                    slicerText.style({
                        'color': this.slicerData.slicerSettings.slicerText.color,
                        'background-color': this.slicerData.slicerSettings.slicerText.background,
                        'border-style': this.getBorderStyle(this.slicerData.slicerSettings.slicerText.outline),
                        'border-color': this.slicerData.slicerSettings.general.outlineColor,
                        'border-width': this.getBorderWidth(this.slicerData.slicerSettings.slicerText.outline, this.slicerData.slicerSettings.general.outlineWeight)
                    });
                    if (this.interactivityService && this.slicerBody) {
                        var slicerBody = this.slicerBody.attr('width', this.currentViewport.width);
                        var slicerItemContainers = slicerBody.selectAll(Slicer.ItemContainer.selector);
                        var slicerItemLabels = slicerBody.selectAll(Slicer.LabelText.selector);
                        var slicerItemInputs = slicerBody.selectAll(Slicer.Input.selector);
                        var slicerClear = this.slicerHeader.select(Slicer.Clear.selector);

                        var behaviorOptions: SlicerBehaviorOptions = {
                            datapoints: this.slicerData.slicerDataPoints,
                            slicerItemContainers: slicerItemContainers,
                            slicerItemLabels: slicerItemLabels,
                            slicerItemInputs: slicerItemInputs,
                            slicerClear: slicerClear,
                            isInvertedSelectionMode: this.slicerData.slicerDataPoints && this.slicerData.slicerDataPoints.length > 0 && this.slicerData.slicerDataPoints[0].selected,
                        };
                        this.interactivityService.apply(this, behaviorOptions);
                    }
                }
                rowSelection.select(Slicer.Input.selector).select('input').property('checked', (d: SlicerDataPoint) => d.selected);
            };

            var rowExit = (rowSelection: D3.Selection) => {
                rowSelection.remove();
            };

            var listViewOptions: ListViewOptions = {
                rowHeight: this.getRowHeight(),
                enter: rowEnter,
                exit: rowExit,
                update: rowUpdate,
                loadMoreData: () => this.onLoadMoreData(),
                viewport: this.getSlicerBodyViewport(this.currentViewport),
                baseContainer: this.slicerBody
            };

            this.listView = ListViewFactory.createHTMLListView(listViewOptions);
        }

        private onLoadMoreData(): void {
            if (!this.waitingForData && this.dataView.metadata && this.dataView.metadata.segment) {
                this.hostServices.loadMoreData();
                this.waitingForData = true;
            }
        }

        private getSlicerBodyViewport(currentViewport: IViewport): IViewport {
            var settings = this.settings;
            var headerHeight = (this.settings.header.show) ? settings.header.height : 0; 
            var slicerBodyHeight = currentViewport.height - (headerHeight + settings.header.borderBottomWidth);
            return {
                height: slicerBodyHeight,
                width: currentViewport.width
            };
        }

        private getRowHeight(): number {
            var slicerItemSettings = this.settings.slicerItemContainer;
            return slicerItemSettings.height;
        }

        private getBorderStyle(outlineElement: string): string {

            return outlineElement === '0px' ? 'none' : 'solid';
        }

        private getBorderWidth(outlineElement: string, outlineWeight: number): string {

            switch (outlineElement) {
                case 'None':
                    return "0px";
                case 'BottomOnly':
                    return "0px 0px " + outlineWeight +"px 0px";
                case 'TopOnly':
                    return  outlineWeight +"px 0px 0px 0px";
                case 'TopBottom':
                    return outlineWeight + "px 0px "+ outlineWeight +"px 0px";
                case 'LeftRight':
                    return "0px " + outlineWeight + "px 0px " + outlineWeight +"px";
                case 'Frame':
                    return outlineWeight +"px";
                default:    
                    return outlineElement.replace("2",outlineWeight.toString());

            }
        }

    }
}