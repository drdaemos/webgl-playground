var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var gulpWebpack = require('webpack-stream');
var named = require('vinyl-named');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');

gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('webpack', function () {
    return gulp.src(['./src/app.js', './test/test.js'])
        .pipe(plumber())
        .pipe(named())
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function() {
    gulp.watch(
        ['./src/**/*.js', './test/**/*.js'],
        ['default']
    )
})

gulp.task('default', [ 'clean', 'webpack' ]);