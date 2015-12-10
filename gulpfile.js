var gulp       = require('gulp')
var plumber    = require('gulp-plumber')
var rename     = require('gulp-rename')
var sass       = require('gulp-sass')
var serve      = require('gulp-serve')
var sourcemaps = require('gulp-sourcemaps')
var neat       = require('node-neat')
var reset      = require('node-reset-scss')

gulp.task('sass', function () {
  var sassOpts = {
    // neat includes bourbon by default
    includePaths: neat.with(reset.includePath),
    outputStyle: 'compact'
  }

  gulp.src('./sass/main.scss')
    .pipe(plumber())            // keep running if errors
    .pipe(sourcemaps.init())    // start sourcemapping
    .pipe(sass(sassOpts))       // sass processing
    .pipe(sourcemaps.write())   // finish sourcemapping
    .pipe(rename('style.css'))  // change to `style.css`
    .pipe(gulp.dest('./css'))   // and move to the /css folder
})

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass'])
})

gulp.task('serve', serve('./'))

gulp.task('dev', ['serve', 'watch'])