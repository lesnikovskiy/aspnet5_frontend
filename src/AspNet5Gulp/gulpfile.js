/// <binding BeforeBuild='build' />
var gulp = require("gulp");
var browserify = require("browserify");
var stringify = require("stringify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var clean = require("gulp-clean");

gulp.task("build", function() {
	return browserify({ entries: "./wwwroot/app.js" })
		.transform(stringify([".html"]))
		.transform("babelify", { presets: ["es2015"] })
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(gulp.dest("./wwwroot/bundles"));
});

gulp.task("clean", function() {
	return gulp.dest("./wwwroot/bundles/**/*")
		.pipe(clean());
});

gulp.task("watch", ["watch"], function() {
	gulp.watch("*.js", ["build"]);
});

gulp.task("default", ["build", "watch"]);