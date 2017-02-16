var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    autoprefixer   = require('gulp-autoprefixer'),
    rename         = require('gulp-rename'),
    cleanCSS       = require('gulp-clean-css'),
    gcmq           = require('gulp-group-css-media-queries'),
    notify         = require("gulp-notify"),
    bourbon        = require("node-bourbon"),
    browserSync    = require('browser-sync');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({
		includePaths: bourbon.includePaths
	}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
  .pipe(gcmq())
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});
