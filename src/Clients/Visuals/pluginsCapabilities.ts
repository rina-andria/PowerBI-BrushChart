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

module powerbi.visuals.capabilities {
    // This file registers the built-in capabilities
    // Please use this file to register the capabilities in the plugins.ts/pluginsNotForOSS.ts

    export var animatedNumber = powerbi.visuals.animatedNumberCapabilities;

    export var areaChart = powerbi.visuals.lineChartCapabilities;

    export var barChart = powerbi.visuals.getColumnChartCapabilities(true);

    export var card = powerbi.visuals.cardCapabilities;

    export var multiRowCard = powerbi.visuals.multiRowCardCapabilities;

    export var clusteredBarChart = powerbi.visuals.getColumnChartCapabilities(true);

    export var clusteredColumnChart = powerbi.visuals.getColumnChartCapabilities();

    export var columnChart = powerbi.visuals.getColumnChartCapabilities();

    export var comboChart = powerbi.visuals.comboChartCapabilities;

    export var dataDotChart = powerbi.visuals.dataDotChartCapabilities;

    export var dataDotClusteredColumnComboChart = powerbi.visuals.comboChartCapabilities;

    export var dataDotStackedColumnComboChart = powerbi.visuals.comboChartCapabilities;

    export var donutChart = powerbi.visuals.donutChartCapabilities;

    export var funnel = powerbi.visuals.funnelChartCapabilities;

    export var gauge = powerbi.visuals.gaugeCapabilities;

    export var hundredPercentStackedBarChart = powerbi.visuals.getColumnChartCapabilities(true);

    export var hundredPercentStackedColumnChart = powerbi.visuals.getColumnChartCapabilities();

    export var image = powerbi.visuals.imageVisualCapabilities;

    export var lineChart = powerbi.visuals.lineChartCapabilities;

    export var lineStackedColumnComboChart = powerbi.visuals.comboChartCapabilities;

    export var lineClusteredColumnComboChart = powerbi.visuals.comboChartCapabilities;

    export var map = powerbi.visuals.mapCapabilities;

    export var filledMap = powerbi.visuals.filledMapCapabilities;

    export var treemap = powerbi.visuals.treemapCapabilities;

    export var pieChart = powerbi.visuals.donutChartCapabilities;

    export var scatterChart = powerbi.visuals.scatterChartCapabilities;

    export var table = powerbi.visuals.tableCapabilities;

    export var matrix = powerbi.visuals.matrixCapabilities;

    export var slicer = powerbi.visuals.slicerCapabilities;

    export var textbox = powerbi.visuals.richTextboxCapabilities;

    export var waterfallChart = powerbi.visuals.waterfallChartCapabilities;

    export var cheerMeter = powerbi.visuals.cheerMeterCapabilities;

    export var heatMap = powerbi.visuals.mapCapabilities;

    }
