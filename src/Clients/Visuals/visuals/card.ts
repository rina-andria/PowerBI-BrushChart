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
    export interface CardStyle {
        card: {
            maxFontSize: number;
        };
        label: {
            fontSize: number;
            color: string;
            height: number;
        };
        value: {
            fontSize: number;
            color: string;
            fontFamily: string;
        };
    }

    export interface CardConstructorOptions {
        isScrollable?: boolean;
        displayUnitSystemType?: DisplayUnitSystemType;
        animator?: IGenericAnimator;
    }

    export interface CardFormatSetting {
        showTitle: boolean;
        labelSettings: VisualDataLabelsSettings;
    }

    export class Card extends AnimatedText implements IVisual {
        private static cardClassName: string = 'card';
        private static Label: ClassAndSelector = {
            class: 'label',
            selector: '.label'
        };
        private static Value: ClassAndSelector = {
            class: 'value',
            selector: '.value'
        };
        public static DefaultStyle: CardStyle = {
            card: {
                maxFontSize: 200
            },
            label: {
                fontSize: 16,
                color: '#a6a6a6',
                height: 26
            },
            value: {
                fontSize: 37,
                color: '#333333',
                fontFamily: 'wf_segoe-ui_Semibold'
            }
        };

        private toolTip: D3.Selection;
        private animationOptions: AnimationOptions;
        private displayUnitSystemType: DisplayUnitSystemType;
        private isScrollable: boolean;
        private graphicsContext: D3.Selection;
        private labelContext: D3.Selection;
        private cardFormatSetting: CardFormatSetting;

        public constructor(options?: CardConstructorOptions) {
            super(Card.cardClassName);
            this.isScrollable = false;
            this.displayUnitSystemType = DisplayUnitSystemType.WholeUnits;

            if (options) {
                this.isScrollable = !!options.isScrollable;
                if (options.animator)
                    this.animator = options.animator;
                if (options.displayUnitSystemType != null)
                    this.displayUnitSystemType = options.displayUnitSystemType;
            }
        }

        public init(options: VisualInitOptions) {
            debug.assertValue(options, 'options');
            this.animationOptions = options.animation;
            var element = options.element;

            var svg = this.svg = d3.select(element.get(0)).append('svg');
            this.graphicsContext = svg.append('g');
            this.currentViewport = options.viewport;
            this.hostServices = options.host;
            this.style = options.style;

            this.updateViewportProperties();

            if (this.isScrollable) {
                svg.attr('class', Card.cardClassName);
                this.labelContext = svg.append('g');
            }
        }

        public onDataChanged(options: VisualDataChangedOptions): void {
            debug.assertValue(options, 'options');

            //Default settings for reset to default
            this.cardFormatSetting = this.getDefaultFormatSettings();

            var dataView = options.dataViews[0];
            var value: any;
            if (dataView) {
                this.getMetaDataColumn(dataView);
                if (dataView.single) {
                    value = dataView.single.value;
                }

                var dataViewMetadata = dataView.metadata;
                if (dataViewMetadata) {
                    var objects: DataViewObjects = dataViewMetadata.objects;
                    if (objects) {
                        var labelSettings = this.cardFormatSetting.labelSettings;

                        labelSettings.labelColor = DataViewObjects.getFillColor(dataView.metadata.objects, cardProps.labels.color, labelSettings.labelColor);
                        labelSettings.precision = DataViewObjects.getValue(dataView.metadata.objects, cardProps.labels.labelPrecision, labelSettings.precision);

                        // The precision can't go below 0
                        if (labelSettings.precision != null) {
                            labelSettings.precision = (labelSettings.precision >= 0) ? labelSettings.precision : 0;
                        }

                        labelSettings.displayUnits = DataViewObjects.getValue(dataView.metadata.objects, cardProps.labels.labelDisplayUnits, labelSettings.displayUnits);
                        this.cardFormatSetting.showTitle = DataViewObjects.getValue(dataView.metadata.objects, cardProps.cardTitle.show, this.cardFormatSetting.showTitle);
                    }
                }
            }

            this.updateInternal(value, true /* suppressAnimations */, true /* forceUpdate */);
        }

        public onResizing(viewport: IViewport): void {
            this.currentViewport = viewport;
            this.updateViewportProperties();
            this.updateInternal(this.value, true /* suppressAnimations */, true /* forceUpdate */);
        }

        private updateViewportProperties() {
            var viewport = this.currentViewport;
            this.svg.attr('width', viewport.width)
                .attr('height', viewport.height);
        }

        public getAdjustedFontHeight(availableWidth: number, textToMeasure: string, seedFontHeight: number) {
            var adjustedFontHeight = super.getAdjustedFontHeight(availableWidth, textToMeasure, seedFontHeight);

            return Math.min(adjustedFontHeight, Card.DefaultStyle.card.maxFontSize);
        }

        public clear(valueOnly: boolean = false) {
            this.svg.select(Card.Value.selector).text('');

            if (!valueOnly)
                this.svg.select(Card.Label.selector).text('');

            super.clear();
        }

        private updateInternal(target: any, suppressAnimations: boolean, forceUpdate: boolean = false) {
            var start = this.value;
            var duration = AnimatorCommon.GetAnimationDuration(this.animator, suppressAnimations);

            if (target === undefined) {
                if (start !== undefined)
                    this.clear();
                return;
            }

            var metaDataColumn = this.metaDataColumn;
            var labelSettings = this.cardFormatSetting.labelSettings;
            var formatter = valueFormatter.create({
                format: this.getFormatString(metaDataColumn),
                value: labelSettings.displayUnits === 0 ? target : labelSettings.displayUnits,
                precision: labelSettings.precision,
                displayUnitSystemType: labelSettings.displayUnits === 0 && labelSettings.precision === 0 ? this.displayUnitSystemType : DisplayUnitSystemType.WholeUnits, // keeps this.displayUnitSystemType as the displayUnitSystemType unless the user changed the displayUnits or the precision
                formatSingleValues: false,
                allowFormatBeautification: true,
                columnType: metaDataColumn ? metaDataColumn.type : undefined
            });

            if (this.isScrollable) {

                if (!forceUpdate && start === target)
                    return;

                var label: string;
                var labelStyles = Card.DefaultStyle.label;
                var valueStyles = Card.DefaultStyle.value;
                var formatSettings = this.cardFormatSetting;

                if (start !== target) {
                    target = formatter.format(target);
                }

                if (metaDataColumn)
                    label = metaDataColumn.displayName;

                var translateX = this.getTranslateX(this.currentViewport.width);
                var translateY = (this.currentViewport.height - labelStyles.height - valueStyles.fontSize) / 2;

                var valueElement = this.graphicsContext
                    .attr('transform', SVGUtil.translate(translateX, this.getTranslateY(valueStyles.fontSize + translateY)))
                    .selectAll('text')
                    .data([target]);

                valueElement
                    .enter()
                    .append('text')
                    .attr('class', Card.Value.class);

                valueElement
                    .text((d: any) => d)
                    .style({
                        'font-size': valueStyles.fontSize + 'px',
                        'fill': labelSettings.labelColor,
                        'font-family': valueStyles.fontFamily,
                        'text-anchor': this.getTextAnchor()
                    });

                valueElement.call(AxisHelper.LabelLayoutStrategy.clip,
                    this.currentViewport.width,
                    TextMeasurementService.svgEllipsis);

                valueElement.exit().remove();

                var labelData = formatSettings.showTitle
                    ? [label]
                    : [];

                var labelElement = this.labelContext
                    .attr('transform', SVGUtil.translate(translateX, this.getTranslateY(valueStyles.fontSize + labelStyles.height + translateY)))
                    .selectAll('text')
                    .data(labelData);

                labelElement
                    .enter()
                    .append('text')
                    .attr('class', Card.Label.class);

                labelElement
                    .text((d: string) => d)
                    .style({
                        'font-size': labelStyles.fontSize + 'px',
                        'fill': labelStyles.color,
                        'text-anchor': this.getTextAnchor()
                    });

                labelElement.call(AxisHelper.LabelLayoutStrategy.clip,
                    this.currentViewport.width,
                    TextMeasurementService.svgEllipsis);

                labelElement.exit().remove();
            }
            else {

                this.doValueTransition(
                    start,
                    target,
                    this.displayUnitSystemType,
                    this.animationOptions,
                    duration,
                    forceUpdate,
                    formatter);
            }

            this.updateTooltip(target);
            this.value = target;
        }

        private updateTooltip(target: number) {
            if (!this.toolTip)
                this.toolTip = this.graphicsContext.append("svg:title");
            this.toolTip.text(target);
        }

        private getDefaultFormatSettings(): CardFormatSetting {
            return {
                showTitle: true,
                labelSettings: dataLabelUtils.getDefaultLabelSettings(/* showLabel: */true, Card.DefaultStyle.value.color, 0),
            };
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            if (!this.cardFormatSetting)
                this.cardFormatSetting = this.getDefaultFormatSettings();

            var formatSettings = this.cardFormatSetting;

            switch (options.objectName) {
                case 'cardTitle':
                    return [{
                        objectName: 'cardTitle',
                        selector: null,
                        properties: {
                            show: formatSettings.showTitle,
                        },
                    }];
                case 'labels':
                    return dataLabelUtils.enumerateDataLabels(formatSettings.labelSettings, /*withPosition:*/ false, /*withPrecision:*/ true, /*withDisplayUnit:*/ true);
            }
        }
    }
}