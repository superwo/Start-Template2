var gulp  = require('gulp'),
    browserSync    = require('browser-sync');

gulp.task('watch', ['sass', 'jade', 'scripts', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/jade/**/*.jade', ['jade']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
	gulp.watch('app/*.html', browserSync.reload);
});
