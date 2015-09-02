var gulp = require('gulp');

gulp.task('help', function (callback) {

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