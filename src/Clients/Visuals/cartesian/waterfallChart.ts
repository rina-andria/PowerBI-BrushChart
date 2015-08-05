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

    export interface WaterfallChartData extends CartesianData {
        series: WaterfallChartSeries[];
        categories: any[];
        valuesMetadata: DataViewMetadataColumn;
        legend: LegendData;
        hasHighlights: boolean;
        categoryMetadata: DataViewMetadataColumn;
        positionMax: number;
        positionMin: number;
        sentimentColors: WaterfallChartSentimentColors;
        dataLabelsSettings: VisualDataLabelsSettings;
        axesLabels: ChartAxesLabels;
        hasSelection: boolean;
    }

    export interface WaterfallChartSeries extends CartesianSeries {
        data: WaterfallChartDataPoint[];
    }

    export interface WaterfallChartDataPoint extends CartesianDataPoint, SelectableDataPoint, TooltipEnabledDataPoint, LabelEnabledDataPoint {
        position: number;
        color: string;
        highlight: boolean;
        key: string;
    }

    export interface WaterfallChartConstructorOptions {
        isScrollable: boolean;
        interactivityService: IInteractivityService;
    }

    export interface WaterfallChartSentimentColors {
        increaseFill: Fill;
        decreaseFill: Fill;
        totalFill: Fill;
    }

    export interface WaterfallLayout extends CategoryLayout, ILabelLayout {
        categoryWidth: number;
    }

    export class WaterfallChart implements ICartesianVisual, IInteractiveVisual {
        public static formatStringProp: DataViewObjectPropertyIdentifier = { objectName: 'general', propertyName: 'formatString' };
        private static WaterfallClassName = 'waterfallChart';
        private static MainGraphicsContextClassName = 'mainGraphicsContext';
        private static DataLabelsSVGClassName = 'dataLabelsSVG';
        private static IncreaseLabel = "Waterfall_IncreaseLabel";
        private static DecreaseLabel = "Waterfall_DecreaseLabel";
        private static TotalLabel = "Waterfall_TotalLabel";
        private static CategoryValueClasses: ClassAndSelector = {
            class: 'column',
            selector: '.column'
        };
        private static WaterfallConnectorClasses: ClassAndSelector = {
            class: 'waterfall-connector',
            selector: '.waterfall-connector'
        };

        private static defaultTotalColor = "#00b8aa";

        private svg: D3.Selection;
        private mainGraphicsContext: D3.Selection;
        private dataLabelsSVG: D3.Selection;
        private mainGraphicsSVG: D3.Selection;
        private clearCatcher: D3.Selection;
        private xAxisProperties: IAxisProperties;
        private yAxisProperties: IAxisProperties;
        private currentViewport: IViewport;
        private data: WaterfallChartData;
        private element: JQuery;
        private isScrollable: boolean;

        // If we overflowed horizontally then this holds the subset of data we should render.
        private clippedData: WaterfallChartData;

        private style: IVisualStyle;
        private colors: IDataColorPalette;
        private hostServices: IVisualHostServices;
        private cartesianVisualHost: ICartesianVisualHost;
        private interactivity: InteractivityOptions;
        private margin: IMargin;
        private options: CartesianVisualInitOptions;
        private interactivityService: IInteractivityService;
        private layout: WaterfallLayout;

        constructor(options: WaterfallChartConstructorOptions) {
            this.isScrollable = options.isScrollable;
            this.interactivityService = options.interactivityService;
        }

        public init(options: CartesianVisualInitOptions): void {
            debug.assertValue(options, 'options');

            this.svg = options.svg;
            this.clearCatcher = this.svg.select('.clearCatcher');
            this.style = options.style;
            this.currentViewport = options.viewport;
            this.hostServices = options.host;
            this.interactivity = options.interactivity;
            this.cartesianVisualHost = options.cartesianHost;
            this.options = options;
            this.element = options.element;
            this.colors = this.style.colorPalette.dataColors;
            this.element.addClass(WaterfallChart.WaterfallClassName);
            this.mainGraphicsSVG = this.svg.append('svg');
            this.mainGraphicsContext = this.mainGraphicsSVG.append('g')
                .classed(WaterfallChart.MainGraphicsContextClassName, true);
            this.dataLabelsSVG = this.svg.append('g')
                .classed(WaterfallChart.DataLabelsSVGClassName, true);
        }

        public static converter(
            dataView: DataView,
            palette: IDataColorPalette,
            hostServices: IVisualHostServices,
            dataLabelSettings: VisualDataLabelsSettings,
            sentimentColors: WaterfallChartSentimentColors,
            interactivityService: IInteractivityService): WaterfallChartData {
            debug.assertValue(palette, 'palette');

            var formatStringProp = WaterfallChart.formatStringProp;
            var categories = dataView.categorical.categories || [];

            var increaseColor = sentimentColors.increaseFill.solid.color;
            var decreaseColor = sentimentColors.decreaseFill.solid.color;
            var totalColor = sentimentColors.totalFill.solid.color;

            var totalLabel = hostServices.getLocalizedString(WaterfallChart.TotalLabel);
            var increaseLabel = hostServices.getLocalizedString(WaterfallChart.IncreaseLabel);
            var decreaseLabel = hostServices.getLocalizedString(WaterfallChart.DecreaseLabel);

            var legend: LegendDataPoint[] = [
                {
                    label: increaseLabel,
                    color: increaseColor,
                    icon: LegendIcon.Box,
                    identity: SelectionId.createNull(),
                    selected: false
                }, {
                    label: decreaseLabel,
                    color: decreaseColor,
                    icon: LegendIcon.Box,
                    identity: SelectionId.createNull(),
                    selected: false
                }, {
                    label: totalLabel,
                    color: totalColor,
                    icon: LegendIcon.Box,
                    identity: SelectionId.createNull(),
                    selected: false
                }];

            /**
             * The position represents the starting point for each bar, for any value it is the sum of all previous values.
             * Values > 0 are considered gains, values < 0 are losses.
             */
            var pos = 0, posMin = 0, posMax = 0;
            var dataPoints: WaterfallChartDataPoint[] = [];
            var categoryValues: any[] = [];
            var categoryMetadata: DataViewMetadataColumn;
            var values = dataView.categorical.values;

            if (!_.isEmpty(values)) {
                var column = values[0];
                var valuesMetadata = column.source;
                var labelFormatString = valuesMetadata.format;

                if (_.isEmpty(categories)) {
                    // We have values but no category, just show the total bar.
                    pos = posMax = column.values[0];
                    posMin = 0;
                }
                else {
                    var categoryIdentities = categories[0].identity;
                    categoryMetadata = categories[0].source;
                    categoryValues = categories[0].values;

                    for (var categoryIndex = 0, catLen = column.values.length; categoryIndex < catLen; categoryIndex++) {
                        var category = categoryValues[categoryIndex];
                        var value = column.values[categoryIndex] || 0;
                        var identity = categoryIdentities ? SelectionId.createWithId(categoryIdentities[categoryIndex], /* highlight */ false) : SelectionId.createNull();
                        var tooltipInfo: TooltipDataItem[] = TooltipBuilder.createTooltipInfo(formatStringProp, categories, category, values, value);
                        var color = value > 0 ? increaseColor : decreaseColor;

                        dataPoints.push({
                            value: value,
                            position: pos,
                            color: color,
                            categoryValue: category,
                            categoryIndex: categoryIndex,
                            seriesIndex: 0,
                            selected: false,
                            identity: identity,
                            highlight: false,
                            key: identity.getKey(),
                            tooltipInfo: tooltipInfo,
                            labelFill: dataLabelSettings.labelColor,
                            labelFormatString: labelFormatString,
                        });

                        pos += value;
                        if (pos > posMax)
                            posMax = pos;
                        if (pos < posMin)
                            posMin = pos;
                    }
                }

                var totalIdentity = SelectionId.createNull();
                dataPoints.push({
                    value: pos,
                    position: 0,
                    color: totalColor,
                    categoryValue: totalLabel,
                    categoryIndex: categoryIndex,
                    identity: totalIdentity,
                    seriesIndex: 0,
                    selected: false,
                    highlight: false,
                    key: totalIdentity.getKey(),
                    tooltipInfo: TooltipBuilder.createTooltipInfo(formatStringProp, categories, totalLabel, values, pos),
                    labelFill: dataLabelSettings.labelColor,
                    labelFormatString: labelFormatString,
                });
            }

            var hasSelection: boolean = false;
            if (interactivityService) {
                if (interactivityService.applySelectionStateToData(dataPoints))
                    hasSelection = true;
            }

            var xAxisProperties = CartesianHelper.getCategoryAxisProperties(dataView.metadata);
            var yAxisProperties = CartesianHelper.getValueAxisProperties(dataView.metadata);
            var axesLabels = converterHelper.createAxesLabels(xAxisProperties, yAxisProperties, categoryMetadata, [valuesMetadata]);

            return {
                series: [{ data: dataPoints }],
                categories: categoryValues,
                categoryMetadata: categoryMetadata,
                valuesMetadata: valuesMetadata,
                legend: { dataPoints: legend },
                hasHighlights: false,
                positionMin: posMin,
                positionMax: posMax,
                dataLabelsSettings: dataLabelSettings,
                sentimentColors: sentimentColors,
                axesLabels: { x: axesLabels.xAxisLabel, y: axesLabels.yAxisLabel },
                hasSelection,
            };
        }

        public setData(dataViews: DataView[]): void {
            debug.assertValue(dataViews, "dataViews");

            var sentimentColors = this.getSentimentColorsFromObjects(null);

            this.data = <WaterfallChartData> {
                series: [{ data: [] }],
                categories: [],
                valuesMetadata: null,
                legend: { dataPoints: [] },
                hasHighlights: false,
                categoryMetadata: null,
                scalarCategoryAxis: false,
                positionMax: 0,
                positionMin: 0,
                dataLabelsSettings: dataLabelUtils.getDefaultLabelSettings(),
                sentimentColors: sentimentColors,
                axesLabels: { x: null, y: null },
                hasSelection: false,
            };

            if (dataViews.length > 0) {
                var dataView = dataViews[0];
                if (dataView) {
                    if (dataView.metadata && dataView.metadata.objects) {
                        var objects = dataView.metadata.objects;

                        var labelsObj = <DataLabelObject>objects['labels'];
                        if (labelsObj) {
                            if (labelsObj.show !== undefined)
                                this.data.dataLabelsSettings.show = labelsObj.show;
                            if (labelsObj.color !== undefined) {
                                this.data.dataLabelsSettings.labelColor = labelsObj.color.solid.color;
                            }
                            if (labelsObj.labelDisplayUnits !== undefined) {
                                this.data.dataLabelsSettings.displayUnits = labelsObj.labelDisplayUnits;
                            }
                            if (labelsObj.labelPrecision !== undefined) {
                                this.data.dataLabelsSettings.precision = (labelsObj.labelPrecision >= 0) ? labelsObj.labelPrecision : 0;
                            }
                        }
                        sentimentColors = this.getSentimentColorsFromObjects(objects);
                    }

                    if (dataView.categorical) {
                        this.data = WaterfallChart.converter(dataView, this.colors, this.hostServices, this.data.dataLabelsSettings, sentimentColors, this.interactivityService);
                    }
                }
            }
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            switch (options.objectName) {
                case 'sentimentColors':
                    return this.enumerateSentimentColors();
                case 'labels':
                    return dataLabelUtils.enumerateDataLabels(this.data.dataLabelsSettings, false, true, true);
            }
        }

        private enumerateSentimentColors(): VisualObjectInstance[] {
            var instances: VisualObjectInstance[] = [];

            var sentimentColors = this.data.sentimentColors;

            instances.push({
                selector: null,
                properties: {
                    increaseFill: sentimentColors.increaseFill,
                    decreaseFill: sentimentColors.decreaseFill,
                    totalFill: sentimentColors.totalFill
                },
                objectName: 'sentimentColors'
            });

            return instances;
        }

        public calculateLegend(): LegendData {
            // TODO: support interactive legend
            return this.data.legend;
        }

        public hasLegend(): boolean {
            // Waterfall legend is more like a color-key, so just return true
            return true;
        }

        private static createClippedDataIfOverflowed(data: WaterfallChartData, renderableDataCount: number): WaterfallChartData {
            var clipped: WaterfallChartData = data;
            var dataPoints: WaterfallChartDataPoint[] = data.series[0].data;

            if (data && renderableDataCount < dataPoints.length) {
                clipped = Prototype.inherit(data);
                clipped.series = [{ data: dataPoints.slice(0, renderableDataCount) }];
                clipped.categories = data.categories.slice(0, renderableDataCount);
            }

            return clipped;
        }

        public calculateAxesProperties(options: CalculateScaleAndDomainOptions): IAxisProperties[] {
            debug.assertValue(options, 'options');

            this.currentViewport = options.viewport;
            var margin = this.margin = options.margin;
            var data = this.clippedData = this.data;

            var categoryCount = data.categories.length + 1;  // +1 for the total

            /* preferredPlotArea would be same as currentViewport width when there is no scrollbar. 
             In that case we want to calculate the available plot area for the shapes by subtracting the margin from available viewport */
            var preferredPlotArea = this.getPreferredPlotArea(false, categoryCount, CartesianChart.MinOrdinalRectThickness);
            if (preferredPlotArea.width === this.currentViewport.width) {
                preferredPlotArea.width -= (margin.left + margin.right);
            }
            preferredPlotArea.height -= (margin.top + margin.bottom);

            var cartesianLayout = CartesianChart.getLayout(
                null,
                {
                    availableWidth: preferredPlotArea.width,
                    categoryCount: categoryCount,
                    domain: null,
                    isScalar: false,
                    isScrollable: this.isScrollable
                });

            // In the case that we have overflowed horizontally we want to clip the data and use that to calculate the axes on the dashboard.           
            if (!this.isScrollable) {
                data = this.clippedData = WaterfallChart.createClippedDataIfOverflowed(data, cartesianLayout.categoryCount);
            }

            var xAxisCreationOptions = WaterfallChart.getXAxisCreationOptions(data, preferredPlotArea.width, cartesianLayout, options);
            var yAxisCreationOptions = WaterfallChart.getYAxisCreationOptions(data, preferredPlotArea.height, options);

            var xAxisProperties = this.xAxisProperties = AxisHelper.createAxis(xAxisCreationOptions);
            var yAxisProperties = this.yAxisProperties = AxisHelper.createAxis(yAxisCreationOptions);

            var categoryWidth = this.xAxisProperties.categoryThickness * (1 - CartesianChart.InnerPaddingRatio);

            var formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
            var value2: number = (yAxisProperties.formatter && yAxisProperties.formatter.displayUnit) ? yAxisProperties.formatter.displayUnit.value : null;
            var labelSettings = data.dataLabelsSettings;
            this.layout = {
                categoryCount: cartesianLayout.categoryCount,
                categoryThickness: cartesianLayout.categoryThickness,
                isScalar: cartesianLayout.isScalar,
                outerPaddingRatio: cartesianLayout.outerPaddingRatio,
                categoryWidth: categoryWidth,
                labelText: (d: WaterfallChartDataPoint) => {
                    //total value has no identity
                    var formatter = formattersCache.getOrCreate(d.labelFormatString, labelSettings, value2);
                    return dataLabelUtils.getLabelFormattedText(formatter.format(d.value));
                },
                labelLayout: dataLabelUtils.getLabelLayoutXYForWaterfall(xAxisProperties, categoryWidth, yAxisProperties, yAxisCreationOptions.dataDomain),
                filter: (d: WaterfallChartDataPoint) => {
                    return dataLabelUtils.doesDataLabelFitInShape(d, yAxisProperties, this.layout);
                },
                style: {
                    'fill': (d: WaterfallChartDataPoint) => {
                        var outsideLabelPoistion = WaterfallChart.getRectTop(yAxisProperties.scale, d.position, d.value) - dataLabelUtils.labelMargin;

                        if (outsideLabelPoistion <= 0) {
                            d.labelFill = dataLabelUtils.defaultInsideLabelColor;
                        }

                        return d.labelFill;
                    }
                },
            };

            this.xAxisProperties.axisLabel = options.showCategoryAxisLabel ? data.axesLabels.x : null;
            this.yAxisProperties.axisLabel = options.showValueAxisLabel ? data.axesLabels.y : null;

            return [xAxisProperties, yAxisProperties];
        }

        private static lookupXValue(data: WaterfallChartData, index: number, type: ValueType): any {
            var dataPoints: WaterfallChartDataPoint[] = data.series[0].data;
            var point = dataPoints[index];

            if (point && point.categoryValue) {
                if (index === dataPoints.length - 1)
                    return point.categoryValue;
                else if (AxisHelper.isDateTime(type))
                    return new Date(point.categoryValue);
                else
                    return point.categoryValue;
            }

            return index;
        }

        public static getXAxisCreationOptions(data: WaterfallChartData, width: number, layout: CategoryLayout, options: CalculateScaleAndDomainOptions): CreateAxisOptions {
            debug.assertValue(data, 'data');
            debug.assertValue(options, 'options');

            var categoryDataType: ValueType = AxisHelper.getCategoryValueType(data.categoryMetadata);

            var domain = AxisHelper.createDomain(data.series, categoryDataType, /* isScalar */ false, options.forcedXDomain);

            var categoryThickness = layout.categoryThickness;
            var outerPadding = categoryThickness * layout.outerPaddingRatio;

            return <CreateAxisOptions> {
                pixelSpan: width,
                dataDomain: domain,
                metaDataColumn: data.categoryMetadata,
                formatStringProp: WaterfallChart.formatStringProp,
                isScalar: false,
                outerPadding: outerPadding,
                categoryThickness: categoryThickness,
                getValueFn: (index, type) => WaterfallChart.lookupXValue(data, index, type),
                forcedTickCount: options.forcedTickCount,
                isCategoryAxis: true
            };
        }

        public static getYAxisCreationOptions(data: WaterfallChartData, height: number, options: CalculateScaleAndDomainOptions): CreateAxisOptions {
            debug.assertValue(data, 'data');
            debug.assertValue(options, 'options');

            var combinedDomain = AxisHelper.combineDomain(options.forcedYDomain, [data.positionMin, data.positionMax]);

            return <CreateAxisOptions> {
                pixelSpan: height,
                dataDomain: combinedDomain,
                isScalar: true,
                isVertical: true,
                metaDataColumn: data.valuesMetadata,
                formatStringProp: WaterfallChart.formatStringProp,
                outerPadding: 0,
                forcedTickCount: options.forcedTickCount,
                useTickIntervalForDisplayUnits: true,
                isCategoryAxis: false
            };
        }

        public getPreferredPlotArea(isScalar: boolean, categoryCount: number, categoryThickness: number): IViewport {
            return CartesianChart.getPreferredPlotArea(
                categoryCount,
                categoryThickness,
                this.currentViewport,
                this.isScrollable,
                isScalar);
        }

        public getVisualCategoryAxisIsScalar(): boolean {
            return false;
        }

        public overrideXScale(xProperties: IAxisProperties): void {
            this.xAxisProperties = xProperties;
        }

        public setFilteredData(startIndex: number, endIndex: number): any {
            var data = this.clippedData = Prototype.inherit(this.data);

            data.series = [{ data: data.series[0].data.slice(startIndex, endIndex) }];
            data.categories = data.categories.slice(startIndex, endIndex);

            return data;
        }

        private createRects(data: WaterfallChartDataPoint[]): D3.UpdateSelection {
            var mainGraphicsContext = this.mainGraphicsContext;
            var colsSelection = mainGraphicsContext.selectAll(WaterfallChart.CategoryValueClasses.selector);
            var cols = colsSelection.data(data, (d: WaterfallChartDataPoint) => d.key);

            cols
                .enter()
                .append('rect')
                .attr('class', (d: WaterfallChartDataPoint) => WaterfallChart.CategoryValueClasses.class.concat(d.highlight ? 'highlight' : ''));

            cols.exit().remove();

            return cols;
        }

        private createConnectors(data: WaterfallChartDataPoint[]): D3.UpdateSelection {
            var mainGraphicsContext = this.mainGraphicsContext;
            var connectorSelection = mainGraphicsContext.selectAll(WaterfallChart.WaterfallConnectorClasses.selector);

            var connectors = connectorSelection.data(data.slice(0, data.length - 1), (d: WaterfallChartDataPoint) => d.key);

            connectors
                .enter()
                .append('line')
                .classed(WaterfallChart.WaterfallConnectorClasses.class, true);

            connectors.exit().remove();

            return connectors;
        }

        public render(suppressAnimations: boolean): void {
            var dataPoints = this.clippedData.series[0].data;
            var bars = this.createRects(dataPoints);
            var connectors = this.createConnectors(dataPoints);

            TooltipManager.addTooltip(bars, (tooltipEvent: TooltipEvent) => tooltipEvent.data.tooltipInfo);

            var hasSelection = this.data.hasSelection;

            var xScale = this.xAxisProperties.scale;
            var yScale = this.yAxisProperties.scale;
            var y0 = yScale(0);

            this.mainGraphicsSVG.attr('height', this.getAvailableHeight())
                .attr('width', this.getAvailableWidth());

            /**
             * The y-value is always at the top of the rect. If the data value is negative then we can
             * use the scaled position directly since we are drawing down. If the data value is positive
             * we have to calculate the top of the rect and use that as the y-value. Since the y-value 
             * is always the top of the rect, height should always be positive.
             */
            bars
                .style('fill', (d: WaterfallChartDataPoint) => d.color)
                .style('fill-opacity', (d: WaterfallChartDataPoint) => ColumnUtil.getFillOpacity(d.selected, d.highlight, hasSelection, this.data.hasHighlights))
                .attr('width', this.layout.categoryWidth)
                .attr('x', (d: WaterfallChartDataPoint) => xScale(d.categoryIndex))
                .attr('y', (d: WaterfallChartDataPoint) => WaterfallChart.getRectTop(yScale, d.position, d.value))
                .attr('height', (d: WaterfallChartDataPoint) => y0 - yScale(Math.abs(d.value)));

            connectors
                .attr({
                    'x1': (d: WaterfallChartDataPoint) => xScale(d.categoryIndex),
                    'y1': (d: WaterfallChartDataPoint) => yScale(d.position + d.value),
                    'x2': (d: WaterfallChartDataPoint) => xScale(d.categoryIndex + 1) + this.layout.categoryWidth,
                    'y2': (d: WaterfallChartDataPoint) => yScale(d.position + d.value),
                });

            if (this.data.dataLabelsSettings.show) {
                dataLabelUtils.drawDefaultLabelsForDataPointChart(dataPoints, this.dataLabelsSVG, this.layout, this.currentViewport);
            } else {
                dataLabelUtils.cleanDataLabels(this.dataLabelsSVG);
            }

            if (this.interactivityService) {
                var behaviorOptions: WaterfallChartBehaviorOptions = {
                    bars: bars,
                    datapoints: dataPoints,
                    clearCatcher: this.clearCatcher,
                };

                this.interactivityService.apply(this, behaviorOptions);
            }

            // This should always be the last line in the render code.
            SVGUtil.flushAllD3TransitionsIfNeeded(this.options);
        }

        public onClearSelection(): void {
            if (this.interactivityService)
                this.interactivityService.clearSelection();
        }

        public accept(visitor: InteractivityVisitor, options: any): void {
            debug.assertValue(visitor, 'visitor');

            visitor.visitWaterfallChart(options);
        }

        public getSupportedCategoryAxisType(): string {
            return axisType.categorical;
        }

        public static getRectTop(scale: D3.Scale.GenericScale<any>, pos: number, value: number): number {
            if (value < 0)
                return scale(pos);
            else
                return scale(pos) - (scale(0) - scale(value));
        }

        private getAvailableWidth(): number {
            return this.currentViewport.width - (this.margin.left + this.margin.right);
        }

        private getAvailableHeight(): number {
            return this.currentViewport.height - (this.margin.top + this.margin.bottom);
        }

        private getSentimentColorsFromObjects(objects: DataViewObjects): WaterfallChartSentimentColors {
            var defaultSentimentColors = this.colors.getSentimentColors();
            var increaseColor = DataViewObjects.getFillColor(objects, waterfallChartProps.sentimentColors.increaseFill, defaultSentimentColors[2].value);
            var decreaseColor = DataViewObjects.getFillColor(objects, waterfallChartProps.sentimentColors.decreaseFill, defaultSentimentColors[0].value);
            var totalColor = DataViewObjects.getFillColor(objects, waterfallChartProps.sentimentColors.totalFill, WaterfallChart.defaultTotalColor);

            return <WaterfallChartSentimentColors> {
                increaseFill: { solid: { color: increaseColor } },
                decreaseFill: { solid: { color: decreaseColor } },
                totalFill: { solid: { color: totalColor } }
            };
        }
    }
}