var gulp  = require('gulp'),
    browserSync    = require('browser-sync'),
    notify         = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['sass', 'jade', 'scripts', 'modernizr', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/jade/**/*.jade', ['jade']);
	gulp.watch('app/js/scripts/**/*.js', ['webpack']);
	gulp.watch(['libs/**/*.js', 'app/js/App.js'], ['scripts']);
	gulp.watch('app/*.html', browserSync.reload);
});
