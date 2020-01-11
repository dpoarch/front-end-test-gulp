const gulp = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');

//sources
const jsSource = ['src/assets/js/*.js'];
const sassSource = ['src/assets/css/*.scss'];
const htmlSource = ['*.html'];
const imgSource = ['src/assets/img/*'];
const outputDir = 'distro';

//run initial task
gulp.task('console', async function (done) {
    console.log('Hello');
    done();
});

//sass
gulp.task('sass', async function () {
    gulp
        .src(sassSource)
        .pipe(sass({style: 'expanded'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('distro/css'));
});

//sscript
gulp.task('js', async function (done) {
    gulp
        .src(['./node_modules/jquery/dist/jquery.min.js', './src/assets/js/*.js'])
        .pipe(gulp.dest('distro/js'));
});

gulp.task('html', function () {
    gulp
        .src(htmlSource)
        .pipe(connect.reload())
})

gulp.task('image', function () {
    gulp
        .src(imgSource)
        .pipe(image())
        .pipe(gulp.dest('./distro/img'));
});

gulp.task('connect', function () {
    connect.server({root: './', livereload: true})
});

gulp.task('watch', function () {
    gulp.watch(sassSource, gulp.series('sass'));
    gulp.watch(htmlSource, gulp.series('html'));
    gulp.watch(imgSource, gulp.series('image'));
    gulp.watch(jsSource, gulp.series('js'));
    // Other watchers
})

gulp.task('default', gulp.series('connect', 'watch'));