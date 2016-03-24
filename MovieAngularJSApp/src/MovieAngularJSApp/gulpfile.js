/// <binding AfterBuild='concat, min' Clean='clean' />
'use strict';

var gulp = require('gulp'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');

var paths = {
    webroot: './wwwroot/'
};

paths.js = paths.webroot + 'js/**/*.js';
paths.minJs = paths.webroot + 'js/**/*.min.js';
paths.css = paths.webroot + 'css/**/*.css';
paths.minCss = paths.webroot + 'css/**/*.min.css';
paths.concatJsDest = paths.webroot + 'js/site.min.js';
paths.concatCssDest = paths.webroot + 'css/site.min.css';

paths.scripts = ['./Scripts/**/*.js', '!./Scripts/_references.js'];
paths.concatMinScriptDest = paths.webroot + 'js/app.min.js';
paths.concatScriptDest = paths.webroot + 'js/app.js';

gulp.task('clean:js', function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task('clean:css', function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task('clean', ['clean:js', 'clean:css']);

gulp.task('min:scripts', function () {
    return gulp.src(paths.scripts, { base: '.' })
        .pipe(concat(paths.concatMinScriptDest))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('min:css', function () {
    return gulp.src([paths.css, '!' + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest('.'));
});

gulp.task('concat:scripts', function () {
    return gulp.src(paths.scripts, { base: '.' })
        .pipe(concat(paths.concatScriptDest))
        .pipe(gulp.dest('.'));
});

gulp.task('min', ['min:css', 'min:scripts']);

gulp.task('concat', ['concat:scripts']);
