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

module powerbi {
    export var CategoryTypes = {
        Address: "Address",
        City: "City",
        Continent: "Continent",
        CountryRegion: "Country", // The text has to stay "Country" because it is used as a key in the geocoding caching dictionary
        County: "County",
        Longitude: "Longitude",
        Latitude: "Latitude",
        Place: "Place",
        PostalCode: "PostalCode",
        StateOrProvince: "StateOrProvince"
    };

    export interface IGeoTaggingAnalyzerService {
        isLongitudeOrLatitude(fieldRefName: string): boolean;
        isGeographic(fieldRefName: string): boolean;
        isGeocodable(fieldRefName: string): boolean;
        getFieldType(fieldName: string): string;
    }

    export function createGeoTaggingAnalyzerService(getLocalized: (string) => string): IGeoTaggingAnalyzerService {
        return new GeoTaggingAnalyzerService(getLocalized);
    }

    var EnglishBackup = {
        GeotaggingString_Continent: "continent",
        GeotaggingString_Continents: "continents",
        GeotaggingString_Country: "country",
        GeotaggingString_Countries: "countries",
        GeotaggingString_State: "state",
        GeotaggingString_States: "states",
        GeotaggingString_City: "city",
        GeotaggingString_Cities: "cities",
        GeotaggingString_Town: "town",
        GeotaggingString_Towns: "towns",
        GeotaggingString_Province: "province",
        GeotaggingString_Provinces: "provinces",
        GeotaggingString_County: "county",
        GeotaggingString_Counties: "counties",
        GeotaggingString_Village: "village",
        GeotaggingString_Villages: "villages",
        GeotaggingString_Post: "post",
        GeotaggingString_Zip: "zip",
        GeotaggingString_Code: "code",
        GeotaggingString_Place: "place",
        GeotaggingString_Places: "places",
        GeotaggingString_Address: "address",
        GeotaggingString_Addresses: "addresses",
        GeotaggingString_Street: "street",
        GeotaggingString_Streets: "streets",
        GeotaggingString_Longitude: "longitude",
        GeotaggingString_Longitude_Short: "lon",
        GeotaggingString_Latitude: "latitude",
        GeotaggingString_Latitude_Short: "lat",
        GeotaggingString_PostalCode: "postal code",
        GeotaggingString_PostalCodes: "postal codes",
        GeotaggingString_ZipCode: "zip code",
        GeotaggingString_ZipCodes: "zip codes",
        GeotaggingString_Territory: "territory",
        GeotaggingString_Territories: "territories",
        GeotaggingString_VRMBackCompat_CountryRegion: "CountryRegion",
        GeotaggingString_VRMBackCompat_StateOrProvince: "StateOrProvince"
    };

    export class GeoTaggingAnalyzerService implements IGeoTaggingAnalyzerService {
        private GeotaggingString_Continent;
        private GeotaggingString_Continents;
        private GeotaggingString_Country;
        private GeotaggingString_Countries;
        private GeotaggingString_State;
        private GeotaggingString_States;
        private GeotaggingString_City;
        private GeotaggingString_Cities;
        private GeotaggingString_Town;
        private GeotaggingString_Towns;
        private GeotaggingString_Province;
        private GeotaggingString_Provinces;
        private GeotaggingString_County;
        private GeotaggingString_Counties;
        private GeotaggingString_Village;
        private GeotaggingString_Villages;
        private GeotaggingString_Post;
        private GeotaggingString_Zip;
        private GeotaggingString_Code;
        private GeotaggingString_Place;
        private GeotaggingString_Places;
        private GeotaggingString_Address;
        private GeotaggingString_Addresses;
        private GeotaggingString_Street;
        private GeotaggingString_Streets;
        private GeotaggingString_Longitude;
        private GeotaggingString_Longitude_Short;
        private GeotaggingString_Latitude;
        private GeotaggingString_Latitude_Short;
        private GeotaggingString_PostalCode;
        private GeotaggingString_PostalCodes;
        private GeotaggingString_ZipCode;
        private GeotaggingString_ZipCodes;
        private GeotaggingString_Territory;
        private GeotaggingString_Territories;
        private GeotaggingString_VRMBackCompat_CountryRegion = "CountryRegion";
        private GeotaggingString_VRMBackCompat_StateOrProvince = "StateOrProvince";

        constructor(getLocalized: (string) => string) {
            this.GeotaggingString_Continent = getLocalized("GeotaggingString_Continent").toLowerCase();
            this.GeotaggingString_Continents = getLocalized("GeotaggingString_Continents").toLowerCase();
            this.GeotaggingString_Country = getLocalized("GeotaggingString_Country").toLowerCase();
            this.GeotaggingString_Countries = getLocalized("GeotaggingString_Countries").toLowerCase();
            this.GeotaggingString_State = getLocalized("GeotaggingString_State").toLowerCase();
            this.GeotaggingString_States = getLocalized("GeotaggingString_States").toLowerCase();
            this.GeotaggingString_City = getLocalized("GeotaggingString_City").toLowerCase();
            this.GeotaggingString_Cities = getLocalized("GeotaggingString_Cities").toLowerCase();
            this.GeotaggingString_Town = getLocalized("GeotaggingString_Town").toLowerCase();
            this.GeotaggingString_Towns = getLocalized("GeotaggingString_Towns").toLowerCase();
            this.GeotaggingString_Province = getLocalized("GeotaggingString_Province").toLowerCase();
            this.GeotaggingString_Provinces = getLocalized("GeotaggingString_Provinces").toLowerCase();
            this.GeotaggingString_County = getLocalized("GeotaggingString_County").toLowerCase();
            this.GeotaggingString_Counties = getLocalized("GeotaggingString_Counties").toLowerCase();
            this.GeotaggingString_Village = getLocalized("GeotaggingString_Village").toLowerCase();
            this.GeotaggingString_Villages = getLocalized("GeotaggingString_Villages").toLowerCase();
            this.GeotaggingString_Post = getLocalized("GeotaggingString_Post").toLowerCase();
            this.GeotaggingString_Zip = getLocalized("GeotaggingString_Zip").toLowerCase();
            this.GeotaggingString_Code = getLocalized("GeotaggingString_Code").toLowerCase();
            this.GeotaggingString_Place = getLocalized("GeotaggingString_Place").toLowerCase();
            this.GeotaggingString_Places = getLocalized("GeotaggingString_Places").toLowerCase();
            this.GeotaggingString_Address = getLocalized("GeotaggingString_Address").toLowerCase();
            this.GeotaggingString_Addresses = getLocalized("GeotaggingString_Addresses").toLowerCase();
            this.GeotaggingString_Street = getLocalized("GeotaggingString_Street").toLowerCase();
            this.GeotaggingString_Streets = getLocalized("GeotaggingString_Streets").toLowerCase();
            this.GeotaggingString_Longitude = getLocalized("GeotaggingString_Longitude").toLowerCase();
            this.GeotaggingString_Longitude_Short = getLocalized("GeotaggingString_Longitude_Short").toLowerCase();
            this.GeotaggingString_Latitude = getLocalized("GeotaggingString_Latitude").toLowerCase();
            this.GeotaggingString_Latitude_Short = getLocalized("GeotaggingString_Latitude_Short").toLowerCase();
            this.GeotaggingString_PostalCode = getLocalized("GeotaggingString_PostalCode").toLowerCase();
            this.GeotaggingString_PostalCodes = getLocalized("GeotaggingString_PostalCodes").toLowerCase();
            this.GeotaggingString_ZipCode = getLocalized("GeotaggingString_ZipCode").toLowerCase();
            this.GeotaggingString_ZipCodes = getLocalized("GeotaggingString_ZipCodes").toLowerCase();
            this.GeotaggingString_Territory = getLocalized("GeotaggingString_Territory").toLowerCase();
            this.GeotaggingString_Territories = getLocalized("GeotaggingString_Territories").toLowerCase();
        }

        public isLongitudeOrLatitude(fieldRefName: string): boolean {
            return this.isLongitude(fieldRefName) ||
                this.isLatitude(fieldRefName);
        }

        public isGeographic(fieldRefName: string): boolean {
            return this.isLongitudeOrLatitude(fieldRefName) ||
                this.isGeocodable(fieldRefName);
        }

        public isGeocodable(fieldRefName: string): boolean {
            return this.isAddress(fieldRefName) ||
                this.isCity(fieldRefName) ||
                this.isContinent(fieldRefName) ||
                this.isCountry(fieldRefName) ||
                this.isCounty(fieldRefName) ||
                this.isStateOrProvince(fieldRefName) ||
                this.isPlace(fieldRefName) ||
                this.isPostalCode(fieldRefName) ||
                this.isTerritory(fieldRefName);
        }

        private isAddress(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                this.GeotaggingString_Address,
                this.GeotaggingString_Addresses,
                this.GeotaggingString_Street,
                this.GeotaggingString_Streets
            ]);
        }

        private isPlace(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                this.GeotaggingString_Place,
                this.GeotaggingString_Places
            ]);
        }

        private isCity(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                this.GeotaggingString_City,
                this.GeotaggingString_Cities,
                this.GeotaggingString_Town,
                this.GeotaggingString_Towns,
                this.GeotaggingString_Village,
                this.GeotaggingString_Villages
            ]);
        }

        private isStateOrProvince(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                this.GeotaggingString_State,
                this.GeotaggingString_States,
                this.GeotaggingString_Province,
                this.GeotaggingString_Provinces,
                this.GeotaggingString_VRMBackCompat_StateOrProvince,
            ]);
        }

        private isCountry(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                this.GeotaggingString_Country,
                this.GeotaggingString_Countries,
                this.GeotaggingString_VRMBackCompat_CountryRegion
            ]);
        }

        private isCounty(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                this.GeotaggingString_County,
                this.GeotaggingString_Counties
            ]);
        }

        private isContinent(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                this.GeotaggingString_Continent,
                this.GeotaggingString_Continents
            ]);
        }

        private isPostalCode(fieldRefName: string): boolean {
            var result =
                (GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                    this.GeotaggingString_Post,
                    this.GeotaggingString_Zip])
                    && GeoTaggingAnalyzerService.hasMatches(fieldRefName, [this.GeotaggingString_Code])) ||
                GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                    this.GeotaggingString_PostalCode,
                    this.GeotaggingString_PostalCodes,
                    this.GeotaggingString_ZipCode,
                    this.GeotaggingString_ZipCodes
                ]);

            //Check again for strings without whitespace
            if (!result) {
                var whiteSpaceRegexPattern = new RegExp('\s');
                result = GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                    this.GeotaggingString_PostalCode.replace(whiteSpaceRegexPattern, ''),
                    this.GeotaggingString_PostalCodes.replace(whiteSpaceRegexPattern, ''),
                    this.GeotaggingString_ZipCode.replace(whiteSpaceRegexPattern, ''),
                    this.GeotaggingString_ZipCodes.replace(whiteSpaceRegexPattern, '')
                ]);
            }

            return result;
        }

        private isLongitude(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                this.GeotaggingString_Longitude,
                this.GeotaggingString_Longitude_Short
            ]);
        }

        private isLatitude(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                this.GeotaggingString_Latitude,
                this.GeotaggingString_Latitude_Short
            ]);
        }

        private isTerritory(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                this.GeotaggingString_Territory,
                this.GeotaggingString_Territories
            ]);
        }

        private static hasMatches(fieldName: string, possibleMatches: string[]): boolean {
            var value = fieldName.toLowerCase();

            for (var i = 0, len = possibleMatches.length; i < len; i++) {
                var possibleMatch = possibleMatches[i];
                if (value.indexOf(possibleMatch) > -1)
                    return true;
            }

            return false;
        }

        public getFieldType(fieldName: string): string {
            if (fieldName == null)
                return undefined;
            if (this.isLatitude(fieldName))
                return CategoryTypes.Latitude;
            if (this.isLongitude(fieldName))
                return CategoryTypes.Longitude;
            if (this.isPostalCode(fieldName))
                return CategoryTypes.PostalCode;
            if (this.isAddress(fieldName))
                return CategoryTypes.Address;
            if (this.isPlace(fieldName))
                return CategoryTypes.Place;
            if (this.isCity(fieldName))
                return CategoryTypes.City;
            if (this.isCountry(fieldName))
                return CategoryTypes.CountryRegion;
            if (this.isCounty(fieldName))
                return CategoryTypes.County;
            if (this.isStateOrProvince(fieldName))
                return CategoryTypes.StateOrProvince;
            if (this.isContinent(fieldName))
                return CategoryTypes.Continent;
            return this.getEnglishFieldType(fieldName);
        }

        private isEnglishAddress(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                EnglishBackup.GeotaggingString_Address,
                EnglishBackup.GeotaggingString_Addresses,
                EnglishBackup.GeotaggingString_Street,
                EnglishBackup.GeotaggingString_Streets
            ]);
        }

        private isEnglishPlace(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                EnglishBackup.GeotaggingString_Place,
                EnglishBackup.GeotaggingString_Places
            ]);
        }

        private isEnglishCity(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                EnglishBackup.GeotaggingString_City,
                EnglishBackup.GeotaggingString_Cities,
                EnglishBackup.GeotaggingString_Town,
                EnglishBackup.GeotaggingString_Towns,
                EnglishBackup.GeotaggingString_Village,
                EnglishBackup.GeotaggingString_Villages
            ]);
        }

        private isEnglishStateOrProvince(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                EnglishBackup.GeotaggingString_State,
                EnglishBackup.GeotaggingString_States,
                EnglishBackup.GeotaggingString_Province,
                EnglishBackup.GeotaggingString_Provinces,
                EnglishBackup.GeotaggingString_VRMBackCompat_StateOrProvince,
            ]);
        }

        private isEnglishCountry(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                EnglishBackup.GeotaggingString_Country,
                EnglishBackup.GeotaggingString_Countries,
                EnglishBackup.GeotaggingString_VRMBackCompat_CountryRegion
            ]);
        }

        private isEnglishCounty(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                EnglishBackup.GeotaggingString_County,
                EnglishBackup.GeotaggingString_Counties
            ]);
        }

        private isEnglishContinent(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                EnglishBackup.GeotaggingString_Continent,
                EnglishBackup.GeotaggingString_Continents
            ]);
        }

        private isEnglishPostalCode(fieldRefName: string): boolean {
            var result =
                (GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                    EnglishBackup.GeotaggingString_Post,
                    EnglishBackup.GeotaggingString_Zip])
                && GeoTaggingAnalyzerService.hasMatches(fieldRefName, [this.GeotaggingString_Code])) ||
                GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                    EnglishBackup.GeotaggingString_PostalCode,
                    EnglishBackup.GeotaggingString_PostalCodes,
                    EnglishBackup.GeotaggingString_ZipCode,
                    EnglishBackup.GeotaggingString_ZipCodes
                ]);

            //Check again for strings without whitespace
            if (!result) {
                var whiteSpaceRegexPattern = new RegExp('\s');
                result = GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                    EnglishBackup.GeotaggingString_PostalCode.replace(whiteSpaceRegexPattern, ''),
                    EnglishBackup.GeotaggingString_PostalCodes.replace(whiteSpaceRegexPattern, ''),
                    EnglishBackup.GeotaggingString_ZipCode.replace(whiteSpaceRegexPattern, ''),
                    EnglishBackup.GeotaggingString_ZipCodes.replace(whiteSpaceRegexPattern, '')
                ]);
            }

            return result;
        }

        private isEnglishLongitude(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                EnglishBackup.GeotaggingString_Longitude,
                EnglishBackup.GeotaggingString_Longitude_Short
            ]);
        }

        private isEnglishLatitude(fieldRefName: string): boolean {
            return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
                EnglishBackup.GeotaggingString_Latitude,
                EnglishBackup.GeotaggingString_Latitude_Short
            ]);
        }

        //private isEnglishTerritory(fieldRefName: string): boolean {
        //    return GeoTaggingAnalyzerService.hasMatches(fieldRefName, [
        //        EnglishBackup.GeotaggingString_Territory,
        //        EnglishBackup.GeotaggingString_Territories
        //    ]);
        //}

        private getEnglishFieldType(fieldName: string): string {
            if (fieldName == null)
                return undefined;
            if (this.isEnglishLatitude(fieldName))
                return CategoryTypes.Latitude;
            if (this.isEnglishLongitude(fieldName))
                return CategoryTypes.Longitude;
            if (this.isEnglishPostalCode(fieldName))
                return CategoryTypes.PostalCode;
            if (this.isEnglishAddress(fieldName))
                return CategoryTypes.Address;
            if (this.isEnglishPlace(fieldName))
                return CategoryTypes.Place;
            if (this.isEnglishCity(fieldName))
                return CategoryTypes.City;
            if (this.isEnglishCountry(fieldName))
                return CategoryTypes.CountryRegion;
            if (this.isEnglishCounty(fieldName))
                return CategoryTypes.County;
            if (this.isEnglishStateOrProvince(fieldName))
                return CategoryTypes.StateOrProvince;
            if (this.isEnglishContinent(fieldName))
                return CategoryTypes.Continent;
            return undefined;
        }
    }
} 