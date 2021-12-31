var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
  return gulp.src('src/style.scss')
  .pipe(plumber(plumberErrorHandler))
  .pipe(sass())
  .pipe(concat('style.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('www/resources/'));
});

gulp.task('watch', function() {
  return gulp.watch('src/style.scss', gulp.series('sass'));
});

var plumberErrorHandler = { errorHandler: notify.onError({
  title: 'Gulp',
  message: 'Error: <%= error.message %>'
  })
};

gulp.task('default', gulp.series('sass'));
