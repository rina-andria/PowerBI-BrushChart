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

gulp.task('help', function (callback) {

    console.log("\nPowerBI-visuals.\n");
    console.log("Commands usage: gulp <name_of_command> --<parameter>.\nFor example: gulp build --debug.\n");
    console.log("List of Gulp commands:\n");
    console.log("	build - to build the project. All js files will be minified.");
    console.log("	build_debug - build the project in debug mode.\n 			All js files will be unminified");
    console.log("	tslint - check the source files for tsLint erros.");
    console.log("	test - run tests.");
    console.log("	run:performance_tests - run only performance tests.\n\n");
    console.log("	continuous_build - run the build and then start watchers which\n"+
    "				will build project parts after you save\n"+
    "				changes to any file .");
    console.log("Gulp commands parameters:\n\n 	--debug (--d)  - to build files in debug mode\n\n"+
				" 	--openInBrowser (--o)  - in order to run all tests\n 				 (or single test) in browser\n"+
				" 		For example:\n"+
				"			gulp test --openInBrowser\" or \"gulp test --o\"\n"+
				"			- runs all tests;\n"+
				" 			gulp test --openInBrowser testName\" or \n"+
				"			\"gulp test --o testName\" - runs test\n"+
				"			\"testName\" in browser;\n\n"+
				"	--files (--f) 	-  is used to run tests in some .ts file\n\n"+
				" 		For example:\n"+
				"			\"gulp test --files testFileName\" or\n"+
				"			\"gulp test --f testFileName\" - runs tests that contains\n"+
				"			\"testFileName.ts\" file\n"+
				" 			\"gulp test --files testFileName --o\" or \n"+
				" 			\"gulp test --f testFileName --o\" - also it can be\n"+
				" 			used with \"--o\" option and in this case it runs all\n"+
				"			tests in testFileName.ts in browser\n");
});