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
/// <binding BeforeBuild='build' />
var gulp = require('gulp'); 
var merge = require('merge2');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var typedoc = require("gulp-typedoc");
var download = require("gulp-download");
var jasmineBrowser = require('gulp-jasmine-browser');
var spritesmith = require('gulp.spritesmith');
const tslint = require('gulp-tslint');

gulp.task('tslint', function(){
      return gulp.src(['src/Clients/VisualsCommon/**/*.ts','src/Clients/VisualsData/**/*.ts','src/Clients/Visuals/**/*.ts','!src/Clients/Visuals*/obj/*.*','!src/Clients/Visuals/**/*.obj.ts'])
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('build_visuals_projects', function() {

	var tsResult = gulp.src(['src/Clients/VisualsCommon/**/*.ts','src/Clients/VisualsData/**/*.ts','src/Clients/Visuals/**/*.ts','!src/Clients/Visuals*/obj/*.*','!src/Clients/Visuals*/**/*.obj.ts'])
	    .pipe(sourcemaps.init())
	    .pipe(ts({
	       sortOutput: true,
	       typescript: require('typescript'),
	        declarationFiles: true,
		    target:'ES5'
	      }));

  return merge([
	    tsResult.js.pipe(concat('powerbi-visuals.js')).pipe(sourcemaps.write({ sourceRoot: '../'})).pipe(gulp.dest('src/Clients/PowerBIVisualsPlayground'))
	    .pipe(uglify('powerbi-visuals.min.js')).pipe(gulp.dest('src/Clients/PowerBIVisualsPlayground')),
	    tsResult.dts.pipe(concat('powerbi-visuals.d.ts')).pipe(gulp.dest('src/Clients/PowerBIVisualsPlayground'))
    ]);
});

gulp.task('combine_js', function() {
	return gulp.src(['src/Clients/Externals/ThirdPartyIP/D3/*.min.js',
'src/Clients/Externals/ThirdPartyIP/GlobalizeJS/globalize.min.js', 
'src/Clients/Externals/ThirdPartyIP/GlobalizeJS/globalize.cultures.min.js', 
'src/Clients/Externals/ThirdPartyIP/JQuery/**/*.min.js',
'src/Clients/Externals/ThirdPartyIP/LoDash/*.min.js'])
.pipe(concat('externals.min.js')).pipe(gulp.dest('src/Clients/PowerBIVisualsPlayground'));
});

gulp.task('combine_js_all_min', function() {
	return gulp.src(['src/Clients/PowerBIVisualsPlayground/externals.min.js',
'src/Clients/PowerBIVisualsPlayground/powerbi-visuals.min.js'])
.pipe(concat('powerbi-visuals.all.min.js')).pipe(gulp.dest('src/Clients/PowerBIVisualsPlayground'));
});


gulp.task('combine_dts', function() {
	return gulp.src(['src/Clients/Typedefs/d3/*.d.ts',
'src/Clients/Typedefs/globalize/*.d.ts',
'src/Clients/Typedefs/jasmine/*.d.ts',
'src/Clients/Typedefs/jquery/*.d.ts',
'src/Clients/Typedefs/jquery-visible/*.d.ts',
'src/Clients/Typedefs/lodash/*.d.ts',
'src/Clients/Typedefs/microsoftMaps/*.d.ts',
'src/Clients/Typedefs/moment/*.d.ts',
'src/Clients/Typedefs/msrcrypto/*.d.ts',
'src/Clients/Typedefs/pako/*.d.ts',
'src/Clients/Typedefs/quill/*.d.ts',
'src/Clients/Typedefs/velocity/*.d.ts'
		]).pipe(concat('externals.d.ts')).pipe(gulp.dest('src/Clients/PowerBIVisualsPlayground'));
});

gulp.task('build_app', function() {

	var tsResult = gulp.src(['src/Clients/PowerBIVisualsPlayground/*.ts','!src/Clients/PowerBIVisualsPlayground/powerbi-visuals.d.ts','!src/Clients/PowerBIVisualsPlayground/externals.d.ts','!src/Clients/PowerBIVisualsPlayground*/obj/*.*','!src/Clients/PowerBIVisualsPlayground*/**/*.obj.ts'])
	    .pipe(ts({
	       typescript: require('typescript'),
		    target:'ES5'
	      }));

  return merge([
    tsResult.js.pipe(gulp.dest('src/Clients/PowerBIVisualsPlayground'))
   
    ]);
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/Clients/Visuals/images/sprite-src/*.png').pipe(spritesmith({
    imgName: 'images/visuals.sprites.png',
    cssName: 'styles/sprites.less'
  }));
  return spriteData.pipe(gulp.dest('src/Clients/Visuals/'));
});

gulp.task('build_visuals_less', function () {
  return gulp.src('src/Clients/Visuals/styles/visuals.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename('visuals.min.css'))
    .pipe(gulp.dest('src/Clients/PowerBIVisualsPlayground'));
});

// Download dependencies

gulp.task('dependencies', function() {
	download('https://raw.github.com/velesin/jasmine-jquery/master/lib/jasmine-jquery.js')
    		.pipe(gulp.dest("src/Clients/Externals/ThirdPartyIP/JasmineJQuery"));
});

gulp.task('build', function() {
	runSequence('dependencies', 'tslint', 'build_visuals_projects', 'combine_js', 'combine_js_all_min', 'combine_dts', 'build_app', 'sprite', 'build_visuals_less');
});


//--------------------------------  TESTs -------------------------------------------
gulp.task('build_dts', function() {

	var tsResult = gulp.src([
	'src/Clients/VisualsCommon/**/*.ts',
	'!src/Clients/VisualsCommon/obj/**',
	
	'src/Clients/VisualsData/**/*.ts',
	'!src/Clients/VisualsData/typedefs/typedefs.obj.ts',
	'!src/Clients/VisualsData/obj/**',
	
	'src/Clients/visuals/**/*.ts',
	'!src/Clients/visuals/typedefs/typedefs.obj.ts',
	'!src/Clients/visuals/obj/**'])
	    .pipe(sourcemaps.init())
	    .pipe(ts({
	       sortOutput: true,
	       typescript: require('typescript'),
	        declarationFiles: true,
		    target:'ES5'
	      }));

  return merge([

	    tsResult.dts.pipe(concat('visuals.d.ts')).pipe(gulp.dest('VisualsTests'))
    ]);
});

gulp.task('build_common_data', function() {

	var tsResult = gulp.src([	
	'src/Clients/Typedefs/d3/*.d.ts',
	'src/Clients/Typedefs/globalize/*.d.ts',
	'src/Clients/Typedefs/ie/*.d.ts',
	'src/Clients/Typedefs/jasmine/*.d.ts',
	'src/Clients/Typedefs/jquery/*.d.ts',
	'src/Clients/Typedefs/jquery-visible/*.d.ts',
	'src/Clients/Typedefs/lodash/*.d.ts',
	'src/Clients/Typedefs/microsoftMaps/*.d.ts',
	'src/Clients/Typedefs/moment/*.d.ts',
	'src/Clients/Typedefs/msrcrypto/*.d.ts',
	'src/Clients/Typedefs/pako/*.d.ts',
	'src/Clients/Typedefs/quill/*.d.ts',
	'src/Clients/Typedefs/velocity/*.d.ts',	
	
	'src/Clients/VisualsCommon/**/*.ts',
	'!src/Clients/VisualsCommon/obj/**',
    
	'src/Clients/VisualsData/**/*.ts',
	'!src/Clients/VisualsData/typedefs/typedefs.obj.ts',
	'!src/Clients/VisualsData/obj/**',	
	])
	    .pipe(sourcemaps.init())
	    .pipe(ts({
	       sortOutput: true,
	       typescript: require('typescript'),
	       declarationFiles: true,
		   noExternalResolve: true,
		    target:'ES5'
	      }));

  return merge([
	    tsResult.js.pipe(concat('common-data.js')).pipe(gulp.dest('VisualsTests'))
    ]);
});

gulp.task('build_visuals', function() {

	var tsResult = gulp.src([	
	'src/Clients/Typedefs/d3/*.d.ts',
	'src/Clients/Typedefs/globalize/*.d.ts',
	'src/Clients/Typedefs/ie/*.d.ts',
	'src/Clients/Typedefs/jasmine/*.d.ts',
	'src/Clients/Typedefs/jquery/*.d.ts',
	'src/Clients/Typedefs/jquery-visible/*.d.ts',
	'src/Clients/Typedefs/lodash/*.d.ts',
	'src/Clients/Typedefs/microsoftMaps/*.d.ts',
	'src/Clients/Typedefs/moment/*.d.ts',
	'src/Clients/Typedefs/msrcrypto/*.d.ts',
	'src/Clients/Typedefs/pako/*.d.ts',
	'src/Clients/Typedefs/quill/*.d.ts',
	'src/Clients/Typedefs/velocity/*.d.ts',		
	
	'src/Clients/VisualsCommon/**/*.ts',
	'!src/Clients/VisualsCommon/obj/**',
		
	'src/Clients/VisualsData/**/*.ts',
	'!src/Clients/VisualsData/typedefs/typedefs.obj.ts',
	'!src/Clients/VisualsData/obj/**',
	
	'src/Clients/visuals/**/*.ts',
	'!src/Clients/visuals/typedefs/typedefs.obj.ts',
	'!src/Clients/visuals/obj/**'])
	    .pipe(sourcemaps.init())
	    .pipe(ts({
	       sortOutput: true,
	       typescript: require('typescript'),
	       declarationFiles: true,
		   noExternalResolve: true,
		    target:'ES5'
	      }));

  return merge([
	    tsResult.js.pipe(concat('powerbi-visuals.js')).pipe(gulp.dest('VisualsTests'))
    ]);
});

gulp.task('build_tests', function() {

	var tsResult = gulp.src(
	['src/Clients/PowerBIVisualsTests/**/*.ts', 
	'!src/Clients/PowerBIVisualsTests/typedefs/typedefs.obj.ts',
	'src/Clients/Typedefs/d3/*.d.ts',
	'src/Clients/Typedefs/globalize/*.d.ts',
	'src/Clients/Typedefs/jasmine/*.d.ts',
	'src/Clients/Typedefs/jquery/*.d.ts',
	'src/Clients/Typedefs/jquery-visible/*.d.ts',
	'src/Clients/Typedefs/lodash/*.d.ts',
	'src/Clients/Typedefs/microsoftMaps/*.d.ts',
	'src/Clients/Typedefs/moment/*.d.ts',
	'src/Clients/Typedefs/msrcrypto/*.d.ts',
	'src/Clients/Typedefs/pako/*.d.ts',
	'src/Clients/Typedefs/quill/*.d.ts',
	'src/Clients/Typedefs/velocity/*.d.ts',	
	
	'VisualsTests/visuals.d.ts'])
	    .pipe(sourcemaps.init())
	    .pipe(ts({
	       sortOutput: true,
	       typescript: require('typescript'),
		   noExternalResolve: true,
		    target:'ES5'
	      }));

  return merge([
	    tsResult.js.pipe(concat('visuals-tests.js')).pipe(gulp.dest('VisualsTests'))
    ]);
});

gulp.task('run_tests', function() {
   return gulp.src([
	'src/Clients/externals/ThirdPartyIP/JQuery/2.1.3/jquery.min.js',
	'src/Clients/externals/ThirdPartyIP/D3/d3.min.js',
	'src/Clients/externals/ThirdPartyIP/JasmineJQuery/jasmine-jquery.js',
	'src/Clients/externals/ThirdPartyIP/LoDash/lodash.min.js',
	'src/Clients/externals/ThirdPartyIP/GlobalizeJS/globalize.min.js',
	'src/Clients/externals/ThirdPartyIP/MomentJS/moment.min.js',
	'src/Clients/externals/ThirdPartyIP/Velocity/velocity.min.js',
	'src/Clients/externals/ThirdPartyIP/Velocity/velocity.ui.min.js',
	'src/Clients/externals/ThirdPartyIP/QuillJS/quill.min.js',
			

	 'VisualsTests/common-data.js',
	 'VisualsTests/powerbi-visuals.js',

	'VisualsTests/visuals-tests.js'])
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless());

});


gulp.task('test', function() {
	runSequence('build_dts', 'build_common_data', 'build_visuals','build_tests', 'run_tests');
});
//--------------------------------  TESTs END ---------------------------------------

//--------------------------------  TYPE DOC ----------------------------------------

gulp.task('build_dtss', function() {

	var tsResult = gulp.src(['src/Clients/VisualsCommon/**/*.ts','src/Clients/VisualsData/**/*.ts','!src/Clients/Visuals*/obj/*.*','!src/Clients/Visuals*/**/*.obj.ts'])
	    .pipe(sourcemaps.init())
	    .pipe(ts({
	       sortOutput: true,
	       typescript: require('typescript'),
	        declarationFiles: true,
		    target:'ES5'
	      }));

  return tsResult.dts.pipe(concat('powerbi-visuals.d.ts')).pipe(gulp.dest('src/Clients/build'));
});


gulp.task("createdocs", function() {
    return gulp
        .src(['src/Clients/build/powerbi-visuals.d.ts','src/Clients/Visuals/**/*.ts','!src/Clients/Visuals*/obj/*.*','!src/Clients/Visuals*/**/*.obj.ts'])
        .pipe(typedoc({
            // TypeScript options (see typescript docs) 
            target: "ES5",
            //includeDeclarations: true,
            mode: 'file',
            // Output options (see typedoc docs) 
            out: "docs", 
            json: "docs/to/file.json",
 
            // TypeDoc options (see typedoc docs) 
            name: "PowerBI-Visuals", 
            ignoreCompilerErrors: true,
            version: true,
        }))
    ;
});

gulp.task('typedoc', function() {
	runSequence('build_dtss', 'createdocs');
});

//--------------------------------  TYPE DOC END -------------------------------------

// Default Task
gulp.task('default', ['build']);
