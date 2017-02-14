require('./gulp/tasks/html');
require('./gulp/tasks/styles');
require('./gulp/tasks/scripts');
require('./gulp/tasks/img');
require('./gulp/tasks/watch');
require('./gulp/tasks/svg');
require('./gulp/tasks/modernizr');

var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		browserSync    = require('browser-sync'),
		del            = require('del'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");



gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});


gulp.task('build', ['removedist', 'jade', 'imagemin', 'sass', 'scripts'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess'
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js'
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*']
		).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
