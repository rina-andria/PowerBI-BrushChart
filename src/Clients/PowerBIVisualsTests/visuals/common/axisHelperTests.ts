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

/// <reference path="../../_references.ts"/>

module powerbitests {
    import AxisHelper = powerbi.visuals.AxisHelper;
    import ValueType = powerbi.ValueType;

    describe("AxisHelper invertOrdinalScale tests",() => {
        var range;
        var ordinalScale: D3.Scale.OrdinalScale;
        var domain;

        beforeEach(() => {
            range = [0, 99];
            domain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            ordinalScale = d3.scale.ordinal();
            ordinalScale.rangeRoundBands(range, 0.1);
            ordinalScale.domain(domain);
        });

        it('invertOrdinalScale in middle',() => {
            var invertedValue = AxisHelper.invertOrdinalScale(ordinalScale, 50);
            expect(invertedValue).toBe(5);
        });

        it('invertOrdinalScale at start',() => {
            var invertedValue = AxisHelper.invertOrdinalScale(ordinalScale, 0);
            expect(invertedValue).toBe(0);
        });

        it('invertOrdinalScale at end',() => {
            var invertedValue = AxisHelper.invertOrdinalScale(ordinalScale, 99);
            expect(invertedValue).toBe(9);
        });

        it('invertOrdinalScale at before start',() => {
            var invertedValue = AxisHelper.invertOrdinalScale(ordinalScale, -4);
            expect(invertedValue).toBe(0);
        });

        it('invertOrdinalScale at after end',() => {
            var invertedValue = AxisHelper.invertOrdinalScale(ordinalScale, 1222);
            expect(invertedValue).toBe(9);
        });
    });

    describe("AxisHelper createDomain tests",() => {
        var scalarCartesianSeries = [
            {
                data: [{
                    categoryValue: 7,
                    value: 11,
                    categoryIndex: 0,
                    seriesIndex: 0,
                }, {
                    categoryValue: 9,
                    value: 9,
                    categoryIndex: 1,
                    seriesIndex: 0,
                }, {
                    categoryValue: 15,
                    value: 6,
                    categoryIndex: 2,
                    seriesIndex: 0,
                }, {
                    categoryValue: 22,
                    value: 7,
                    categoryIndex: 3,
                    seriesIndex: 0,
                }]
            },
        ];

        it("ordinal - text",() => {
            var domain = AxisHelper.createDomain(scalarCartesianSeries, ValueType.fromDescriptor({ text: true }), false, []);
            expect(domain).toEqual([0,1,2,3]);
        });

        it("scalar - two values",() => {
            var domain = AxisHelper.createDomain(scalarCartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, [5, 20]);
            expect(domain).toEqual([5,20]);
        });

        it("scalar - undefined, val",() => {
            var domain = AxisHelper.createDomain(scalarCartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, [undefined, 20]);
            expect(domain).toEqual([7, 20]);
        });

        it("scalar - val, undefined",() => {
            var domain = AxisHelper.createDomain(scalarCartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, [5, undefined]);
            expect(domain).toEqual([5, 22]);
        });

        it("scalar - undefined, undefined",() => {
            var domain = AxisHelper.createDomain(scalarCartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, [undefined, undefined]);
            expect(domain).toEqual([7, 22]);
        });

        it("scalar - null",() => {
            var domain = AxisHelper.createDomain(scalarCartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, null);
            expect(domain).toEqual([7, 22]);
        });

        // invalid case with min > max, take actual domain
        it("scalar - min > max",() => {
            var domain = AxisHelper.createDomain(scalarCartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, [15, 10]);
            expect(domain).toEqual([7, 22]);
        });
    });

    describe("AxisHelper createAxis tests",() => {
        var dataStrings = ['Sun', 'Mon', 'Holiday'];
        var dataNumbers = [47.5, 98.22, 127.3];
        var dataPercent = [0.0, 0.33, 0.49];
        var dataTime = [new Date('10/15/2014'), new Date('10/15/2015'), new Date('10/15/2016')];
        var domainOrdinal3 = [0, 1, 2];
        var domainBoolIndex = [0, 1];
        var domainNaN = [NaN, NaN];

        var metaDataColumnText: powerbi.DataViewMetadataColumn = {
            displayName: 'Column',
            type: ValueType.fromDescriptor({ text: true })
        };
        var metaDataColumnNumeric: powerbi.DataViewMetadataColumn = {
            displayName: 'Column',
            type: ValueType.fromDescriptor({ numeric: true }),
            objects: {
                general: {
                    formatString: '0.00;-0.00;0.00',
                }
            }
        };
        var metaDataColumnPercent: powerbi.DataViewMetadataColumn = {
            displayName: 'Column',
            type: ValueType.fromDescriptor({ numeric: true }),
            objects: {
                general: {
                    formatString: '0 %;-0 %;0 %',
                }
            }
        };
        var metaDataColumnBool: powerbi.DataViewMetadataColumn = {
            displayName: 'Column',
            type: ValueType.fromDescriptor({ bool: true })
        };
        var metaDataColumnTime: powerbi.DataViewMetadataColumn = {
            displayName: 'Column',
            type: ValueType.fromDescriptor({ dateTime: true })
        };
        var formatStringProp: powerbi.DataViewObjectPropertyIdentifier = {
            objectName: 'general',
            propertyName: 'formatString',
        };

        // TODO: add a getValueFn mock to provide to createAxis so we can test tickValue generation

        it('create ordinal scale',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: domainOrdinal3,
                metaDataColumn: metaDataColumnText,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: false,
                isVertical: false,
                getValueFn: (index, type) => { return dataStrings[index]; }
            });

            var scale = <any>os.scale;
            expect(scale).toBeDefined();
            // Proves scale is ordinal
            expect(scale.invert).toBeUndefined();

            var values = <any>os.values;
            expect(values).toBeDefined();
            expect(values.length).toEqual(3);
            expect(values[0]).toBe('Sun');

            // Provides category thickness is not set when not defined
            var categoryThickness = <any>os.categoryThickness;
            expect(categoryThickness).toBeUndefined();        

            // Proves label max width is pixelSpan/tickValues when categoryThickness not defined
            var xLabelMaxWidth = <any>os.xLabelMaxWidth;
            expect(xLabelMaxWidth).toBeDefined();
            expect(xLabelMaxWidth).toEqual(21);
        });

        it('create ordinal scale with linear values',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: domainOrdinal3,
                metaDataColumn: metaDataColumnNumeric,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: false,
                isVertical: false,
                getValueFn: (index, type) => { return dataNumbers[index]; }
            });

            var scale = <any>os.scale;
            expect(scale).toBeDefined();

            var values = <any>os.values;
            expect(values).toBeDefined();
            expect(values.length).toEqual(3);
            expect(values[0]).toBe('47.50');

            // Proves scale is ordinal
            expect(scale.invert).toBeUndefined();
        });

        it('create ordinal scale with no categories',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: domainOrdinal3,
                metaDataColumn: undefined,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: false,
                isVertical: false,
                getValueFn: (index, type) => { return dataStrings[index]; }
            });
            var values = <any>os.values;
            expect(values).toBeDefined();
            expect(values.length).toEqual(0);
        });

        it('create ordinal scale with boolean values',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: domainBoolIndex,
                metaDataColumn: metaDataColumnBool,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: false,
                isVertical: false,
                getValueFn: (d, dataType) => { if (d === 0) return true; else return false; }
            });
            var scale = <any>os.scale;
            expect(scale).toBeDefined();

            // Proves scale is ordinal
            expect(scale.invert).toBeUndefined();

            // check tick labels values
            expect(os.values[0]).toBe('True');
            expect(os.values[1]).toBe('False');
        });

        it('create ordinal scale with category thickness',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: domainOrdinal3,
                metaDataColumn: metaDataColumnText,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: false,
                isVertical: false,
                categoryThickness: 14,
                getValueFn: (index, type) => { return dataStrings[index]; }
            });

            var values = <any>os.values;
            expect(values).toBeDefined();
            expect(values.length).toEqual(3);
            expect(values[0]).toBe('Sun');

            // Provides category thickness set when defined
            var categoryThickness = <any>os.categoryThickness;
            expect(categoryThickness).toBeDefined();
            expect(categoryThickness).toEqual(14);

            // Provides category thickness used as xLabelMaxWidth when not is scalar
            var xLabelMaxWidth = <any>os.xLabelMaxWidth;
            expect(xLabelMaxWidth).toBeDefined();
            expect(xLabelMaxWidth).toEqual(10);
        });

        it('create linear scale',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: [dataNumbers[0], dataNumbers[2]],
                metaDataColumn: metaDataColumnNumeric,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: false
            });
            var scale = <any>os.scale;
            expect(scale).toBeDefined();
            // Proves scale is linear
            expect(scale.invert).toBeDefined();

            // Provides category thickness is not set when not defined
            var categoryThickness = <any>os.categoryThickness;
            expect(categoryThickness).toBeUndefined();

            var values = <any>os.values;
            expect(values).toBeDefined();
            expect(values.length).toEqual(2);
            expect(values[1]).toBe('100.00');

            // Proves label max width is pixelSpan/tickValues when is scalar and category thickness not defined
            var xLabelMaxWidth = <any>os.xLabelMaxWidth;
            expect(xLabelMaxWidth).toBeDefined();
            expect(xLabelMaxWidth).toBeGreaterThan(28);
            expect(xLabelMaxWidth).toBeLessThan(33);
        });

        it('create linear scale with NaN domain',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: domainNaN,
                metaDataColumn: metaDataColumnNumeric,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: true
            });
            var scale = <any>os.scale;
            expect(scale).toBeDefined();
            // Proves scale is linear
            expect(scale.invert).toBeDefined();

            // check for default value fallbackDomain
            var values = <any>os.values;
            expect(values).toBeDefined();
            expect(values.length).toEqual(3);
            expect(values[2]).toBe('10.00');
        });

        it('create value scale - near zero min check',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: [-0.000001725, 15],
                metaDataColumn: metaDataColumnNumeric,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: true
            });
            var scale = <any>os.scale;
            expect(scale).toBeDefined();
            // Proves scale is linear
            expect(scale.invert).toBeDefined();

            var values = <any>os.values;
            expect(values).toBeDefined();
            expect(values.length).toEqual(2);
            expect(values[0]).toBe('0.00');
        });

        it('create linear scale with category thickness',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: [40, 60],
                metaDataColumn: metaDataColumnNumeric,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: false,
                categoryThickness: 20,
            });
            var scale = <any>os.scale;
            expect(scale).toBeDefined();
            // Proves scale is linear
            expect(scale.invert).toBeDefined();

            // Proves category thickness set when defined
            var categoryThickness = <any>os.categoryThickness;
            expect(categoryThickness).toBeDefined();
            expect(categoryThickness).toEqual(20);

            // Proves category thickness not considered for label max width when is scalar
            var xLabelMaxWidth = <any>os.xLabelMaxWidth;
            expect(xLabelMaxWidth).toBeDefined();
            expect(xLabelMaxWidth).toBe(21);
        });

        it('create linear scale with category thickness that needs to change',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 200,
                dataDomain: [2007, 2011],
                metaDataColumn: metaDataColumnNumeric,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: false,
                categoryThickness: 50,
            });
            var scale = <any>os.scale;
            expect(scale).toBeDefined();
            // Proves scale is linear
            expect(scale.invert).toBeDefined();

            // category thickness was altered
            var categoryThickness = <any>os.categoryThickness;
            expect(categoryThickness).toBeDefined();
            expect(categoryThickness).toBeCloseTo(33.3, 1);
        });

        it('create linear scale with category thickness and zero range (single value)',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 200,
                dataDomain: [9,9],
                metaDataColumn: metaDataColumnNumeric,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: false,
                categoryThickness: 50,
            });
            var scale = <any>os.scale;
            expect(scale).toBeDefined();
            // Proves scale is linear
            expect(scale.invert).toBeDefined();

            // category thickness was altered
            var categoryThickness = <any>os.categoryThickness;
            expect(categoryThickness).toBeDefined();
            expect(categoryThickness).toBe(50);
        });

        it('create scalar time scale',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: [dataTime[0].getTime(), dataTime[2].getTime()],
                metaDataColumn: metaDataColumnTime,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: false,
                getValueFn: (index, type) => { return new Date(index); } //index is actually milliseconds in this case
            });
            var scale = <any>os.scale;
            expect(scale).toBeDefined();
            
            // Proves scale is linear
            expect(scale.invert).toBeDefined();

            var values = <any>os.values;
            expect(values).toBeDefined();
            expect(values.length).toEqual(2);
            expect(values[0]).toBe('2015');
        });

        it('create scalar time scale - single day',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: [dataTime[0].getTime(), dataTime[0].getTime()],
                metaDataColumn: metaDataColumnTime,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: false,
                getValueFn: (index, type) => { return new Date(index); } //index is actually milliseconds in this case
            });
            var scale = <any>os.scale;
            expect(scale).toBeDefined();
            
            // Proves scale is linear
            expect(scale.invert).toBeDefined();

            var values = <any>os.values;
            expect(values).toBeDefined();
            expect(values.length).toEqual(1);
            expect(values[0]).toBe('Oct 15');
        });

        it('create scalar time scale with invaid domains',() => {
            var axisProps: powerbi.visuals.IAxisProperties[] = [];

            axisProps[0] = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: [], //empty
                metaDataColumn: metaDataColumnTime,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: false,
                getValueFn: (index, type) => { return new Date(index); } //index is actually milliseconds in this case
            });
            axisProps[1] = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: null, //null
                metaDataColumn: metaDataColumnTime,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: false,
                getValueFn: (index, type) => { return new Date(index); } //index is actually milliseconds in this case
            });
            axisProps[2] = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: [undefined, undefined], //two undefined
                metaDataColumn: metaDataColumnTime,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: false,
                getValueFn: (index, type) => { return new Date(index); } //index is actually milliseconds in this case
            });

            for (var i = 0, ilen = axisProps.length; i < ilen; i++) {
                var props = axisProps[i];
                var scale = <any>props.scale;
                expect(scale).toBeDefined();
            
                // Proves scale is linear
                expect(scale.invert).toBeDefined();

                var values = <any>props.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(2);
                expect(values[0]).toBe('Jul 2014');
                expect(props.usingDefaultDomain).toBe(true);
            }
        });

        it('create ordinal time scale',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: domainOrdinal3,
                metaDataColumn: metaDataColumnTime,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: false,
                isVertical: false,
                getValueFn: (index, type) => { return dataTime[index]; }
            });
            var scale = <any>os.scale;
            expect(scale).toBeDefined();
            
            // Proves scale is ordinal
            expect(scale.invert).toBeUndefined();

            var values = <any>os.values;
            expect(values).toBeDefined();
            expect(values.length).toEqual(3);
            expect(values[0]).toBe('2014');
        });

        it('create linear percent value scale',() => {
            var os = AxisHelper.createAxis({
                pixelSpan: 100,
                dataDomain: [dataPercent[0], dataPercent[2]],
                metaDataColumn: metaDataColumnPercent,
                formatStringProp: formatStringProp,
                outerPadding: 0.5,
                isScalar: true,
                isVertical: true,
            });
            var scale = <any>os.scale;
            expect(scale).toBeDefined();
            
            // Proves scale is linear
            expect(scale.invert).toBeDefined();

            var values = <any>os.values;
            expect(values).toBeDefined();
            expect(values.length).toEqual(2);
            expect(values[1]).toBe('50 %');
        });
    });

    describe("AxisHelper column type tests",() => {
        it('createOrdinalType',() => {
            var ordinalType = AxisHelper.createOrdinalType();
            expect(AxisHelper.isOrdinal(ordinalType)).toBe(true);
            expect(AxisHelper.isDateTime(ordinalType)).toBe(false);
        });

        it('isOrdinal not valid for DateTime',() => {
            expect(AxisHelper.isOrdinal(ValueType.fromDescriptor({ dateTime: true }))).toBe(false);
        });

        it('isOrdinal valid for bool',() => {
            expect(AxisHelper.isOrdinal(ValueType.fromDescriptor({ bool: true }))).toBe(true);
        });

        it('isOrdinal not valid for numeric',() => {
            expect(AxisHelper.isOrdinal(ValueType.fromDescriptor({ numeric: true }))).toBe(false);
        });

        it('isOrdinal valid for text',() => {
            expect(AxisHelper.isOrdinal(ValueType.fromDescriptor({ text: true }))).toBe(true);
        });

        it('isDateTime valid for DateTime',() => {
            expect(AxisHelper.isDateTime(ValueType.fromDescriptor({ dateTime: true }))).toBe(true);
        });

        it('isDateTime not valid for non-DateTIme',() => {
            expect(AxisHelper.isDateTime(ValueType.fromDescriptor({ numeric: true }))).toBe(false);

            expect(AxisHelper.isDateTime(ValueType.fromDescriptor({ text: true }))).toBe(false);

            expect(AxisHelper.isDateTime(ValueType.fromDescriptor({ bool: true }))).toBe(false);
        });

        it('isDateTime null',() => {
            expect(AxisHelper.isDateTime(null)).toBe(false);
        });

        it('isDateTime undefined',() => {
            expect(AxisHelper.isDateTime(undefined)).toBe(false);
        });
    });

    describe("AxisHelper get Recommended tick values tests",() => {
        var labels = ['VRooom', 'FROM', '1984', 'OR', 'YEAR', '3000', '?', '?'];

        it('max is half the ticks',() => {
            var expected = ['VRooom', '1984', 'YEAR', '?'];
            var actual = AxisHelper.getRecommendedTickValuesForAnOrdinalRange(4, labels);
            expect(actual).toEqual(expected);
        });

        it('max is zero ticks',() => {
            var expected = [];
            var actual = AxisHelper.getRecommendedTickValuesForAnOrdinalRange(0, labels);
            expect(actual).toEqual(expected);
        });

        it('max is negative ticks',() => {
            var expected = [];
            var actual = AxisHelper.getRecommendedTickValuesForAnOrdinalRange(-1, labels);
            expect(actual).toEqual(expected);
        });

        it('max is equal to ticks',() => {
            var expected = labels;
            var actual = AxisHelper.getRecommendedTickValuesForAnOrdinalRange(8, labels);
            expect(actual).toEqual(expected);
        });

        it('max is more than ticks',() => {
            var expected = labels;
            var actual = AxisHelper.getRecommendedTickValuesForAnOrdinalRange(10, labels);
            expect(actual).toEqual(expected);
        });

        it('getRecommendedTickValues: ordinal index',() => {
            var expected = [0, 2, 4, 6, 8];
            var scale = AxisHelper.createOrdinalScale(400, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0.4);
            var actual = AxisHelper.getRecommendedTickValues(5, scale, ValueType.fromDescriptor({ text: true }), false);
            expect(actual).toEqual(expected);
        });

        it('getRecommendedTickValues: ordinal index - zero maxTicks',() => {
            var vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var scale = AxisHelper.createOrdinalScale(400, vals, 0.4);
            var actual = AxisHelper.getRecommendedTickValues(0, scale, ValueType.fromDescriptor({ text: true }), false);
            expect(actual).toEqual([]);
        });

        it('getRecommendedTickValues: ordinal index - maxTicks greater than len',() => {
            var vals = [0, 1, 2, 3, 4];
            var scale = AxisHelper.createOrdinalScale(400, vals, 0.4);
            var actual = AxisHelper.getRecommendedTickValues(6, scale, ValueType.fromDescriptor({ text: true }), false);
            expect(actual).toEqual(vals);
        });

        // linear domains are always [min,max], only two values, and are already D3.nice()
        it('getRecommendedTickValues: scalar numeric - easy',() => {
            var expected = [0, 20, 40, 60, 80, 100];
            var scale = AxisHelper.createLinearScale(400, [0, 100]);
            var actual = AxisHelper.getRecommendedTickValues(6, scale, ValueType.fromDescriptor({ numeric: true }), true);
            expect(actual).toEqual(expected);
        });

        it('getRecommendedTickValues: 0 tick count',() => {
            var expected = [];
            var scale = AxisHelper.createLinearScale(400, [0, 100]);
            var actual = AxisHelper.getRecommendedTickValues(0, scale, ValueType.fromDescriptor({ numeric: true }), true);
            expect(actual).toEqual(expected);
        });

        it('getRecommendedTickValues: single value domain returns 0 ticks',() => {
            var expected = [];
            var scale = AxisHelper.createLinearScale(400, [1, 1]);
            var actual = AxisHelper.getRecommendedTickValues(5, scale, ValueType.fromDescriptor({ numeric: true }), true);
            expect(actual).toEqual(expected);
        });

        it('getRecommendedTickValues: positive range',() => {
            var expected = [60, 80, 100];
            var scale = AxisHelper.createLinearScale(400, [60, 100]);
            var actual = AxisHelper.getRecommendedTickValues(3, scale, ValueType.fromDescriptor({ numeric: true }), true);
            expect(actual).toEqual(expected);
        });

        it('getRecommendedTickValues: negative range',() => {
            var expected = [-200, -180, -160, -140, -120, -100];
            var scale = AxisHelper.createLinearScale(400, [-200, -100]);
            var actual = AxisHelper.getRecommendedTickValues(6, scale, ValueType.fromDescriptor({ numeric: true }), true);
            expect(actual).toEqual(expected);
        });

        it('getRecommendedTickValues: 0 between min and max',() => {
            var expected = [0, 50, 100];
            var scale = AxisHelper.createLinearScale(400, [-20, 100]);
            var actual = AxisHelper.getRecommendedTickValues(4, scale, ValueType.fromDescriptor({ numeric: true }), true);
            expect(actual).toEqual(expected);
        });

        it('getRecommendedTickValues: very precise decimal values and funny d3 zero tick values',() => {
            // Zero value originally returned from d3 ticks() call is '-1.7763568394002505e-17' (i.e. -1e-33)
            var expected = [-0.15000000000000002, -0.10000000000000002, -0.05000000000000002, 0, 0.04999999999999998, 0.09999999999999998];
            var scale = AxisHelper.createLinearScale(400, [-0.150000000000002, .10000000008000006]);
            var actual = AxisHelper.getRecommendedTickValues(6, scale, ValueType.fromDescriptor({ numeric: true }), true);
            expect(actual).toEqual(expected);
        });

        it('getRecommendedTickValues: integer type should not return fractional tick values',() => {
            var expected = [0, 1];
            var scale = AxisHelper.createLinearScale(500, [0, 1]);
            var actual = AxisHelper.getRecommendedTickValues(8, scale, ValueType.fromDescriptor({ integer: true }), true, 1);
            expect(actual).toEqual(expected);
        });

        it('getRecommendedTickValues: remove ticks that are more precise than the formatString',() => {
            var expected = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
            var scale = AxisHelper.createLinearScale(500, [0, 0.5]);
            var actual = AxisHelper.getRecommendedTickValues(11, scale, ValueType.fromDescriptor({ numeric: true }), true, 0.1);
            expect(actual).toEqual(expected);
        });

        it('ensureValuesInRange: unsorted tick values',() => {
            var values = [1, 2, 3, 4, 5];
            var actual = AxisHelper.ensureValuesInRange(values, 2.2, 5.5);
            expect(actual).toEqual([3, 4, 5]);
        });

        it('ensureValuesInRange: only one value in range',() => {
            var values = [1, 2, 3, 4, 5];
            var actual = AxisHelper.ensureValuesInRange(values, 1.5, 2.5);
            expect(actual).toEqual([1.5, 2.5]);
        });

        it('ensureValuesInRange: no value in range',() => {
            var values = [1, 2];
            var actual = AxisHelper.ensureValuesInRange(values, 1.25, 1.75);
            expect(actual).toEqual([1.25, 1.75]);
        });
    });

    describe("AxisHelper get best number of ticks tests",() => {
        var dataViewMetadataColumnWithIntegersOnly: powerbi.DataViewMetadataColumn[] = [
            {
                displayName: 'col1',
                isMeasure: true,
                type: ValueType.fromDescriptor({ integer: true })
            },
            {
                displayName: 'col2',
                isMeasure: true,
                type: ValueType.fromDescriptor({ integer: true })
            }
        ];

        var dataViewMetadataColumnWithNonInteger: powerbi.DataViewMetadataColumn[] = [
            {
                displayName: 'col1',
                isMeasure: true,
                type: ValueType.fromDescriptor({ integer: true })
            },
            {
                displayName: 'col2',
                isMeasure: true,
                type: ValueType.fromDescriptor({ numeric: true })
            }
        ];

        it('dataViewMetadataColumn with only integers small range',() => {
            var actual = AxisHelper.getBestNumberOfTicks(0, 3, dataViewMetadataColumnWithIntegersOnly, 6);
            expect(actual).toBe(4); // [0,1,2,3]
        });

        it('dataViewMetadataColumn with only integers large range',() => {
            var actual = AxisHelper.getBestNumberOfTicks(0, 10, dataViewMetadataColumnWithIntegersOnly, 6);
            expect(actual).toBe(6);
        });

        it('hundred percent dataViewMetadataColumn with only integers',() => {
            var actual = AxisHelper.getBestNumberOfTicks(0, 1, dataViewMetadataColumnWithIntegersOnly, 6);
            expect(actual).toBe(6);
        });

        it('dataViewMetadataColumn with non integers',() => {
            var actual = AxisHelper.getBestNumberOfTicks(0, 3, dataViewMetadataColumnWithNonInteger, 6);
            expect(actual).toBe(6);
        });

        it('dataViewMetadataColumn with NaN min/max',() => {
            var actual = AxisHelper.getBestNumberOfTicks(NaN, 3, dataViewMetadataColumnWithNonInteger, 6);
            expect(actual).toBe(3);
            actual = AxisHelper.getBestNumberOfTicks(1, NaN, dataViewMetadataColumnWithNonInteger, 6);
            expect(actual).toBe(3);
            actual = AxisHelper.getBestNumberOfTicks(NaN, NaN, dataViewMetadataColumnWithNonInteger, 6);
            expect(actual).toBe(3);
        });
    });

    describe("AxisHelper diffScaled",() => {
        var scale: D3.Scale.GenericQuantitativeScale<any>;

        beforeEach(() => {
            var range = [0, 999];
            var domain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 999];
            scale = d3.scale.linear()
                .range(range)
                .domain(domain);
        });

        it('diffScaled: zero',() => {
            expect(AxisHelper.diffScaled(scale, 0, 0)).toBe(0);
        });

        it('diffScaled: small nonzero +ve',() => {
            expect(AxisHelper.diffScaled(scale, 0.00000001, 0)).toBe(1);
        });

        it('diffScaled: small nonzero -ve',() => {
            expect(AxisHelper.diffScaled(scale, -0.00000001, 0)).toBe(-1);
        });
    });

    describe("AxisHelper getRecommendedNumberOfTicks tests",() => {
        it('getRecommendedNumberOfTicksForXAxis small tile',() => {
            var tickCount = AxisHelper.getRecommendedNumberOfTicksForXAxis(220);
            expect(tickCount).toBe(3);
        });

        it('getRecommendedNumberOfTicksForXAxis median tile',() => {
            var tickCount = AxisHelper.getRecommendedNumberOfTicksForXAxis(480);
            expect(tickCount).toBe(5);
        });

        it('getRecommendedNumberOfTicksForXAxis large tile',() => {
            var tickCount = AxisHelper.getRecommendedNumberOfTicksForXAxis(730);
            expect(tickCount).toBe(8);
        });

        it('getRecommendedNumberOfTicksForYAxis small tile',() => {
            var tickCount = AxisHelper.getRecommendedNumberOfTicksForYAxis(80);
            expect(tickCount).toBe(3);
        });

        it('getRecommendedNumberOfTicksForYAxis median tile',() => {
            var tickCount = AxisHelper.getRecommendedNumberOfTicksForYAxis(230);
            expect(tickCount).toBe(5);
        });

        it('getRecommendedNumberOfTicksForYAxis large tile',() => {
            var tickCount = AxisHelper.getRecommendedNumberOfTicksForYAxis(350);
            expect(tickCount).toBe(8);
        });
    });

    describe("AxisHelper margins",() => {
        var viewPort: powerbi.IViewport = { width: 10, height: 20 };
        var xAxisProperties: powerbi.visuals.IAxisProperties = {
            scale: undefined,
            axis: undefined,
            values: [87, 78],
            axisType: undefined,
            formatter: undefined,
            axisLabel: '',
            isCategoryAxis: true,
            xLabelMaxWidth: 20,
        };
        var y1AxisProperties: powerbi.visuals.IAxisProperties = {
            scale: undefined,
            axis: undefined,
            values: [20, 30, 50],
            axisType: undefined,
            formatter: undefined,
            axisLabel: '',
            isCategoryAxis: true,
            xLabelMaxWidth: 20,
        };

        var y2AxisProperties: powerbi.visuals.IAxisProperties = {
            scale: undefined,
            axis: undefined,
            values: [2000, 3000, 5000],
            axisType: undefined,
            formatter: undefined,
            axisLabel: '',
            isCategoryAxis: true,
            xLabelMaxWidth: 20,
        };
		
        var textProperties: powerbi.TextProperties = {
            fontFamily: '',
            fontSize: '16',
        };

        it('Check that margins are calculatde correctly when you render 2 axes',() => {
            var tickCount = AxisHelper.getTickLabelMargins(
                viewPort,
                20,
                powerbi.TextMeasurementService.measureSvgTextWidth,
                xAxisProperties,
                y1AxisProperties,
                true,
                77,
                textProperties,
                y2AxisProperties,
                undefined,
                false,
                true,
                true,
                true);

            expect(tickCount.xMax).toBe(7);
            expect(tickCount.yLeft).toBe(12);
            expect(tickCount.yRight).toBe(24);
        });

        it('Check that margins are calculated correctly when you hide all axes',() => {
            var tickCount = AxisHelper.getTickLabelMargins(
                viewPort,
                20,
                powerbi.TextMeasurementService.measureSvgTextWidth,
                xAxisProperties,
                y1AxisProperties,
                true,
                77,
                textProperties,
                y2AxisProperties,
                undefined,
                false,
                false,
                false,
                false);

            expect(tickCount.xMax).toBe(0);
            expect(tickCount.yLeft).toBe(0);
            expect(tickCount.yRight).toBe(0);
        });

        it('Disable the secondary axis',() => {
            var tickCount = AxisHelper.getTickLabelMargins(
                viewPort,
                20,
                powerbi.TextMeasurementService.measureSvgTextWidth,
                xAxisProperties,
                y1AxisProperties,
                true,
                77,
                textProperties,
                y2AxisProperties,
                undefined,
                false,//switch the left and right axes
                true,
                true,
                false);//don't display secondary which is on the left now

            expect(tickCount.xMax).toBe(7);
            expect(tickCount.yLeft).toBe(12);
            expect(tickCount.yRight).toBe(0);
        });

        it('Switch the y-axes, and disable the secondary axis',() => {
            var tickCount = AxisHelper.getTickLabelMargins(
                viewPort,
                20,
                powerbi.TextMeasurementService.measureSvgTextWidth,
                xAxisProperties,
                y1AxisProperties,
                true,
                77,
                textProperties,
                y2AxisProperties,
                undefined,
                true,//switch the left and right axes
                true,
                true,
                false);//don't display secondary which is on the left now

            expect(tickCount.xMax).toBe(7);
            expect(tickCount.yLeft).toBe(0);
            expect(tickCount.yRight).toBe(12);
        });

    });

    describe("AxisHelper apply new domain",() => { 
        it('Check that customized domain is set on existing domain',() => {
            var customizedDomain = [undefined, 20];
            var existingDomain = [0, 10];
            var newDomain = AxisHelper.applyCustomizedDomain(customizedDomain, existingDomain);
            expect(newDomain[0]).toBe(0);
            expect(newDomain[1]).toBe(20);

            customizedDomain = [undefined, undefined];
            existingDomain = [0, 10];
            newDomain = AxisHelper.applyCustomizedDomain(customizedDomain, existingDomain);
            expect(newDomain[0]).toBe(0);
            expect(newDomain[1]).toBe(10);

            customizedDomain = [5, undefined];
            existingDomain = [0, 10];
            newDomain = AxisHelper.applyCustomizedDomain(customizedDomain, existingDomain);
            expect(newDomain[0]).toBe(5);
            expect(newDomain[1]).toBe(10);

            customizedDomain = [5, 20];
            existingDomain = [0, 10];
            newDomain = AxisHelper.applyCustomizedDomain(customizedDomain, existingDomain);
            expect(newDomain[0]).toBe(5);
            expect(newDomain[1]).toBe(20);
            
        });

        it('Check that customized domain is set on null domain',() => {
            var customizedDomain = [undefined, undefined];
            var existingDomain;
            var newDomain = AxisHelper.applyCustomizedDomain(customizedDomain, existingDomain);
            expect(newDomain).toBeUndefined();
            
            customizedDomain = [10, 20];
            var existingDomain;
            var newDomain = AxisHelper.applyCustomizedDomain(customizedDomain, existingDomain);
            expect(newDomain[0]).toBe(10);
            expect(newDomain[1]).toBe(20);

            customizedDomain = [undefined, 20];
            var existingDomain;
            var newDomain = AxisHelper.applyCustomizedDomain(customizedDomain, existingDomain);
            expect(newDomain[0]).toBe(undefined);
            expect(newDomain[1]).toBe(20);

            customizedDomain = [10, undefined];
            var existingDomain;
            var newDomain = AxisHelper.applyCustomizedDomain(customizedDomain, existingDomain);
            expect(newDomain[0]).toBe(10);
            expect(newDomain[1]).toBe(undefined);
        });        
    });
}
