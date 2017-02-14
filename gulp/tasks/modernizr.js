var gulp = require('gulp'),
  modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
  return gulp.src(['./app/css/**/*.css', './app/js/scripts/**/*.js'])
    .pipe(modernizr({
      'options': [
        'setClasses'
      ],
      "excludeTests": ['hidden']
    }))
    .pipe(gulp.dest('./app/js'));
});
