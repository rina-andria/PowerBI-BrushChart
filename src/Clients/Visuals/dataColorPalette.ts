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

/// <reference path="_references.ts"/>

module powerbi.visuals {
    import ArrayExtensions = jsCommon.ArrayExtensions;

    export class DataColorPalette implements IDataColorPalette {
        private scales: { [index: string]: IColorScale };
        private colors: IColorInfo[];

        /**
         * Colors used for sentiment visuals, e.g. KPI, Gauge. Since this is only a temporary implementation which will
         * eventually be superseded by conditional formatting, we don't declare them as part of the theme and instead
         * use a hardcoded color scheme here until conditional formatting is ready.
         */
        private sentimentColors: IColorInfo[] = [
            { value: '#C0433A' }, // Red
            { value: '#E8D62E' }, // Yellow
            { value: '#79C75B' }, // Green
        ];

        // Hardcoded values for Color Picker.
        private basePickerColors: IColorInfo[] = [
            { value: '#FFFFFF' },
            { value: '#000000' },
            { value: '#00B8AA' },
            { value: '#374649' },
            { value: '#FD625E' },
            { value: '#F2C811' },
            { value: '#5F6B6D' },
            { value: '#8AD4EB' },
            { value: '#FE9666' },
            { value: '#A66999' }
        ];

        /**
         * Creates a DataColorPalette using the given theme, or the default theme.
         */
        constructor(colors?: IColorInfo[]) {
            // TODO: Default theme is currently hardcoded. Theme should eventually come from PV and be added as a parameter in the ctor. 
            this.colors = colors || ThemeManager.getDefaultTheme();
            this.scales = {};
        }

        public getColorScaleByKey(key: string): IColorScale {
            var scale = this.scales[key];
            if (scale === undefined) {
                scale = this.createScale();
                this.scales[key] = scale;
            }

            return scale;
        }

        public getNewColorScale(): IColorScale {
            return this.createScale();
        }

        public getColorByIndex(index: number): IColorInfo {
            debug.assert(index >= 0 && index < this.colors.length, 'index is out of bounds');
            return this.colors[index];
        }

        public getSentimentColors(): IColorInfo[] {
            return this.sentimentColors;
        }

        public getBasePickerColors(): IColorInfo[] {
            return this.basePickerColors;
        }

        private createScale(): IColorScale {
            return D3ColorScale.createFromColors(this.colors);
        }
    }

    export class D3ColorScale implements IColorScale {
        private scale: D3.Scale.OrdinalScale;

        constructor(scale: D3.Scale.OrdinalScale) {
            this.scale = scale;
        }

        public getColor(key: any): IColorInfo {
            return this.scale(key);
        }

        public clearAndRotateScale(): void {
            var offset = this.scale.domain().length;
            var rotatedColors = ArrayExtensions.rotate(this.scale.range(), offset);
            this.scale = d3.scale.ordinal().range(rotatedColors);
        }

        public clone(): IColorScale {
            return new D3ColorScale(this.scale.copy());
        }

        public static createFromColors(colors: IColorInfo[]): D3ColorScale {
            return new D3ColorScale(d3.scale.ordinal().range(colors));
        }
    }

    // TODO: When theming support is added, this should be changed into a fully fledged service. For now though we will
    class ThemeManager {
        private static colorSectorCount = 12;
      
        // declare the Theme code as a private implementation detail inside the DataColorPalette so that the code stays hidden
        // until it's ready for wider use.
        private static defaultBaseColors: IColorInfo[] = [
            // First loop
            { value: '#01B8AA' },
            { value: '#374649' },
            { value: '#FD625E' },
            { value: '#F2C80F' },
            { value: '#5F6B6D' },
            { value: '#8AD4EB' },
            { value: '#FE9666' }, // Bethany's Mango
            { value: '#A66999' },
            { value: '#3599B8' },
            { value: '#DFBFBF' },

            // Second loop
            { value: '#4AC5BB' },
            { value: '#5F6B6D' },
            { value: '#FB8281' },
            { value: '#F4D25A' },
            { value: '#7F898A' },
            { value: '#A4DDEE' },
            { value: '#FDAB89' },
            { value: '#B687AC' },
            { value: '#28738A' },
            { value: '#A78F8F' },

            // Third loop
            { value: '#168980' },
            { value: '#293537' },
            { value: '#BB4A4A' },
            { value: '#B59525' },
            { value: '#475052' },
            { value: '#6A9FB0' },
            { value: '#BD7150' },
            { value: '#7B4F71' },
            { value: '#1B4D5C' },
            { value: '#706060' },

            // Fourth loop
            { value: '#0F5C55' },
            { value: '#1C2325' },
            { value: '#7D3231' },
            { value: '#796419' },
            { value: '#303637' },
            { value: '#476A75' },
            { value: '#7E4B36' },
            { value: '#52354C' },
            { value: '#0D262E' },
            { value: '#544848' },
        ];

        private static defaultTheme: IColorInfo[];

        public static getDefaultTheme(): IColorInfo[] {
            if (!ThemeManager.defaultTheme) {
                // Extend the list of available colors by cycling the base colors
                ThemeManager.defaultTheme = [];
                var baseColors = ThemeManager.defaultBaseColors;
                for (var i = 0; i < ThemeManager.colorSectorCount; ++i) {
                    for (var j = 0, jlen = baseColors.length; j < jlen; ++j) {
                        ThemeManager.defaultTheme.push(
                            {
                                value: jsCommon.color.rotate(baseColors[j].value, i / ThemeManager.colorSectorCount)
                            });
                    }
                }
            }

            return ThemeManager.defaultTheme;
        }
    }
} 