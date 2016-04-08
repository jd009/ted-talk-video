var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
  return gulp.src('client/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src('client/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('client/dist'))
    .pipe(rename('all.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('client/dist/js'));
});

gulp.task('default', ['lint', 'scripts']);
