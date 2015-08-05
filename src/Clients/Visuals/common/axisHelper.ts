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
    import ArrayExtensions = jsCommon.ArrayExtensions;

    // default ranges are for when we have a field chosen for the axis, but no values are returned by the query
    export var fallBackDomain = [0, 10];
    export var fallbackDateDomain = [new Date(2014, 1, 1).getTime(), new Date(2015, 1, 1).getTime()];

    export interface IAxisProperties {
        /** the D3 Scale object */
        scale: D3.Scale.GenericScale<any>;
        /** the D3 Axis object */
        axis: D3.Svg.Axis;
        /** an array of the tick values to display for this axis */
        values: any[];
        /** the D3.Selection that the axis should render to */
        graphicsContext?: D3.Selection;
        /** the ValueType of the column used for this axis */
        axisType: ValueType;
        /** a formatter with appropriate properties configured for this field */
        formatter: IValueFormatter;
        /** the axis title label */
        axisLabel: string;
        /** cartesian axes are either a category or value axis */
        isCategoryAxis: boolean;    
        /** (optional) the max width for category tick label values. used for ellipsis truncation / label rotation. */
        xLabelMaxWidth?: number;
        /** (optional) the thickness of each category on the axis*/
        categoryThickness?: number;
        /** (optional) the outer padding in pixels applied to the D3 scale*/
        outerPadding?: number;
        /** (optional) whether we are using a default domain */
        usingDefaultDomain?: boolean;
    }

    export interface IMargin {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }

    export interface CreateAxisOptions {
        /** the dimension length for the axis, in pixels */
        pixelSpan: number;
        /** the data domain. [min, max] for a scalar axis, or [1...n] index array for ordinal */
        dataDomain: number[];
        /** the DataViewMetadataColumn will be used for dataType and tick value formatting */
        metaDataColumn: DataViewMetadataColumn;
        /** identifies the property for the format string */
        formatStringProp: DataViewObjectPropertyIdentifier;
        /** outerPadding to be applied to the axis */
        outerPadding: number; 
        /** indicates if this is the category axis */
        isCategoryAxis?: boolean;       
        /** if true and the dataType is numeric or dateTime, create a linear axis, else create an ordinal axis */        
        isScalar?: boolean;
        /** (optional) the scale is inverted for a vertical axis, and different optimizations are made for tick labels */
        isVertical?: boolean;
        /** (optional) for visuals that do not need zero (e.g. column/bar) use tickInterval */
        useTickIntervalForDisplayUnits?: boolean;
        /** (optional) combo charts can override the tick count to align y1 and y2 grid lines */
        forcedTickCount?: number;
        /** (optional) callback for looking up actual values from indices, used when formatting tick labels */
        getValueFn?: (index: number, type: ValueType) => any;
        /** (optional) the width/height of each category on the axis */
        categoryThickness?: number;
    }

    export interface CreateScaleResult {
        scale: D3.Scale.GenericScale<any>;
        bestTickCount: number;
        usingDefaultDomain?: boolean;
    }

    export module AxisHelper {
        var XLabelOffsetForOrdinal = 25;
        var XLabelOffsetForNonOrdinal = 10;
        var TextHeightConstant = 10;
        var MinTickCount = 2;
        var DefaultBestTickCount = 3;
        var LeftPadding = 10;

        export function getRecommendedNumberOfTicksForXAxis(availableWidth: number) {
            if (availableWidth < 250)
                return 3;
            if (availableWidth < 500)
                return 5;

            return 8;
        }

        export function getRecommendedNumberOfTicksForYAxis(availableWidth: number) {
            if (availableWidth < 150)
                return 3;
            if (availableWidth < 300)
                return 5;

            return 8;
        }

        /** Get the best number of ticks based on minimum value, maximum value, measure metadata and max tick count. 
          * @min - The minimum of the data domain.
          * @max - The maximum of the data domain.
          * @valuesMetadata - The measure metadata array.
          * @maxTickCount - The max count of intervals.
          * @is100Pct - Whether this is 100 percent chart.
          */
        export function getBestNumberOfTicks(min: number, max: number, valuesMetadata: DataViewMetadataColumn[], maxTickCount: number, isDateTime?: boolean): number {
            debug.assert(maxTickCount >= 0, "maxTickCount must be greater or equal to zero");

            if (isNaN(min) || isNaN(max))
                return DefaultBestTickCount;

            debug.assert(min <= max, "min value needs to be less or equal to max value");

            if (maxTickCount <= 1 || (max <= 1 && min >= -1))
                return maxTickCount;

            if (min === max) {
                // datetime needs to only show one tick value in this case so formatting works correctly
                if (!!isDateTime)
                    return 1;
                return DefaultBestTickCount;
            }

            if (hasNonIntegerData(valuesMetadata))
                return maxTickCount;

            // e.g. 5 - 2 + 1 = 4, => [2,3,4,5]
            return Math.min(max - min + 1, maxTickCount);
        }

        export function hasNonIntegerData(valuesMetadata: DataViewMetadataColumn[]): boolean {
            for (var i = 0, len = valuesMetadata.length; i < len; i++) {
                var currentMetadata = valuesMetadata[i];
                if (currentMetadata && currentMetadata.type && !currentMetadata.type.integer) {
                    return true;
                }
            }

            return false;
        }

        export function getRecommendedTickValues(maxTicks: number,
            scale: D3.Scale.GenericScale<any>,
            axisType: ValueType,
            isScalar: boolean,
            minTickInterval?: number): any[]{

            if (!isScalar || isOrdinalScale(scale)) {
                return getRecommendedTickValuesForAnOrdinalRange(maxTicks, scale.domain());
            }
            else if (isDateTime(axisType)) {
                return getRecommendedTickValuesForADateTimeRange(maxTicks, scale.domain());
            }
            return getRecommendedTickValuesForALinearRange(maxTicks, scale, minTickInterval);
        }

        export function getRecommendedTickValuesForAnOrdinalRange(maxTicks: number, labels: string[]): string[] {
            var tickLabels: string[] = [];

            // return no ticks in this case
            if (maxTicks <= 0)
                return tickLabels;

            var len = labels.length;
            if (maxTicks > len)
                return labels;

            // TODO: Should we do ceil? this could result in more than maxTicks
            // e.g. maxTicks === 6, len === 10, 10 / 6=1.66, floor is 1.0, yielding 10 ticksValues.
            for (var i = 0, step = Math.floor(len / maxTicks); i < len; i += step) {
                tickLabels.push(labels[i]);
            }
            return tickLabels;
        }

        export function getRecommendedTickValuesForALinearRange(maxTicks: number, scale: D3.Scale.GenericScale<any>, minInterval?: number): number[] {
            var tickLabels: number[] = [];

            //if maxticks is zero return none
            if (maxTicks === 0)
                return tickLabels;

            var linearScale = <D3.Scale.LinearScale>scale;
            if (linearScale.ticks) {
                tickLabels = linearScale.ticks(maxTicks);
                if (tickLabels.length > maxTicks && maxTicks > 1)
                    tickLabels = linearScale.ticks(maxTicks - 1);
                if (tickLabels.length < MinTickCount) {
                    tickLabels = linearScale.ticks(maxTicks + 1);
                }
                tickLabels = createTrueZeroTickLabel(tickLabels);

                if (minInterval && tickLabels.length > 1) {
                    var tickInterval = tickLabels[1] - tickLabels[0];
                    while (tickInterval > 0 && tickInterval < minInterval) {
                        for (var i = 1; i < tickLabels.length; i++) {
                            tickLabels.splice(i, 1);
                        }

                        tickInterval = tickInterval * 2;
                    }
                    // keep at least two labels - the loop above may trim all but one if we have odd # of tick labels and dynamic range < minInterval
                    if (tickLabels.length === 1) {
                        tickLabels.push(tickLabels[0] + minInterval);
                    }
                }

                return tickLabels;
            }

            debug.assertFail('must pass a linear scale to this method');
            return tickLabels;
        }

        /** Round out very small zero tick values (e.g. -1e-33 becomes 0)
          * @ticks - array of numbers (from d3.scale.ticks([maxTicks]))
          * @epsilon - (optional) max ratio of calculated tick interval which we will recognize as zero
          * e.g.
          *     ticks = [-2, -1, 1e-10, 3, 4]; epsilon = 1e-5;
          *     closeZero = 1e-5 * | 2 - 1 | = 1e-5
          *     // Tick values <= 1e-5 replaced with 0
          *     return [-2, -1, 0, 3, 4];
          */
        function createTrueZeroTickLabel(ticks: number[], epsilon: number = 1e-5): number[]{
            if (!ticks || ticks.length < 2)
                return ticks;

            var closeZero = epsilon * Math.abs(ticks[1] - ticks[0]);

            return ticks.map((tick) => Math.abs(tick) <= closeZero ? 0 : tick);
        }

        function getRecommendedTickValuesForADateTimeRange(maxTicks: number, dataDomain: number[]): number[] {
            var tickLabels: number[] = [];

            var dateTimeTickLabels = DateTimeSequence.calculate(new Date(dataDomain[0]), new Date(dataDomain[1]), maxTicks).sequence;
            tickLabels = dateTimeTickLabels.map(d => d.getTime());
            tickLabels = ensureValuesInRange(tickLabels, dataDomain[0], dataDomain[1]);
            return tickLabels;
        }

        export function normalizeLinearDomain(domain: NumberRange): NumberRange {
            if (isNaN(domain.min) || isNaN(domain.max)) {
                domain.min = fallBackDomain[0];
                domain.max = fallBackDomain[1];
            }
            else if (domain.min === 0 && domain.max === 0) {
                domain.max = fallBackDomain[1]; // default
            }
            else if (domain.min === domain.max) {
                // d3 linear scale will give zero tickValues if max === min, so extend a little
                domain.min = domain.min < 0 ? domain.min * 1.2 : domain.min * 0.8;
                domain.max = domain.max < 0 ? domain.max * 0.8 : domain.max * 1.2;
            }
            else {
                // Check that min is very small and is a negligable portion of the whole domain.
                // (fix floating pt precision bugs)
                // sometimes highlight value math causes small negative numbers which makes the axis add
                // a large tick interval instead of just rendering at zero.
                if (Math.abs(domain.min) < 0.0001 && domain.min / (domain.max - domain.min) < 0.0001) {
                    domain.min = 0;
                }
            }

            return domain;
        }

        export function getMargin(availableWidth: number, availableHeight: number, xMargin: number, yMargin: number): IMargin {
            if (getRecommendedNumberOfTicksForXAxis(availableWidth - xMargin) === 0
                || getRecommendedNumberOfTicksForYAxis(availableHeight - yMargin) === 0) {
                return {
                    top: 0,
                    right: xMargin,
                    bottom: yMargin,
                    left: 0
                };
            }

            return {
                top: 20,
                right: 30,
                bottom: 40,
                left: 30
            };
        }        

        export function getTickLabelMargins(//todo: Put the parameters into one object
            viewport: IViewport,
            leftMarginLimit: number,
            textMeasurer: (textProperties) => number,
            xAxisProperties: IAxisProperties,
            y1AxisProperties: IAxisProperties,
            rotateX: boolean,
            maxHeight: number,
            properties: TextProperties,
            y2AxisProperties?: IAxisProperties,
            scrollbarVisible?: boolean,
            showOnRight?: boolean,
            renderXAxis?: boolean,
            renderYAxes?: boolean,
            renderY2Axis?: boolean) {

            debug.assertValue(viewport, 'viewport');
            debug.assertValue(textMeasurer, 'textMeasurer');
            debug.assertValue(xAxisProperties, 'xAxis');
            debug.assertValue(y1AxisProperties, 'yAxis');

            var xLabels = xAxisProperties.values;
            var yLeftLabels = y1AxisProperties.values;
            var xAxisType = xAxisProperties.axisType;

            var maxLeft = 0;
            var maxRight = 0;
            var xMax = 0;
            var labelOffset = isOrdinal(xAxisType) ? XLabelOffsetForOrdinal : XLabelOffsetForNonOrdinal;
            var xLabelPadding = 0;

            if (xAxisProperties.xLabelMaxWidth !== undefined) {
                xLabelPadding = Math.max(0, (viewport.width - xAxisProperties.xLabelMaxWidth * xLabels.length) / 2);
            }

            if (getRecommendedNumberOfTicksForXAxis(viewport.width) !== 0
                || getRecommendedNumberOfTicksForYAxis(viewport.height) !== 0) {
                var rotation;
                if (scrollbarVisible)
                    rotation = LabelLayoutStrategy.DefaultRotationWithScrollbar;
                else
                    rotation = LabelLayoutStrategy.DefaultRotation;                     

                for (var i = 0, len = yLeftLabels.length; i < len; i++) {
                    properties.text = yLeftLabels[i];
                    maxLeft = Math.max(maxLeft, textMeasurer(properties));
                }

                if (y2AxisProperties) {
                    var yRightLabels = y2AxisProperties.values;
                    for (var i = 0, len = yRightLabels.length; i < len; i++) {
                        properties.text = yRightLabels[i];
                        maxRight = Math.max(maxRight, textMeasurer(properties));
                    }
                }

                for (var i = 0, len = xLabels.length; i < len; i++) {
                    var height: number;
                    properties.text = xLabels[i];
                    var size = textMeasurer(properties);
                    if (rotateX) {
                        height = size * rotation.sine;
                    }
                    else {
                        height = TextHeightConstant;

                        // Account for wide X label
                        if (i === 0) {
                            var width = (size / 2) - labelOffset - xLabelPadding;
                            maxLeft = Math.max(maxLeft, width);
                        } else if (i === len - 1) {
                            var width = (size / 2);
                            maxRight = Math.max(maxRight, width);
                        }
                    }

                    xMax = Math.max(xMax, height);
                };
            }

            if (showOnRight) {
                var temp = maxLeft;
                maxLeft = maxRight;
                maxRight = temp;
            }

            var calulatedMargins = {
                xMax: Math.min(maxHeight, Math.ceil(xMax)),
                yLeft: Math.min(Math.ceil(maxLeft), leftMarginLimit),
                yRight: Math.ceil(maxRight),
            };

            //*******Adjust the axes based on if it's turn on or not
            if (!renderYAxes) {
                calulatedMargins.yLeft = 0;
                calulatedMargins.yRight = 0;
            }

            if (!renderY2Axis && showOnRight) {
                calulatedMargins.yLeft = 0;
            }

            if (!renderY2Axis && !showOnRight) {
                calulatedMargins.yRight = 0;
            }
            if (!renderXAxis) {
                calulatedMargins.xMax = 0;
            }
            //*******

            return calulatedMargins;
        }

        export function columnDataTypeHasValue(dataType: ValueType) {
            return dataType && (dataType.bool || dataType.numeric || dataType.text || dataType.dateTime);
        }

        export function createOrdinalType(): ValueType {
            return ValueType.fromDescriptor({ text: true });
        }

        export function isOrdinal(type: ValueType): boolean {
            return !!(type && (type.text || type.bool));
        }

        export function isOrdinalScale(scale: any): boolean {
            return typeof scale.invert === 'undefined';
        }

        export function isDateTime(type: ValueType): boolean {
            return !!(type && type.dateTime);
        }

        export function invertScale(scale: any, x) {
            if (isOrdinalScale(scale)) {
                return invertOrdinalScale(scale, x);
            }
            return scale.invert(x);
        }

        export function extent(scale: any): number[] {
            if (isOrdinalScale(scale)) {
                return scale.rangeExtent();
            }
            return scale.range();
        }

        export function invertOrdinalScale(scale: D3.Scale.OrdinalScale, x: number) {
            var leftEdges = scale.range();
            var width = scale.rangeBand();
            var j;
            for (j = 0; x > (leftEdges[j] + width) && (leftEdges.length - 1) > j; j++)
                ;
            return scale.domain()[j];
        }

        export function getOrdinalScaleClosestDataPointIndex(scale: D3.Scale.OrdinalScale, x: number) {
            var index: number = 0;
            var range = scale.range();
            var distance: number = Math.abs(x - range[0]);

            for (var j = 1; j < range.length; j++) {
                var currentDistance = Math.abs(x - range[j]);
                if (distance > currentDistance) {
                    distance = currentDistance;
                    index = j;
                }
            }

            return index;
        }

        export function diffScaled(
            scale: D3.Scale.GenericScale<any>,
            value1: any,
            value2: any): number {
            debug.assertValue(scale, 'scale');

            var value: number = scale(value1) - scale(value2);
            if (value === 0)
                return 0;

            if (value < 0)
                return Math.min(value, -1);
            return Math.max(value, 1);
        }

        export function createDomain(data: CartesianSeries[], axisType: ValueType, isScalar: boolean, forcedScalarDomain: any[]): number[]{
            var userMin, userMax;
            if (forcedScalarDomain && forcedScalarDomain.length === 2
                && forcedScalarDomain[0] != null && forcedScalarDomain[1] != null) {
                userMin = forcedScalarDomain[0];
                userMax = forcedScalarDomain[1];
            }
            if (isScalar && !isOrdinal(axisType))
                return createScalarDomain(data, userMin, userMax, axisType);
            return createOrdinalDomain(data);
        }

        export function ensureValuesInRange(values: number[], min: number, max: number): number[] {
            debug.assert(min <= max, "min must be less or equal to max");
            var filteredValues = values.filter(v => v >= min && v <= max);
            if (filteredValues.length < 2)
                filteredValues = [min, max];
            return filteredValues;
        }

        /** Gets the ValueType of a category column, defaults to Text if the type is not present. */
        export function getCategoryValueType(metadataColumn: DataViewMetadataColumn, isScalar?: boolean): ValueType {
            if (metadataColumn && columnDataTypeHasValue(metadataColumn.type))
                return metadataColumn.type;

            if (isScalar) {
                return ValueType.fromDescriptor({ numeric: true });
            }
            
            return ValueType.fromDescriptor({ text: true });
        }

        /**
         * Create a D3 axis including scale. Can be vertical or horizontal, and either datetime, numeric, or text.
         * @param {CreateAxisOptions} options the properties used to create the axis
         */
        export function createAxis(options: CreateAxisOptions): IAxisProperties {
            var pixelSpan = options.pixelSpan,
                dataDomain = options.dataDomain,
                metaDataColumn = options.metaDataColumn,
                formatStringProp = options.formatStringProp,
                outerPadding = options.outerPadding || 0,
                isCategoryAxis = !!options.isCategoryAxis,
                isScalar = !!options.isScalar,
                isVertical = !!options.isVertical,
                useTickIntervalForDisplayUnits = !!options.useTickIntervalForDisplayUnits, // DEPRECATE: same meaning as isScalar?
                getValueFn = options.getValueFn,
                categoryThickness = options.categoryThickness;

            var formatString = valueFormatter.getFormatString(metaDataColumn, formatStringProp);
            var dataType: ValueType = this.getCategoryValueType(metaDataColumn, isScalar);

            // Create the Scale
            var scaleResult: CreateScaleResult = this.createScale(options);
            var scale = scaleResult.scale;
            var bestTickCount = scaleResult.bestTickCount;
            var scaleDomain = scale.domain();

            // fix categoryThickness if scalar and the domain was adjusted
            if (categoryThickness && isScalar && dataDomain && dataDomain.length === 2) {
                var oldSpan = dataDomain[1] - dataDomain[0];
                var newSpan = scaleDomain[1] - scaleDomain[0];
                if (oldSpan > 0 && newSpan > 0) {
                    categoryThickness = categoryThickness * oldSpan / newSpan;
                }
            }

            // Prepare Tick Values for formatting
            var tickValues: any[];
            if (isScalar && bestTickCount === 1) {
                tickValues = [dataDomain[0]];
            }
            else {
                var minTickInterval = isScalar ? getMinTickValueInterval(formatString, dataType) : undefined;
                tickValues = getRecommendedTickValues(bestTickCount, scale, dataType, isScalar, minTickInterval);
            }

            var formatter = createFormatter(
                scaleDomain,
                dataDomain,
                dataType,
                isScalar,
                formatString,
                bestTickCount,
                tickValues,
                getValueFn,
                useTickIntervalForDisplayUnits);

            // sets default orientation only, cartesianChart will fix y2 for comboChart
            // tickSize(pixelSpan) is used to create gridLines
            var axis = d3.svg.axis()
                .scale(scale)
                .tickSize(6, 0)
                .orient(isVertical ? 'left' : 'bottom')
                .ticks(bestTickCount)
                .tickValues(tickValues);

            var formattedTickValues = [];
            if (metaDataColumn)
                formattedTickValues = formatAxisTickValues(axis, tickValues, formatter, dataType, isScalar, getValueFn);

            // Use category layout of labels if specified, otherwise use scalar layout of labels
            if (!isScalar && categoryThickness) {
                xLabelMaxWidth = categoryThickness;
            }
            else {
                // When there are 0 or 1 ticks, then xLabelMaxWidth = pixelSpan       
                // When there is > 1 ticks then we need to +1 so that their widths don't overlap
                // Example: 2 ticks are drawn at 33.33% and 66.66%, their width needs to be 33.33% so they don't overlap.
                var labelAreaCount = tickValues.length > 1 ? tickValues.length + 1 : tickValues.length;
                var xLabelMaxWidth = labelAreaCount > 1 ? pixelSpan / labelAreaCount : pixelSpan;
            }

            return {
                scale: scale,
                axis: axis,
                formatter: formatter,
                values: formattedTickValues,
                axisType: dataType,
                axisLabel: null,
                isCategoryAxis: isCategoryAxis,
                xLabelMaxWidth: xLabelMaxWidth,
                categoryThickness: categoryThickness,
                outerPadding: outerPadding,
                usingDefaultDomain: scaleResult.usingDefaultDomain,
            };
        }

        export function createScale(options: CreateAxisOptions): CreateScaleResult {
            var pixelSpan = options.pixelSpan,
                dataDomain = options.dataDomain,
                metaDataColumn = options.metaDataColumn,
                outerPadding = options.outerPadding || 0,
                isScalar = !!options.isScalar,
                isVertical = !!options.isVertical,
                forcedTickCount = options.forcedTickCount,
                categoryThickness = options.categoryThickness;

            var dataType: ValueType = this.getCategoryValueType(metaDataColumn, isScalar);
            var maxTicks = isVertical ? getRecommendedNumberOfTicksForYAxis(pixelSpan) : getRecommendedNumberOfTicksForXAxis(pixelSpan);
            var scalarDomain = dataDomain ? dataDomain.slice() : null;
            var bestTickCount = maxTicks;
            var scale: D3.Scale.GenericScale<any>;
            var usingDefaultDomain = false;

            // using double-equals null intentionally, also checks undefined.
            if (dataDomain == null || (dataDomain.length === 2 && dataDomain[0] == null && dataDomain[1] == null) || (dataDomain.length !== 2 && isScalar)) {
                usingDefaultDomain = true;

                if (dataType.dateTime)
                    dataDomain = fallbackDateDomain;
                else if (!isOrdinal(dataType))
                    dataDomain = fallBackDomain;
                else //ordinal
                    dataDomain = [];

                if (isOrdinal(dataType)) {
                    scale = createOrdinalScale(pixelSpan, dataDomain, categoryThickness ? outerPadding / categoryThickness : 0);
                }
                else {
                    scale = createLinearScale(pixelSpan, dataDomain, outerPadding, bestTickCount);
                }
            }
            else {
                if (isScalar && dataDomain.length > 0) {
                    bestTickCount = forcedTickCount !== undefined
                        ? (maxTicks !== 0 ? forcedTickCount : 0)
                        : AxisHelper.getBestNumberOfTicks(dataDomain[0], dataDomain[dataDomain.length - 1], [metaDataColumn], maxTicks, dataType.dateTime);
                    var normalizedRange = AxisHelper.normalizeLinearDomain({ min: dataDomain[0], max: dataDomain[dataDomain.length - 1] });
                    scalarDomain = [normalizedRange.min, normalizedRange.max];
                }

                if (isScalar && dataType.numeric && !dataType.dateTime) {
                    scale = createLinearScale(pixelSpan, scalarDomain, outerPadding, bestTickCount);
                }
                else if (isScalar && dataType.dateTime) {
                    // Use of a linear scale, instead of a D3.time.scale, is intentional since we want
                    // to control the formatting of the time values, since d3's implementation isn't
                    // in accordance to our design.
                    //     scalarDomain: should already be in long-int time (via category.values[0].getTime())
                    scale = createLinearScale(pixelSpan, scalarDomain, outerPadding, null); // DO NOT PASS TICKCOUNT
                }
                else if (dataType.text || dataType.dateTime || dataType.numeric || dataType.bool) {
                    scale = createOrdinalScale(pixelSpan, scalarDomain, categoryThickness ? outerPadding / categoryThickness : 0);
                    bestTickCount = maxTicks === 0 ? 0
                        : Math.min(
                            scalarDomain.length,
                            (pixelSpan - outerPadding * 2) / CartesianChart.MinOrdinalRectThickness);
                }
                else {
                    debug.assertFail('unsupported dataType, something other than text or numeric');
                }
            }

            // vertical ordinal axis (e.g. categorical bar chart) does not need to reverse
            if (isVertical && isScalar) {
                scale.range(scale.range().reverse());
            }

            ColumnUtil.normalizeInfinityInScale(scale);
            return {
                scale: scale,
                bestTickCount: bestTickCount,
                usingDefaultDomain: usingDefaultDomain,
            };
        }

        function createFormatter(
            scaleDomain: any[],
            dataDomain: any[],
            dataType,
            isScalar: boolean,
            formatString: string,
            bestTickCount: number,
            tickValues: any[],
            getValueFn: any,
            useTickIntervalForDisplayUnits: boolean = false): IValueFormatter {

            var formatter: IValueFormatter;
            if (dataType.dateTime) {
                if (isScalar) {
                    var value = new Date(scaleDomain[0]);
                    var value2 = new Date(scaleDomain[1]);
                    // datetime with only one value needs to pass the same value
                    // (from the original dataDomain value, not the adjusted scaleDomain)
                    // so formatting works correctly.
                    if (bestTickCount === 1)
                        value = value2 = new Date(dataDomain[0]);
                    formatter = valueFormatter.create({ format: formatString, value: value, value2: value2, tickCount: bestTickCount });
                }
                else {
                    if (getValueFn == null) {
                        debug.assertFail('getValueFn must be supplied for ordinal datetime tickValues');
                    }
                    var minDate: Date = getValueFn(0, dataType);
                    var maxDate: Date = getValueFn(scaleDomain.length - 1, dataType);
                    formatter = valueFormatter.create({ format: formatString, value: minDate, value2: maxDate, tickCount: bestTickCount });
                }
            }
            else {
                if (getValueFn == null && !isScalar) {
                    debug.assertFail('getValueFn must be supplied for ordinal tickValues');
                }
                if (useTickIntervalForDisplayUnits && isScalar && tickValues.length > 1) {
                    var domainMin = tickValues[1] - tickValues[0];
                    var domainMax = 0; //force tickInterval to be used with display units
                    formatter = valueFormatter.create({ format: formatString, value: domainMin, value2: domainMax, allowFormatBeautification: true });
                }
                else {
                    // do not use display units, just the basic value formatter
                    // datetime is handled above, so we are ordinal and either boolean, numeric, or text.
                    formatter = valueFormatter.createDefaultFormatter(formatString, true);
                }
            }

            return formatter;
        }

        // format the linear tick labels or the category labels
        export function formatAxisTickValues(
            axis: D3.Svg.Axis,
            tickValues: any[],
            formatter: IValueFormatter,
            dataType: ValueType,
            isScalar: boolean,
            getValueFn?: (index: number, type: ValueType) => any) {

            var formattedTickValues = [];
            if (formatter) {
                // getValueFn takes an ordinal axis index or builds DateTime from milliseconds, do not pass a numeric scalar value.
                if (getValueFn && !(dataType.numeric && isScalar)) {
                    axis.tickFormat(d => formatter.format(getValueFn(d, dataType)));
                    formattedTickValues = tickValues.map(d => formatter.format(getValueFn(d, dataType)));
                }
                else {
                    axis.tickFormat(d => formatter.format(d));
                    formattedTickValues = tickValues.map((d) => formatter.format(d));
                }
            }
            else {
                formattedTickValues = tickValues.map((d) => getValueFn(d, dataType));
            }

            return formattedTickValues;
        }

        export function getMinTickValueInterval(formatString: string, columnType: ValueType): number {
            var isCustomFormat = formatString && !powerbi.NumberFormat.isStandardFormat(formatString);
            if (isCustomFormat) {
                var precision = powerbi.NumberFormat.getCustomFormatMetadata(formatString, isCustomFormat).precision;
                return Math.pow(10, -precision);
            }
            else if (columnType.integer)
                return 1;

            return 0;
        }

        function createScalarDomain(data: CartesianSeries[], userMin: DataViewPropertyValue, userMax: DataViewPropertyValue, axisType: ValueType): number[] {
            debug.assertValue(data, 'data');
            if (data.length === 0) {
                return null;
            }

            var defaultMinX = <number>d3.min(data,(kv) => { return d3.min(kv.data, d => { return d.categoryValue; }); });
            var defaultMaxX = <number>d3.max(data,(kv) => { return d3.max(kv.data, d => { return d.categoryValue; }); });

            var minX, maxX;

            if (typeof userMin === 'number') {
                minX = userMin;
            }
            else {
                minX = defaultMinX;
            }

            if (typeof userMax === 'number') {
                maxX = userMax;
            }
            else {
                maxX = defaultMaxX;
            }

            //edge case
            if (minX > maxX) {
                //take the default, only adjust when it makes sense
                minX = defaultMinX;
                maxX = defaultMaxX;
            }
                 
           
            return [minX, maxX];
        }

        /**
         * createValueDomain - creates a [min,max] from your Cartiesian data values
         * @param {CartesianSeries[]} data the series array of CartesianDataPoints
         * @param {boolean} includeZero columns and bars includeZero, line and scatter do not.
         */
        export function createValueDomain(data: CartesianSeries[], includeZero: boolean): number[] {
            debug.assertValue(data, 'data');
            if (data.length === 0)
                return null;

            var minY = <number>d3.min(data,(kv) => { return d3.min(kv.data, d => { return d.value; }); });
            var maxY = <number>d3.max(data,(kv) => { return d3.max(kv.data, d => { return d.value; }); });

            if (includeZero)
                return [Math.min(minY, 0), Math.max(maxY, 0)];
            return [minY, maxY];
        }

        function createOrdinalDomain(data: CartesianSeries[]): number[] {
            if (ArrayExtensions.isUndefinedOrEmpty(data))
                return [];

            return data[0].data.map(d => d.categoryIndex);
        }

        export module LabelLayoutStrategy {
            export function willRotate(
                axisProperties: IAxisProperties,
                availableWidth: number,
                textMeasurer: ITextAsSVGMeasurer,
                properties: TextProperties) {

                var labels = axisProperties.values;
                if (labels.length === 0)
                    return false;

                var labelMaxWidth = axisProperties.xLabelMaxWidth !== undefined
                    ? axisProperties.xLabelMaxWidth
                    : availableWidth / labels.length;

                return labels.some(d => {
                    properties.text = d;
                    return textMeasurer(properties) > labelMaxWidth;
                });
            }

            export var DefaultRotation = {
                sine: Math.sin(Math.PI * (35 / 180)),
                cosine: Math.cos(Math.PI * (35 / 180)),
                tangent: Math.tan(Math.PI * (35 / 180)),
                transform: 'rotate(-35)',
                dy: '-0.5em',
            };

            export var DefaultRotationWithScrollbar = {
                sine: Math.sin(Math.PI * (90 / 180)),
                cosine: Math.cos(Math.PI * (90 / 180)),
                tangent: Math.tan(Math.PI * (90 / 180)),
                transform: 'rotate(-90)',
                dy: '-0.8em',
            };

            export function rotate(
                text: D3.Selection,
                availableWidth: number,
                maxBottomMargin: number,
                svgEllipsis: (textElement: SVGTextElement, maxWidth: number) => void,
                needRotate: boolean,
                needEllipsis: boolean,
                axisProperties: IAxisProperties,
                margin: IMargin,
                scrollbarVisible: boolean) {

                var rotatedLength;
                var defaultRotation: any;

                if (scrollbarVisible) 
                    defaultRotation = DefaultRotationWithScrollbar;               
                else
                    defaultRotation = DefaultRotation;  

                if (needRotate) {
                    rotatedLength = maxBottomMargin / defaultRotation.sine;
                }

                text.each(function () {
                    var text = d3.select(this);
                    if (needRotate) {
                        var textContentIndex = axisProperties.values.indexOf(this.textContent);
                        var allowedLengthProjectedOnXAxis =
                            // Left margin is the width of Y axis.
                            margin.left
                            // There could be a padding before the first category.
                            + axisProperties.outerPadding
                            // Align the rotated text's top right corner to the middle of the corresponding category first.
                            + axisProperties.categoryThickness * (textContentIndex + 0.5);

                        // Subtracting the left padding space from the allowed length.
                        if (!scrollbarVisible)
                            allowedLengthProjectedOnXAxis -= LeftPadding;

                        var allowedLength = allowedLengthProjectedOnXAxis / defaultRotation.cosine;
                        if (needEllipsis || (allowedLength < rotatedLength)) {
                            svgEllipsis(text[0][0], Math.min(allowedLength, rotatedLength));
                        }
                        text.style('text-anchor', 'end')
                            .attr(
                            {
                                'dx': '-0.5em',
                                'dy': defaultRotation.dy,
                                'transform': defaultRotation.transform
                            });
                    } else {
                        text.style('text-anchor', 'middle')
                            .attr(
                            {
                                'dx': '0em',
                                'dy': '1em',
                                'transform': 'rotate(0)'
                            });
                    }
                });
            }

            export function clip(text: D3.Selection, availableWidth: number, svgEllipsis: (textElement: SVGTextElement, maxWidth: number) => void) {
                if (text.size() === 0)
                    return;

                text.each(function () {
                    var text = d3.select(this);
                    svgEllipsis(text[0][0], availableWidth);
                });
            }

        }

        export module ToolTip {
            var calloutHtml =
                '<div class="callout triangle-border ms-font-mi">' +
                '<div class="textArea"/>' +
                '</div>';

            export function createCallout(): JQuery {
                return $(calloutHtml);
            }

            export function clearCallout(callout: JQuery): void {
                callout.find('.destroyme').remove();
            }

            export function renderCallout(callout: JQuery, x: number, rangeEnd: number, leftMargin: number) {
                var calloutBleed = 0;
                var calloutWidth = callout.width();
                var calloutHalfWidth = calloutWidth / 2;
                var xOffset = (leftMargin - calloutHalfWidth) - 10;
                var innerTriangleOffset = 2;
                var left: number;
                var triangleLeftBefore: number;
                var triangleLeftAfter: number;

                if (x + (calloutHalfWidth - calloutBleed) > rangeEnd) {
                    left = (rangeEnd + xOffset - (calloutHalfWidth - calloutBleed));
                    triangleLeftBefore = ((calloutWidth - innerTriangleOffset - calloutBleed) - (rangeEnd - x));
                    triangleLeftAfter = ((calloutWidth - calloutBleed) - (rangeEnd - x));

                } else if (x > (calloutHalfWidth - calloutBleed)) {
                    left = (x + xOffset);
                    triangleLeftBefore = (calloutHalfWidth - innerTriangleOffset);
                    triangleLeftAfter = (calloutHalfWidth);
                }
                else {
                    left = (calloutHalfWidth - calloutBleed) + xOffset;
                    triangleLeftBefore = (x + calloutBleed - innerTriangleOffset);
                    triangleLeftAfter = (x + calloutBleed);
                }
                renderCalloutImpl(callout, left, triangleLeftBefore, triangleLeftAfter);
            }

            function renderCalloutImpl(callout: JQuery, left: number, triangleLeftBefore: number, triangleLeftAfter: number) {
                callout.css('left', left + 'px');
                callout.find('.destroyme').remove();
                callout.append('<style class="destroyme">.triangle-border:before{left:' + triangleLeftBefore + 'px;}</style>');
                callout.append('<style class="destroyme">.triangle-border:after{left:' + triangleLeftAfter + 'px;}</style>');
            }
        }

        export function createOrdinalScale(pixelSpan: number, dataDomain: any[], outerPaddingRatio: number = 0): D3.Scale.OrdinalScale {
            debug.assert(outerPaddingRatio >= 0 && outerPaddingRatio < 4, 'outerPaddingRatio should be a value between zero and four');
            var scale = d3.scale.ordinal()
                /* Avoid using rangeRoundBands here as it is adding some extra padding to the axis*/
                .rangeBands([0, pixelSpan], CartesianChart.InnerPaddingRatio, outerPaddingRatio)
                .domain(dataDomain);
            return scale;
        }

        export function createLinearScale(pixelSpan: number, dataDomain: any[], outerPadding: number = 0, niceCount?: number): D3.Scale.LinearScale {
            var scale = d3.scale.linear()
                .range([outerPadding, pixelSpan - outerPadding])
                .domain([dataDomain[0], dataDomain[1]]);
            // .nice(undefined) still modifies the scale boundaries, and for datetime this messes things up.
            // we use millisecond ticks since epoch for datetime, so we don't want any "nice" with numbers like 17398203392.
            if (niceCount) {
                scale.nice(niceCount);
            }
            return scale;
        }
        
        export function getRangeForColumn(sizeColumn: DataViewValueColumn): NumberRange {
            var result: NumberRange = {};
            if (sizeColumn) {
                result.min = sizeColumn.min == null
                    ? sizeColumn.minLocal == null ? d3.min(sizeColumn.values) : sizeColumn.minLocal
                    : sizeColumn.min;
                result.max = sizeColumn.max == null
                    ? sizeColumn.maxLocal == null ? d3.max(sizeColumn.values) : sizeColumn.maxLocal
                    : sizeColumn.max;
            }
            return result;
        }

        //set customized domain, but don't change when nothing is set
        export function applyCustomizedDomain(customizedDomain, forcedDomain: any[]): any[] {
            var domain: any[] = [undefined, undefined];

            if (forcedDomain && forcedDomain.length === 2) {
                domain = [forcedDomain[0], forcedDomain[1]];
            }

            if (customizedDomain && customizedDomain.length === 2) {
                if (customizedDomain[0] != null) {
                    domain[0] = customizedDomain[0];
                }
                if (customizedDomain[1] != null) {
                    domain[1] = customizedDomain[1];
                }
            }

            if (domain[0] == null && domain[1] == null) {
                return forcedDomain;//return untouched object
            }

            //do extra check to see if the user input was valid with the merged axis values.
            if (domain[0] != null && domain[1] != null) {
                if (domain[0] > domain[1]) {
                    return forcedDomain;
                }
            }

            return domain;
        }

        //combine the forced domain with the actual domain if one of the values was set
        export function combineDomain(forcedDomain: any[], domain: any[]): any[]{
            var combinedDomain: any[] = domain ? [domain[0],domain[1]] : [];
            if (forcedDomain && forcedDomain.length === 2) {
                if (forcedDomain[0] != null) {
                    combinedDomain[0] = forcedDomain[0];
                }
                if (forcedDomain[1] != null) {
                    combinedDomain[1] = forcedDomain[1];
                }
                if (combinedDomain[0] > combinedDomain[1]) {
                    combinedDomain = domain;//this is invalid, so take the original domain
                }                
            }
            return combinedDomain;
        }

        export function createAxisLabel(properties: DataViewObject, label: string, unitType: string): string {  
            if (!properties || !properties['axisStyle']) {
                return label;
            }

            var modifiedLabel;
            if (properties['axisStyle'] === axisStyle.showBoth) {
                modifiedLabel = label + ' (' + unitType + ')';//todo: localize
            }
            else if (properties['axisStyle'] === axisStyle.showUnitOnly) {
                modifiedLabel = unitType;
            }
            else {
                modifiedLabel = label;
            }
            return modifiedLabel;
        }

        export function scaleShouldClamp(combinedDomain: any[], domain: any[]): boolean {
            if (!combinedDomain || !domain || combinedDomain.length < 2 || domain.length < 2)
                return false;
            //when the start or end is different, clamp it
            return combinedDomain[0] !== domain[0] || combinedDomain[1] !== domain[1];
        }

        export function normalizeNonFiniteNumber(value: number): number {
            if (isNaN(value))
                return null;
            else if (value === Number.POSITIVE_INFINITY)
                return Number.MAX_VALUE;
            else if (value === Number.NEGATIVE_INFINITY)
                return -Number.MAX_VALUE;

            return value;
        }
    }
}