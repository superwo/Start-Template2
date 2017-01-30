var gulp           = require('gulp'),
    jade           = require('gulp-pug'),
    browserSync    = require('browser-sync');

gulp.task('jade', function() {
	return gulp.src('app/jade/pages/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('app'))
	.pipe(browserSync.reload({stream: true}));
});
