/// <binding ProjectOpened='preload_debug' />
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
var merge = require('merge2');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');
var rename = require("gulp-rename");
var runSequence = require("run-sequence");
var ts = require("gulp-typescript");
var less = require("gulp-less");
var minifyCSS = require("gulp-minify-css");
var typedoc = require("gulp-typedoc");
var jasmineBrowser = require('gulp-jasmine-browser');
var spritesmith = require('gulp.spritesmith');
var git = require('gulp-git');
var exec = require('child_process').exec;
var tslint = require('gulp-tslint');
var download = require("gulp-download");
var unzip = require("gulp-unzip");
var fs = require("fs");
var minimist = require("minimist");
var os = require("os");
var open = require("gulp-open");
var gutil = require('gulp-util');

// Command line option:
//  --fatal=[warning|error|off]
var fatalLevel = require('yargs').argv.fatal;
var isDebug = false;
var cliOptions = {
    string: [
        "files",
        "openInBrowser"
    ],
    boolean: "debug",
    alias: {
        files: "f",
        debug: "d",
        openInBrowser: ["o", "oib"]
    }
};

var cliArguments = minimist(process.argv.slice(2), cliOptions);

isDebug = Boolean(cliArguments.debug);

function getOptionFromCli(cliArg) {
    if (cliArg && cliArg.length > 0) {
        return cliArg.split(/[,;]/);
    }

    return [];
}

var filesOption = getOptionFromCli(cliArguments.files);

var jsUglifyOptions = {
    compress: {
        drop_console: true,
        pure_funcs: [
            "debug.assertValue",
            "debug.assertFail",
            "debug.assert",
            "debug.assertAnyValue"
        ],
        warnings: false,
        dead_code: true,
        sequences: true,
        properties: true,
        conditionals: true,
        comparisons: true,
        booleans: true,
        cascade: true,
        unused: true,
        loops: true,
        if_return: true,
        join_vars: true,
        global_defs: {
            "DEBUG": false
        }
    }
};

/* ------------------------ GET PATH --------------------------------------- */
function getPathsForVisualsTests(paths) {
    var includePaths = [];

    if (paths && paths.length > 0) {
        includePaths.push("_references.ts");
        includePaths = includePaths.concat(paths.map(function (path) {
            return "visuals/" + path;
        }));
    }

    return includePaths;
}

function getBuildPaths(projectPath, outFileName, includePaths) {
    var paths = [];

    if (includePaths && includePaths.length > 0) {
        paths = paths.concat(includePaths.map(function (path) {
            return projectPath + "/" + path;
        }));
    } else {
        paths.push(projectPath + "/**/*.ts");
    }

    paths.push("!" + projectPath + "/obj/**");
    paths.push("!" + projectPath + "/**/*.d.ts");

    return paths;
}

/* --------------------------- BUILD PROJECTS---------------------------------- */
var dontEmitTSbuildErrors = false;
function buildProject(projectPath, outFileName, includePaths) {
    var paths = getBuildPaths(projectPath, outFileName, includePaths);
    var srcResult = gulp.src(paths);

    if (isDebug)
        srcResult = srcResult.pipe(sourcemaps.init());

    var tscResult = srcResult
        .pipe(ts({
            sortOutput: true,
            target: "ES5",
            declarationFiles: true,
            noEmitOnError: dontEmitTSbuildErrors,
            out: projectPath + "/obj/" + outFileName + ".js"
        }));

    if (isDebug) {
        tscResult.js = tscResult.js.pipe(sourcemaps.write());
    }

    if (isDebug)
        return merge([tscResult.js.pipe(gulp.dest("./")),
            tscResult.dts.pipe(gulp.dest("./"))]);
    else
        return merge([tscResult.dts.pipe(gulp.dest("./")),
            tscResult.js
                .pipe(uglify(outFileName + ".js", jsUglifyOptions))
                .pipe(gulp.dest(projectPath + "/obj"))
        ]);
}

gulp.task("build_visuals_common", function () {
    return buildProject("src/Clients/VisualsCommon", "VisualsCommon");
});

gulp.task("build_visuals_data", function () {
    return buildProject("src/Clients/VisualsData", "VisualsData");
});

gulp.task("build_visuals_project", function () {
    return buildProject("src/Clients/Visuals", "Visuals");
});

gulp.task("build_visuals_playground_project", function () {
    return buildProject("src/Clients/PowerBIVisualsPlayground", "PowerBIVisualsPlayground");
});

gulp.task("build_visuals_tests", function () {
    return buildProject(
        "src/Clients/PowerBIVisualsTests",
        "PowerBIVisualsTests",
        getPathsForVisualsTests(filesOption));
});

/* --------------------------- LESS/CSS ---------------------------------- */
gulp.task("build_visuals_sprite", function () {
    var spriteData = gulp.src("src/Clients/Visuals/images/sprite-src/*.png").pipe(spritesmith({
        imgName: "images/visuals.sprites.png",
        cssName: "styles/sprites.less"
    }));

    return spriteData.pipe(gulp.dest("src/Clients/Visuals/"));
});

gulp.task("build_visuals_less", function () {
    var css = gulp.src(["src/Clients/Externals/ThirdPartyIP/jqueryui/1.11.4/jquery-ui.min.css",
        "src/Clients/Visuals/styles/visuals.less"])
        .pipe(less())
        .pipe(concat("visuals.css"));

    if (!isDebug) {
        css = css.pipe(minifyCSS());
    }

    return css.pipe(gulp.dest("build/styles"))
        .pipe(gulp.dest("src/Clients/PowerBIVisualsPlayground"));
});

/* -------------- COMBINERS LINKERS CONCATENATORS ------------------------- */
function concatFilesWithSourceMap(source, outFileName) {
    var result = source;

    if (isDebug)
        result = result.pipe(sourcemaps.init({loadMaps: true}));

    result = result.pipe(concat(outFileName));

    if (isDebug)
        result = result.pipe(sourcemaps.write());

    return result;
}
var internalsPaths = ["src/Clients/VisualsCommon/obj/VisualsCommon.js",
    "src/Clients/VisualsData/obj/VisualsData.js",
    "src/Clients/Visuals/obj/Visuals.js"];
gulp.task("combine_internal_js", function () {
    var srcResult = gulp.src(internalsPaths);

    if (isDebug)
        return concatFilesWithSourceMap(srcResult, "powerbi-visuals.js")
            .pipe(concat("powerbi-visuals.js"))
            .pipe(gulp.dest("build/scripts"))
            .pipe(gulp.dest("src/Clients/PowerBIVisualsPlayground"))
    else
        return concatFilesWithSourceMap(srcResult, "powerbi-visuals.js")
            .pipe(uglify("powerbi-visuals.js", jsUglifyOptions))
            .pipe(gulp.dest("build/scripts"))
            .pipe(gulp.dest("src/Clients/PowerBIVisualsPlayground"));
});

gulp.task("combine_internal_d_ts", function () {
    return gulp.src([
        "src/Clients/VisualsCommon/obj/VisualsCommon.d.ts",
        "src/Clients/VisualsData/obj/VisualsData.d.ts"
    ])
        .pipe(concat("powerbi-visuals.d.ts"))
        .pipe(gulp.dest("build"));
});

gulp.task("combine_all", function () {
    var src = [
        "build/scripts/externals.min.js"
    ];

    src.push("build/scripts/powerbi-visuals.js");

    return concatFilesWithSourceMap(gulp.src(src), "powerbi-visuals.all.js")
        .pipe(gulp.dest("build/scripts"));
});

/* --------------------------- EXTERNALS ---------------------------------- */
var externalsPath = ["src/Clients/Externals/ThirdPartyIP/D3/*.min.js",
    "src/Clients/Externals/ThirdPartyIP/GlobalizeJS/globalize.min.js",
    "src/Clients/Externals/ThirdPartyIP/GlobalizeJS/globalize.culture.en-US.js",
    "src/Clients/Externals/ThirdPartyIP/JQuery/**/*.min.js",
    "src/Clients/Externals/ThirdPartyIP/jqueryui/1.11.4/jquery-ui.min.js",
    "src/Clients/Externals/ThirdPartyIP/LoDash/*.min.js"];
gulp.task("combine_external_js", function () {
    return gulp.src(externalsPath)
        .pipe(concat("externals.min.js"))
        .pipe(gulp.dest("build/scripts"))
        .pipe(gulp.dest("src/Clients/PowerBIVisualsPlayground"));
});

/* --------------------------- TS-LINT ---------------------------------- */
var tslintPaths = ["src/Clients/VisualsCommon/**/*.ts",
    "!src/Clients/VisualsCommon*/obj/*.*",
    "!src/Clients/VisualsCommon/**/*.d.ts",
    "src/Clients/VisualsData/**/*.ts",
    "!src/Clients/VisualsData*/obj/*.*",
    "!src/Clients/VisualsData/**/*.d.ts",
    "src/Clients/Visuals/**/*.ts",
    "!src/Clients/Visuals*/obj/*.*",
    "!src/Clients/Visuals/**/*.d.ts",
    "src/Clients/PowerBIVisualsTests/**/*.ts",
    "!src/Clients/PowerBIVisualsTests*/obj/*.*",
    "!src/Clients/PowerBIVisualsTests/**/*.d.ts",
    "src/Clients/PowerBIVisualsPlayground/**/*.ts",
    "!src/Clients/PowerBIVisualsPlayground*/obj/*.*",
    "!src/Clients/PowerBIVisualsPlayground/**/*.d.ts"];

gulp.task("tslint", function () {
    return gulp.src(tslintPaths)
        .pipe(tslint())
        .pipe(tslint.report("verbose"));
});
/* --------------------------- COPY FILES ---------------------------------- */
gulp.task("copy_internal_dependencies_visuals_playground", function () {
    var src = [];
    src.push("src/Clients/PowerBIVisualsPlayground/obj/PowerBIVisualsPlayground.js");

    return gulp.src(src)
        .pipe(rename("PowerBIVisualsPlayground.js"))
        .pipe(gulp.dest("src/Clients/PowerBIVisualsPlayground"))
});
/* --------------------------- BUILD SEQUENCIES ---------------------------------- */
gulp.task("build_visuals", function (callback) {
    runSequence("build_visuals_project", "build_visuals_sprite", "build_visuals_less", callback);
});

gulp.task("build_projects", function (callback) {
    runSequence(
        "build_visuals_common",
        "build_visuals_data",
        "build_visuals",
        "combine_internal_js",
        "combine_external_js",
        //"combine_all",
        "build_visuals_playground",
        callback);
});

//TODO: delete if it is not used.
gulp.task("build_combine", function (callback) {
    runSequence(
        "tslint",
//         "combine_internal_js",
//         "combine_external_js",
        // "combine_all",
        "build_visuals_playground_project",
        callback);
});

gulp.task("build_visuals_playground", function (callback) {
    runSequence(
        "build_visuals_playground_project",
        "copy_internal_dependencies_visuals_playground",
        callback);
});

gulp.task('build', function (callback) {
    runSequence(
        "tslint",
        "build_projects",
        callback);
});
gulp.task('build_debug', function (callback) {
    isDebug = true;
    runSequence(
        "build_projects",
        callback);
});

gulp.task('default', ['build_debug']);

/* --------------------------- WATCHERS ---------------------------------- */
var lintErrors = false;
const lintReporter = function (output, file, options) {
    if (output.length > 0)
        lintErrors = true;
    // file is a reference to the vinyl File object 
    console.log("Found " + output.length + " errors in " + file.path);
    for (var i = 0; i < output.length; i++)
        gutil.log('TsLint Error ' + i + ': ', '', gutil.colors
            .red(' line:' + output[i].endPosition.line + ', char:' + output[i].endPosition.character +
                ', message: ' + output[i].failure));
    // options is a reference to the reporter options, e.g. including the emitError boolean 
};

gulp.task('preload_debug', function (callback) {
    isDebug = true;
    runSequence(
        "preload",
        callback);
});
gulp.task('preload', function (callback) {
    dontEmitTSbuildErrors = true;
// first time build 
    runSequence(
//        "tslint", -- not really need to lint here
        "build_projects",
        callback);
    //do stuff
    gulp.watch(getBuildPaths("src/Clients/VisualsCommon", "VisualsCommon")).on("change", function (file) {
        lintErrors = false;
        gulp.src(file.path).pipe(tslint()).pipe(tslint.report(lintReporter).on('error', function (error) {})
            .on('end', function () {
                if (!lintErrors)
                    runSequence("build_visuals_common");
            }));
    });
    gulp.watch(getBuildPaths("src/Clients/VisualsData", "VisualsData")).on("change", function (file) {
        lintErrors = false;
        gulp.src(file.path).pipe(tslint()).pipe(tslint.report(lintReporter).on('error', function (error) {})
            .on('end', function () {
                if (!lintErrors)
                    runSequence("build_visuals_data");
            }));
    });
    gulp.watch(getBuildPaths("src/Clients/Visuals", "Visuals")).on("change", function (file) {
        lintErrors = false;
        gulp.src(file.path).pipe(tslint()).pipe(tslint.report(lintReporter).on('error', function (error) {})
            .on('end', function () {
                if (!lintErrors)
                    runSequence("build_visuals_project");
            }));
    });
    gulp.watch(getBuildPaths("src/Clients/PowerBIVisualsPlayground", "PowerBIVisualsPlayground")).on("change", function (file) {
        lintErrors = false;
        gulp.src(file.path).pipe(tslint()).pipe(tslint.report(lintReporter).on('error', function (error) {})
            .on('end', function () {
                if (!lintErrors)
                    runSequence("build_visuals_playground");
            }));
    });

    gulp.watch("src/Clients/Visuals/images/sprite-src/*.png", ['build_visuals_sprite']);
    gulp.watch(["src/Clients/Externals/ThirdPartyIP/jqueryui/1.11.4/jquery-ui.min.css", "src/Clients/Visuals/styles/visuals.less", "src/Clients/Visuals/images/visuals.sprites.png", "src/Clients/Visuals/styles/sprites.less"], ["build_visuals_less"]);
    gulp.watch(externalsPath, ['combine_external_js']);
    gulp.watch(internalsPaths, ['combine_internal_js']);
});
/** ---------------------------------- DOWNLOADs ------------------------------------------*/
/** --------------------------Download 'JASMINE-jquery.js' --------------------------------*/
gulp.task('jasmine-dependency', function (callback) {
    fs.exists('src/Clients/Externals/ThirdPartyIP/JasmineJQuery/jasmine-jquery.js', function (exists) {
        if (!exists) {
            console.log('Jasmine test dependency missing. Downloading dependency.');
            download('https://raw.github.com/velesin/jasmine-jquery/master/lib/jasmine-jquery.js')
                .pipe(gulp.dest("src/Clients/Externals/ThirdPartyIP/JasmineJQuery"))
                .on("end", callback);
        } else {
            console.log('Jasmine test dependency exists.');
            callback();
        }
    });
});

/** ------------------------------ Download PHANTOM --------------------------------------- */
gulp.task('phantomjs-dependency', function (callback) {
    var zipUrl = "https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.0.0-windows.zip";
    var phantomExe = "phantomjs.exe";
    var jasmineBrowserDir = "./node_modules/gulp-jasmine-browser/lib/";

    // Download phantomjs only for Windows OS.
    if (os.type().search("Windows") !== -1) {
        onPhantomjsExist(jasmineBrowserDir, function (exists, version) {
            if (!exists) {
                console.log('Phantomjs missing. Downloading dependency.');
                download(zipUrl)
                    .pipe(unzip({
                        filter: function (entry) {
                            if (entry.path.search(phantomExe) !== -1) {
                                entry.path = phantomExe;
                                return true;
                            }
                        }}))
                    .pipe(gulp.dest(jasmineBrowserDir))
                    .on("end", callback);
            } else {
                logIfExists(version);
                callback();
            }
        });
    } else {
        onPhantomjsExist(jasmineBrowserDir, function (exists, version) {
            if (exists) {
                logIfExists(version);
            } else {
                console.log("Automatic installation does not allowed for current OS [" + os.type() + "]. Please install Phantomjs manually. (https://bitbucket.org/ariya/phantomjs)");
            }
        });
        callback();
    }

    function logIfExists(version) {
        console.log("Phantomjs has already exist. [Version: " + version + "]");
    }

    function onPhantomjsExist(path, callback) {
        exec("phantomjs -v", {cwd: path}, function (error, stdout) {
            if (error !== null) {
                callback(false, null);
            } else if (stdout !== null) {
                callback(true, stdout.substring(0, 5));
            }
        });
    }
});

/** ----------------------------- TESTS ------------------------------------------- */
gulp.task("copy_internal_dependencies_visuals_tests", function () {
    var src = [];
    src.push("src/Clients/PowerBIVisualsTests/obj/PowerBIVisualsTests.js");

    return gulp.src(src)
        .pipe(rename("powerbi-visuals-tests.js"))
        .pipe(gulp.dest("VisualsTests"));
});

gulp.task("copy_external_dependencies_visuals_tests", function () {
    return gulp.src([
        "build/scripts/powerbi-visuals.all.js"
    ])
        .pipe(gulp.dest("VisualsTests"));
});

gulp.task("copy_dependencies_visuals_tests", function (callback) {
    runSequence(
        "copy_internal_dependencies_visuals_tests",
        "copy_external_dependencies_visuals_tests",
        callback
        );
});

function addLinks(links) {
    return (links.map(function (link) {
        return '<link rel="stylesheet" href="' + link + '"/>';
    })).join("");
}

function addScripts(scripts) {
    return (scripts.map(function (script) {
        return '<script src="' + script + '"></script>';
    })).join("");
}

function addTestName(testName) {
    if (testName && testName.length > 0) {
        var specName = "?spec=" + encodeURI(testName);

        return "<script>" + "if (window.location.search !=='" + specName + "') {" +
            "window.location.search = '" + specName + "';}</script>";
    } else {
        return "";
    }
}

function createHtmlTestRunner(fileName, scripts, styles, testName) {
    var html = "<!DOCTYPE html><html>";
    var head = '<head><meta charset="utf-8">' + addLinks(styles) + '</head>';
    var body = "<body>" + addScripts(scripts) + addTestName(testName) + "</body>";

    html = html + head + body + "</html>";

    fs.writeFileSync(fileName, html);
}

gulp.task("run_tests", function () {
    var src = [
        "powerbi-visuals.all.js",
        "../src/Clients/externals/ThirdPartyIP/JasmineJQuery/jasmine-jquery.js",
        "../src/Clients/externals/ThirdPartyIP/MomentJS/moment.min.js",
        "../src/Clients/externals/ThirdPartyIP/Velocity/velocity.min.js",
        "../src/Clients/externals/ThirdPartyIP/Velocity/velocity.ui.min.js",
        "../src/Clients/externals/ThirdPartyIP/QuillJS/quill.min.js",
        "powerbi-visuals-tests.js"
    ];

    var scripts = [
        "../node_modules/jasmine-core/lib/jasmine-core/jasmine.js",
        "../node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js",
        "../node_modules/jasmine-core/lib/jasmine-core/boot.js"
    ];

    var links = [
        "../node_modules/jasmine-core/lib/jasmine-core/jasmine.css"
    ];

    var specRunnerFileName = "VisualsTests/runner.html";

    var openInBrowser = cliArguments.openInBrowser;

    createHtmlTestRunner(
        specRunnerFileName,
        scripts.concat(src),
        links,
        getOptionFromCli(openInBrowser)[0]);

    if (openInBrowser) {
        return gulp.src(specRunnerFileName)
            .pipe(open());
    } else {
        return gulp.src(src, {cwd: "VisualsTests"})
            .pipe(jasmineBrowser.specRunner({console: true}))
            .pipe(jasmineBrowser.headless());
    }
});

gulp.task("run_performance_tests", function (callback) {
    filesOption.push("performance/performanceTests.ts");
    runSequence("test", callback);
});

gulp.task("test", function (callback) {
    runSequence(
        "build",
        "build_visuals_tests",
        "jasmine-dependency",
        "phantomjs-dependency",
        "combine_all",
        "copy_dependencies_visuals_tests",
        "run_tests",
        callback);
});

/**
 * Type DOC.
 */

gulp.task("createdocs", function () {
    return gulp
        .src([
            "src/Clients/Visuals/**/*.ts",
            "!src/Clients/Visuals*/obj/*.*"
        ])
        .pipe(typedoc({
            // Output options (see typedoc docs)
            target: "ES5",
            //includeDeclarations: true,
            mode: "file",
            // TypeDoc options (see typedoc docs)
            out: "docs",
            json: "docs/to/file.json",
            // TypeDoc options (see typedoc docs)
            name: "PowerBI-Visuals",
            ignoreCompilerErrors: true,
            version: true,
        }));
});

gulp.task("gendocs", function (callback) {
    runSequence(
        "build",
        "combine_internal_d_ts",
        "createdocs",
        callback);
});

/** ------------------------------ Git tasks. ---------------------------------- */
gulp.task('pull_rebase', function () {
    return  git.pull('origin', 'master', {args: '--rebase'}, function (err) {
        if (err)
            throw err;
    });
});

var ERROR_LEVELS = ['error', 'warning'];
// Return true if the given level is equal to or more severe than
// the configured fatality error level.
// If the fatalLevel is 'off', then this will always return false.
// Defaults the fatalLevel to 'error'.
function isFatal(level) {
    return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || 'error');
}
// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
function handleError(level, error) {
    gutil.log('I\'ve got error: ' + error.message + ' Now thinking, what to do with it...');
    if (isFatal(level))
        process.exit(1);
}

// Convenience handler for error-level errors.
function onError(error) {
    handleError.call(this, 'error', error);
}

gulp.task('checkout_gh_pages', function () {
    fs.exists('.docs', function (exists) {
        if (!exists) {
            console.log('cloning the repo/gh-pages into .docs');
        } else {
            return console.log('gh-pages repo exists in .docs folder.');
        }
    });
});

gulp.task('pull_gh_pages', function () {
    exec('git -C .docs pull', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});
gulp.task('copy_docs', function () {
    return gulp.src(['docs/**/*']).pipe(gulp.dest('.docs'));
});
gulp.task('add_all_gh_pages', function (cb) {
    exec('git -C .docs add --all', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

var doCommit = false;
gulp.task('commit_gh_pages', function (callback) {

    exec('git -C .docs status > node_modules/statuscheck.txt', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });

    setTimeout(function () {

        fs.readFile("node_modules/statuscheck.txt", "utf-8", function (err, _data) {
            doCommit = _data.indexOf('nothing to commit') < 0;
            del(['node_modules/statuscheck.txt'], function (err, paths) {
            });
            //console.log('Original git message: \n '+_data+ '\n end of original git message');
            if (err)
                console.log('Command exec ERROR: \n ' + err);

            if (doCommit) {
                console.log('Commiting changes');
                exec('git -C .docs commit -m \'automatic-documentation-update\'', function (err, stdout, stderr) {
                    console.log(stdout);
                    console.log(stderr);
                    callback(err);
                });
            } else {
                console.log('Nothing to commit');
                return true;
            }
        });
    }, 10000);
});
gulp.task('push_gh_pages', function (cb) {
    exec('git -C .docs push', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
gulp.task('git_update_gh_pages', function (cb) {
    runSequence(
        "pull_rebase",
        "build_projects",
        "combine_internal_d_ts",
        "checkout_gh_pages",
        "pull_gh_pages",
        "createdocs",
        "copy_docs",
        "add_all_gh_pages",
        "commit_gh_pages",
        "push_gh_pages",
        cb);
});
