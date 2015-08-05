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

module powerbi.data {
    export module PrimitiveValueEncoding {
        export function decimal(value: number): string {
            debug.assertValue(value, 'value');

            return value + 'M';
        }

        export function double(value: number): string {
            debug.assertValue(value, 'value');

            return value + 'D';
        }

        export function integer(value: number): string {
            debug.assertValue(value, 'value');

            return value + 'L';
        }

        export function dateTime(value: Date): string {
            debug.assertValue(value, 'value');
            // Currently, server doesn't support timezone. All date time data on the server don't have time zone information.
            // So, when we construct a dateTime object on the client, we will need to ignor user's time zone and force it to be UTC time.
            // When we subtract the timeZone offset, the date time object will remain the same value as you entered but dropped the local timeZone.
            var date = new Date(value.getTime() - (value.getTimezoneOffset() * 60000));
            var dateTimeString = date.toISOString();
            // If it ends with Z, we want to get rid of it, because with trailing Z, it will assume the dateTime is UTC, but we don't want any timeZone information, so
            // we will drop it.
            // Also, we need to add Prefix and Suffix to match the dsr value format for dateTime object.
            if (jsCommon.StringExtensions.endsWith(dateTimeString, 'Z'))
                dateTimeString = dateTimeString.substr(0, dateTimeString.length - 1);
            return "datetime'" + dateTimeString + "'";
        }

        export function text(value: string): string {
            debug.assertValue(value, 'value');

            return "'" + value.replace("'", "''") + "'";
        }

        export function nullEncoding(): string {
            return 'null';
        }

        export function boolean(value: boolean): string {
            return value ? 'true' : 'false';
        }
    }
}