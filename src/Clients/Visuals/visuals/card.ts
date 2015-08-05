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
        animator?: IAnimator;
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
        private labelContext: D3.Selection;

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

        public static capabilities: VisualCapabilities = {
            dataRoles: [
                {
                    name: 'Values',
                    kind: VisualDataRoleKind.Measure,
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Fields')
                }
            ],
            objects: AnimatedText.objectDescs,
            dataViewMappings: [{
                conditions: [
                    { 'Values': { max: 1 } }
                ],
                single: { role: "Values" }
            }],
            suppressDefaultTitle: true,
        };

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

            var dataView = options.dataViews[0];
            var value: any;
            if (dataView) {
                this.getMetaDataColumn(dataView);
                if (dataView.single) {
                    value = dataView.single.value;
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

            if (start === target && target === undefined)
                return;

            if (start !== target && target === undefined) {
                this.clear();
                return;
            }

            if (this.isScrollable) {               

                if (!forceUpdate && start === target)
                    return;

                var label: string;
                var metaDataColumn = this.metaDataColumn;
                var labelStyles = Card.DefaultStyle.label;
                var valueStyles = Card.DefaultStyle.value;
                var formatter = valueFormatter.create({
                    format: this.getFormatString(metaDataColumn),
                    value: target,
                    displayUnitSystemType: this.displayUnitSystemType,
                    formatSingleValues: true,
                    allowFormatBeautification: true,
                    columnType: metaDataColumn ? metaDataColumn.type : undefined
                });

                if (metaDataColumn)
                    label = metaDataColumn.displayName;

                target = formatter.format(target);

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
                        'fill': valueStyles.color,
                        'font-family': valueStyles.fontFamily,
                        'text-anchor': this.getTextAnchor()
                    });

                valueElement.exit().remove();

                var labelElement = this.labelContext
                    .attr('transform', SVGUtil.translate(translateX, this.getTranslateY(valueStyles.fontSize + labelStyles.height + translateY)))
                    .selectAll('text')
                    .data([label]);

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

                labelElement.exit().remove();
            }
            else {

                this.doValueTransition(
                    start,
                    target,
                    this.displayUnitSystemType,
                    this.animationOptions,
                    duration,
                    forceUpdate);
            }

            this.updateTooltip(target);
            this.value = target;
        }

        private updateTooltip(target: number) {
            if (!this.toolTip)
                this.toolTip = this.graphicsContext.append("svg:title");
            this.toolTip.text(target);
        }
    }
}