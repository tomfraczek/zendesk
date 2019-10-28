// core
var gulp = require('gulp');

// sass
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// css + js
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var include = require("gulp-include");
var rename = require("gulp-rename");
var ignore = require('gulp-ignore');

// paths
var paths = {
    sass: './styles/*.scss',
    styles: {
      dest: './../',
    },
    excludeCSS: {
        underscored: '!./styles/_*.scss',
    }
};

var onError = function(err) {
    notify.onError({
        title: "Gulp error in " + err.plugin,
        Error: "<%= error.message %>"
    })(err);
    this.emit('end');
};

// SASS
function style() {
    return gulp
        .src(paths.sass)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(ignore.include(paths.excludeCSS.underscored))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'IE 11'],
            remove: true,
        }))
        .pipe(gulp.dest('./'));
}


function watch(){
    gulp.watch(paths.sass, style);
}


// Don't forget to expose the task!
exports.default = watch;
exports.style = style;
