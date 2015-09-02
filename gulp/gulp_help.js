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

var gulp = require('gulp');

gulp.task('help', function () {

    console.log("\nPowerBI-visuals.\n");
    console.log("List of Gulp commands:\n");
    console.log("	build - to build the project. All js files will be minified.");
    console.log("	build_debug - build the project in debug mode.\n 			All js files will be unminified");
    console.log("	tslint - check the source files for tsLint erros.");
    console.log("	test - run tests.");
    console.log("	run:performance_tests - run only performance tests.\n\n");

    console.log("Gulp commands parameters:\n\n 	--debug  - to build files in debug mode (unminified)\n\n");

    console.log("Commands usage: gulp <name_of_command> --<parameter>.\nFor example: gulp build --debug.\n");
});