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
    enum OwlHappiness {
        Sad = 0,
        Meh = 1,
        Happy = 2
    }

    export class OwlGauge implements IVisual {
        private static owlBodySvg = '<svg version="1.1" class="owlGaugeBody" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 267.7 291.2" style="enable-background:new 0 0 267.7 291.2;" xml:space="preserve"> <style type="text/css"> .owlGaugeBody .st0{fill:#A87D50;} .owlGaugeBody .st1{fill:#C2B59B;} .owlGaugeBody .st2{fill:#EB2227;} .owlGaugeBody .st3{fill:#FFFFFF;} .owlGaugeBody .st4{fill:#F9D018;} .owlGaugeBody .st5{fill:none;} .owlGaugeBody .st6{fill:#83381B;} .owlGaugeBody .st7{fill:#231F20;} </style> <g id="XMLID_31_"> <g id="XMLID_34_"> <ellipse id="XMLID_21_" transform="matrix(0.9998 1.947640e-02 -1.947640e-02 0.9998 2.8614 -2.5802)" class="st0" cx="133.9" cy="145.6" rx="133.9" ry="145.6"/> <polygon id="XMLID_20_" class="st0" points="199.2,32.8 184,11.3 209,9.7 "/> <polygon id="XMLID_19_" class="st0" points="73.9,31.2 62.1,7.7 87.1,9.8 "/> <circle id="XMLID_18_" class="st1" cx="134.8" cy="189.2" r="89.8"/> <path id="XMLID_17_" class="st2" d="M140.1,88c-2.7,3.8-7.9,4.7-11.7,2c-2.7-1.9-3.9-5.1-3.4-8.1c0,0,9.6-41.8,9.6-41.8l6.9,40.8 C142,83.2,141.6,85.8,140.1,88z"/> <path id="XMLID_16_" class="st3" d="M164.6,16.2c-14.2,0-26.3,9.2-30.6,21.9c-4.1-13.1-16.3-22.6-30.8-22.6 C85.4,15.6,71,30,71,47.8s14.4,32.3,32.3,32.3c14.2,0,26.3-9.2,30.6-21.9c4.1,13.1,16.3,22.6,30.8,22.6 c17.8,0,32.3-14.4,32.3-32.3S182.4,16.2,164.6,16.2z"/> <path id="XMLID_15_" class="st4" d="M122,58.7l23.3-0.1c0,0-9,14.8-10.2,16.6c-1.2,1.9-2.2,0.1-2.2,0.1L122,58.7z"/> <rect id="XMLID_14_" x="-11.4" y="-68.8" class="st5" width="288.3" height="259.7"/> <g id="XMLID_37_"> <path id="XMLID_13_" class="st6" d="M121.6,125.5c0,3.7-3.5,6.6-7.7,6.6c-4.2,0-7.7-3-7.7-6.6"/> <path id="XMLID_12_" class="st6" d="M160.1,126.5c0,3.7-3.5,6.6-7.7,6.6s-7.7-3-7.7-6.6"/> <path id="XMLID_11_" class="st6" d="M142.4,148.1c0,3.7-3.5,6.6-7.7,6.6c-4.2,0-7.7-3-7.7-6.6"/> <path id="XMLID_10_" class="st6" d="M183.1,148.8c0,3.7-3.5,6.6-7.7,6.6c-4.2,0-7.7-3-7.7-6.6"/> <path id="XMLID_9_" class="st6" d="M160.9,177.4c0,3.7-3.5,6.6-7.7,6.6s-7.7-3-7.7-6.6"/> <path id="XMLID_8_" class="st6" d="M201.6,178c0,3.7-3.5,6.6-7.7,6.6s-7.7-3-7.7-6.6"/> <path id="XMLID_7_" class="st6" d="M76.4,177.4c0,3.7-3.5,6.6-7.7,6.6c-4.2,0-7.7-3-7.7-6.6"/> <path id="XMLID_6_" class="st6" d="M117,178c0,3.7-3.5,6.6-7.7,6.6s-7.7-3-7.7-6.6"/> <path id="XMLID_5_" class="st6" d="M98.6,148.1c0,3.7-3.5,6.6-7.7,6.6c-4.2,0-7.7-3-7.7-6.6"/> </g> <circle id="XMLID_4_" class="st7" cx="164.1" cy="49" r="6.4"/> <circle id="XMLID_3_" class="st7" cx="102.7" cy="47.7" r="6.4"/> </g> <path id="XMLID_2_" class="st0" d="M160.1,140.9c11.1-8.4,55.6-36,55.6-36l4.7,0.8l10.2,38.8c0,0-3,3-9.2,3.1 c-5.1,0.1-45.9-2.6-60.2-3.5C158.1,143.9,157.7,142.7,160.1,140.9z"/> <path id="XMLID_1_" class="st0" d="M110.6,140.8c-11.1-8.4-55.6-36-55.6-36l-4.7,0.8L40,144.4c0,0,3,3,9.2,3.1 c5.1,0.1,45.9-2.6,60.2-3.5C112.5,143.8,113,142.6,110.6,140.8z"/> </g> </svg>';
        private static owlTailSvg = '<svg version="1.1" class="owlGaugeTail" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 587.8 295.5" style="enable-background:new 0 0 587.8 295.5;" xml:space="preserve"> <style type="text/css"> .owlGaugeTail .st0{fill:#3B2416;} .owlGaugeTail .st1{fill:#5B4B43;} .owlGaugeTail .st2{fill:#603A17;} .owlGaugeTail .st3{fill:#726659;} </style> <g id="XMLID_55_"> <path id="XMLID_29_" class="st0" d="M85.2,106.2c-27.1,0-49.2,22-49.2,49.2c0,19.1,10.9,35.7,26.9,43.8c0,0,231.2,95.9,231.2,95.9 l-171-171C114.1,113.2,100.5,106.2,85.2,106.2z"/> <g id="XMLID_56_"> <path id="XMLID_28_" class="st1" d="M482.5,86.4c0-27.1-22-49.2-49.2-49.2c-19.1,0-35.7,10.9-43.8,26.9c0,0-95.9,231.2-95.9,231.2 l171-171C475.5,115.3,482.5,101.7,482.5,86.4z"/> <path id="XMLID_27_" class="st2" d="M573.5,281.3c19.2-19.2,19.2-50.3,0-69.5c-13.5-13.5-33-17.5-50-12c0,0-231.3,95.7-231.3,95.7 l241.8,0C548,296.9,562.6,292.1,573.5,281.3z"/> <path id="XMLID_26_" class="st3" d="M279.9,14.4c-19.2-19.2-50.3-19.2-69.5,0c-13.5,13.5-17.5,33-12,50c0,0,95.7,231.3,95.7,231.3 L294,54C295.4,39.8,290.7,25.2,279.9,14.4z"/> <path id="XMLID_25_" class="st2" d="M105.3,86.4c0-27.1,22-49.2,49.2-49.2c19.1,0,35.7,10.9,43.8,26.9c0,0,95.9,231.2,95.9,231.2 l-171-171C112.3,115.3,105.3,101.7,105.3,86.4z"/> <path id="XMLID_24_" class="st2" d="M14.4,281.4c-19.2-19.2-19.2-50.3,0-69.5c13.5-13.5,33-17.5,50-12c0,0,231.3,95.7,231.3,95.7 l-241.8,0C39.8,297,25.2,292.3,14.4,281.4z"/> <path id="XMLID_23_" class="st2" d="M308.2,14c19.2-19.2,50.3-19.2,69.5,0c13.5,13.5,17.5,33,12,50c0,0-95.7,231.3-95.7,231.3 l0-241.8C292.6,39.4,297.4,24.8,308.2,14z"/> <path id="XMLID_22_" class="st0" d="M503.2,106c27.1,0,49.2,22,49.2,49.2c0,19.1-10.9,35.7-26.9,43.8c0,0-231.2,95.9-231.2,95.9 l171-171C474.2,113,487.8,106,503.2,106z"/> </g> </g> </svg>';
        private static visualBgSvg = '<svg version="1.1" class="owlGaugeBg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="123.8 94.9 349.1 175.3" style="enable-background:new 123.8 94.9 349.1 175.3;" xml:space="preserve"> <style type="text/css"> .owlGaugeBg .st0{fill:#EF4137;} .owlGaugeBg .st1{fill:#FAAF42;} .owlGaugeBg .st2{fill:#F15B2A;} .owlGaugeBg .st3{fill:#F69321;} </style> <g id="XMLID_10_"> <path id="XMLID_8_" class="st0" d="M174.3,158c-16.1,0-29.2,13.1-29.2,29.2c0,11.4,6.5,21.2,16,26.1l137.3,57L196.9,168.7 C191.5,162.2,183.4,158,174.3,158z"/> <g id="XMLID_11_"> <path id="XMLID_7_" class="st1" d="M410.2,146.3c0-16.1-13.1-29.2-29.2-29.2c-11.4,0-21.2,6.5-26,16l-57,137.5L399.5,169 C406.1,163.5,410.2,155.4,410.2,146.3z"/> <path id="XMLID_6_" class="st0" d="M464.3,262.2c11.4-11.4,11.4-29.9,0-41.3c-8-8-19.6-10.4-29.7-7.1l-137.4,56.9h143.6 C449.2,271.4,457.9,268.6,464.3,262.2z"/> <path id="XMLID_5_" class="st2" d="M290,103.5c-11.4-11.4-29.9-11.4-41.3,0c-8,8-10.4,19.6-7.1,29.7l56.8,137.5V127 C299.2,118.6,296.4,109.9,290,103.5z"/> <path id="XMLID_4_" class="st3" d="M186.3,146.3c0-16.1,13.1-29.2,29.2-29.2c11.4,0,21.2,6.5,26,16l57,137.5L197,168.8 C190.5,163.5,186.3,155.4,186.3,146.3z"/> <path id="XMLID_3_" class="st2" d="M132.3,262.2c-11.4-11.4-11.4-29.9,0-41.3c8-8,19.6-10.4,29.7-7.1l137.4,56.9H155.8 C147.4,271.5,138.7,268.7,132.3,262.2z"/> <path id="XMLID_2_" class="st3" d="M306.8,103.2c11.4-11.4,29.9-11.4,41.3,0c8,8,10.4,19.6,7.1,29.7l-56.8,137.5V126.7 C297.5,118.3,300.3,109.7,306.8,103.2z"/> <path id="XMLID_1_" class="st2" d="M422.5,157.9c16.1,0,29.2,13.1,29.2,29.2c0,11.4-6.5,21.2-16,26.1l-137.3,57L400,168.6 C405.3,162.1,413.4,157.9,422.5,157.9z"/> </g> </g> </svg>';

        private static owlBodyHeightMultiplier = 291.2 / 267.7;
        private static owlTailHeightMultiplier = 295.5 / 587.8;
        private static visualBgHeightMultiplier = 295.5 / 587.8;

        private static OwlDemoMode = false;

        public static capabilities: VisualCapabilities = {
            dataRoles: [
                {
                    name: 'Category',
                    kind: powerbi.VisualDataRoleKind.Grouping,
                },
                {
                    name: 'Y',
                    kind: powerbi.VisualDataRoleKind.Measure,
                },
            ],
            dataViewMappings: [{
                categories: {
                    for: { in: 'Category' },
                    dataReductionAlgorithm: { top: {} }
                },
                values: {
                    select: [{ bind: { to: 'Y' } }]
                },
            }]
        };

        public static converter(dataView: DataView): any {
            return {};
        }

        private static getGaugeData(dataView: DataView): GaugeTargetData {
            var settings: GaugeTargetData = {
                max: 100,
                min: 0,
                target: undefined,
                total: 0,
                tooltipItems: []
            };

            if (dataView && dataView.categorical && dataView.categorical.values && dataView.metadata && dataView.metadata.columns) {
                var values = dataView.categorical.values;
                var metadataColumns = dataView.metadata.columns;

                debug.assert(metadataColumns.length >= values.length, 'length');

                for (var i = 0; i < values.length; i++) {
                    var col = metadataColumns[i],
                        value = values[i].values[0] || 0;
                    if (col && col.roles) {
                        if (col.roles[gaugeRoleNames.y]) {
                            settings.total = value;
                            if (value)
                                settings.tooltipItems.push({ value: value, metadata: values[i] });
                        } else if (col.roles[gaugeRoleNames.minValue]) {
                            settings.min = value;
                        } else if (col.roles[gaugeRoleNames.maxValue]) {
                            settings.max = value;
                        } else if (col.roles[gaugeRoleNames.targetValue]) {
                            settings.target = value;
                            if (value)
                                settings.tooltipItems.push({ value: value, metadata: values[i] });
                        }
                    }
                }
            }

            return settings;
        }

        private rootElem: JQuery;
        private svgBgElem: JQuery;
        private svgBodyElem: JQuery;
        private svgTailElem: JQuery;

        public init(options: VisualInitOptions): void {
            this.rootElem = options.element;
            this.rootElem.addClass('owlGaugeVisual');

            this.svgTailElem = $(OwlGauge.owlTailSvg);
            this.svgBgElem = $(OwlGauge.visualBgSvg);
            this.svgBodyElem = $(OwlGauge.owlBodySvg);

            this.rootElem.append(this.svgBgElem).append(this.svgTailElem).append(this.svgBodyElem);

            if (OwlGauge.OwlDemoMode) {
                window.setInterval(() => {
                    var randomPercentage = Math.random() * 100 + 1;
                    this.updateGauge(randomPercentage);
                }, 2000);
            }

            this.updateViewportSize(options.viewport.width, options.viewport.height);
        }

        public update(options: VisualUpdateOptions) {
            this.updateViewportSize(options.viewport.width, options.viewport.height);

            var dataView = options.dataViews.length > 0 ? options.dataViews[0] : null;

            if (dataView) {
                var gaugeData = OwlGauge.getGaugeData(options.dataViews[0]);

                var percentage = (gaugeData.total - gaugeData.min) / (gaugeData.max - gaugeData.min);
                this.updateGauge(percentage * 100 | 0);
            }
            else this.updateGauge(0);
        }

        private updateGauge(percentage: number) {
            if (percentage >= 0 && percentage <= 100) {
                var rotationDeg = -180 + (180 * percentage/100);
                this.svgBgElem.css({ transform: 'rotate(' + rotationDeg + 'deg)' });

                if (percentage >= 66) {
                    this.happinessLevel = OwlHappiness.Happy;
                }
                else if (percentage >= 33) {
                    this.happinessLevel = OwlHappiness.Meh;
                }
                else {
                    this.happinessLevel = OwlHappiness.Sad;
                }
            }
        }

        private set happinessLevel(level: OwlHappiness) {
            this.rootElem.removeClass('sad').removeClass('meh').removeClass('happy');

            switch (level) {
                case OwlHappiness.Sad:
                    this.rootElem.addClass('sad');
                    break;
                case OwlHappiness.Meh:
                    this.rootElem.addClass('meh');
                    break;
                case OwlHappiness.Happy:
                    this.rootElem.addClass('happy');
                    break;
                default:
                    console.log('Well, this is interesting...');
            }
        }

        private updateViewportSize(width: number, height: number) {
            var smoothingFn = window.setImmediate || window.requestAnimationFrame;

            smoothingFn(() => {
                this.rootElem.css({
                    height: height,
                    width: width
                });

                this.svgBodyElem.height(this.svgBodyElem.width() * OwlGauge.owlBodyHeightMultiplier);
                this.svgBgElem.height(this.svgBgElem.width() * OwlGauge.visualBgHeightMultiplier);
                this.svgTailElem.height(this.svgTailElem.width() * OwlGauge.owlTailHeightMultiplier);
            });
        }
    }
}