var gulp           = require('gulp'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    browserSync    = require('browser-sync');

// Скрипты проекта
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});
