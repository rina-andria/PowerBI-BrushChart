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

module powerbitests {
    import GeocodingManager = powerbi.visuals.BI.Services.GeocodingManager;

    describe("GeocodingManagerTests", () => {
        describe("GeocodingManager.isCategoryType", () => {
            it("GeocodingManager.CategoryTypes.Address", () => {
                expect(GeocodingManager.isCategoryType(GeocodingManager.CategoryTypes.Address)).toBeTruthy();
            });

            it("GeocodingManager.CategoryTypes.City", () => {
                expect(GeocodingManager.isCategoryType(GeocodingManager.CategoryTypes.City)).toBeTruthy();
            });

            it("GeocodingManager.CategoryTypes.Continent", () => {
                expect(GeocodingManager.isCategoryType(GeocodingManager.CategoryTypes.Continent)).toBeTruthy();
            });

            it("GeocodingManager.CategoryTypes Country", () => {
                expect(GeocodingManager.isCategoryType("Country")).toBeTruthy(); // Country is special
            });

            it("GeocodingManager.CategoryTypes.County", () => {
                expect(GeocodingManager.isCategoryType(GeocodingManager.CategoryTypes.County)).toBeTruthy();
            });

            it("GeocodingManager.CategoryTypes.Longitude", () => {
                expect(GeocodingManager.isCategoryType(GeocodingManager.CategoryTypes.Longitude)).toBeTruthy();
            });

            it("GeocodingManager.CategoryTypes.Latitude", () => {
                expect(GeocodingManager.isCategoryType(GeocodingManager.CategoryTypes.Latitude)).toBeTruthy();
            });

            it("GeocodingManager.CategoryTypes.Place", () => {
                expect(GeocodingManager.isCategoryType(GeocodingManager.CategoryTypes.Place)).toBeTruthy();
            });

            it("GeocodingManager.CategoryTypes.PostalCode", () => {
                expect(GeocodingManager.isCategoryType(GeocodingManager.CategoryTypes.PostalCode)).toBeTruthy();
            });

            it("GeocodingManager.CategoryTypes.StateOrProvince", () => {
                expect(GeocodingManager.isCategoryType(GeocodingManager.CategoryTypes.StateOrProvince)).toBeTruthy();
            });
           
            it("GeocodingManager.CategoryTypes empty", () => {
                expect(GeocodingManager.isCategoryType("")).toBeFalsy();
            });
        });
    });
} 