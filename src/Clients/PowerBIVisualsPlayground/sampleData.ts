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

module powerbi.visuals.sampleData {

    import sampleDataViews = powerbi.visuals.sampleDataViews;
    
    export class SampleData {

        private static data = [
            new sampleDataViews.FileStorageData(),
            new sampleDataViews.ImageData(),
            new sampleDataViews.RichtextData(),
            new sampleDataViews.SalesByCountryData(),
            new sampleDataViews.SalesByDayOfWeekData(),
            new sampleDataViews.SimpleGaugeData(),
            new sampleDataViews.SimpleMatrixData(),
            new sampleDataViews.SimpleTableData(),
            new sampleDataViews.TeamScoreData()
        ];

        /**
         * Returns sample data view for a visualization element specified.
         */
        public static getSamplesByPluginName(pluginName: string) {

            var samples = this.data.filter((item) => item.hasPlugin(pluginName));

            if (samples.length > 0) {
                return samples;
            }

            return this.data.filter((item) => item.hasPlugin("default"));
        }

        /**
         * Returns sampleDataView Instance for a visualization element specified.
         */
        public static getDataViewsBySampleName(sampleName: string) {
            return this.data.filter((item) => (item.getName() === sampleName))[0];
        }
 
    }     
}
