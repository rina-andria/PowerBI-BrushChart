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

interface JQuery {
    /** Demonstrates how Power BI visual creation could be implemented as jQuery plugin */
    visual(plugin: Object, dataView?: Object): JQuery;
}

module powerbi.visuals {
    
    import defaultVisualHostServices = powerbi.visuals.defaultVisualHostServices;

    import HostControls = powerbi.visuals.HostControls;

    /**
     * Demonstrates Power BI visualization elements and the way to embed them in standalone web page.
     */
    export class Playground {

        /** Represents sample data view used by visualization elements. */
        private static pluginService: IVisualPluginService = new powerbi.visuals.visualPluginFactory.PlaygroundVisualPluginService();
        private static currentVisual: IVisual;

        private static hostControls: HostControls;
        private static container: JQuery;
        private static visualHostElement: JQuery;
        private static interactionsEnabledCheckbox: JQuery;

        private static visualStyle: IVisualStyle = {
            titleText: {
                color: { value: 'rgba(51,51,51,1)' }
            },
            subTitleText: {
                color: { value: 'rgba(145,145,145,1)' }
            },
            colorPalette: {
                dataColors: new powerbi.visuals.DataColorPalette(),
            },
            labelText: {
                color: {
                    value: 'rgba(51,51,51,1)',
                },
                fontSize: '11px'
            },
            isHighContrast: false,
        };

        /** Performs sample app initialization.*/
        public static initialize(): void {
            this.interactionsEnabledCheckbox = $("input[name='is_interactions']");
            this.container = $('#container');
            this.hostControls = new HostControls($('#options'));
            this.hostControls.setElement(this.container);

            this.populateVisualTypeSelect();
            powerbi.visuals.DefaultVisualHostServices.initialize();
            // Wrapper function to simplify visualization element creation when using jQuery
            $.fn.visual = function (plugin: IVisualPlugin, dataView?: DataView[]) {

                // Step 1: Create new DOM element to represent Power BI visual
                let element = $('<div/>');
                element.addClass('visual');
                element['visible'] = () => { return true; };
                this.append(element);
            
                Playground.createVisualElement(element, plugin, dataView);
                
                powerbi.visuals.DefaultVisualHostServices.initialize();

                return this;
            };

            this.interactionsEnabledCheckbox.on('change', () => {
                this.visualHostElement.empty();
                this.initVisual();
                this.hostControls.update();
            });

            let visualByDefault = jsCommon.Utility.getURLParamValue('visual');
            
            if (visualByDefault) {
                $('.topBar, #options').css({ "display": "none" });
                Playground.onVisualTypeSelection(visualByDefault.toString());
            }

        }

        private static createVisualElement(element: JQuery, plugin: IVisualPlugin, dataView?: DataView[]) {

            // Step 2: Instantiate Power BI visual
            this.currentVisual = plugin.create();
            this.visualHostElement = element;
            this.hostControls.setVisual(this.currentVisual);
            this.initVisual();
        };

        private static initVisual() {
            this.currentVisual.init({
                element: this.visualHostElement,
                host: defaultVisualHostServices,
                style: this.visualStyle,
                viewport: this.hostControls.getViewport(),
                settings: { slicingEnabled: true },
                interactivity: { isInteractiveLegend: false, selection: this.interactionsEnabledCheckbox.is(':checked') },
            });
            
        }

        private static populateVisualTypeSelect(): void {
           
            let typeSelect = $('#visualTypes');
            typeSelect.append('<option value="">(none)</option>');

            let visuals = this.pluginService.getVisuals();
            visuals.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

            for (let i = 0, len = visuals.length; i < len; i++) {
                let visual = visuals[i];
                typeSelect.append('<option value="' + visual.name + '">' + visual.name + '</option>');
            }

            typeSelect.change(() => this.onVisualTypeSelection(typeSelect.val()));
        }

        private static onVisualTypeSelection(pluginName: string): void {
            if (pluginName.length === 0) {
                return;
            }

            this.createVisualPlugin(pluginName);
            this.hostControls.onPluginChange(pluginName);
        }        

        private static createVisualPlugin(pluginName: string): void {
            this.container.children().not(".ui-resizable-handle").remove();

            let plugin = this.pluginService.getPlugin(pluginName);
            if (!plugin) {
                this.container.append('<div class="wrongVisualWarning">Wrong visual name <span>\'' + pluginName + '\'</span> in parameters</div>'); return;
            }
            this.container.visual(plugin);
        }
    }   
}
