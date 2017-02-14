var gulp           = require('gulp'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    browserSync    = require('browser-sync'),
    webpack        = require('webpack');

gulp.task('webpack', function(callback) {
  webpack(require('../../webpack.config.js'), function(err, stats) {
    if(err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
    callback();
  });
});
gulp.task('scripts', ['modernizr'], function() {
	return gulp.src([
    'app/js/Vendor.js',
		'app/js/App.js' // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});
