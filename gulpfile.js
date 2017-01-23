var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		jade           = require('gulp-pug'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		spritesmith = require("gulp.spritesmith"),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");

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

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({
		includePaths: bourbon.includePaths
	}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('jade', function() {
	return gulp.src('app/jade/pages/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('app'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'jade', 'scripts', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/jade/**/*.jade', ['jade']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src(['app/img/**/*', '!app/img/sprite/*'])
	.pipe(cache(imagemin({
		progressive: true,
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

// Sprites PNG
gulp.task('cleansprite', function() {
    return del.sync('app/img/sprite/sprite.png');
});


gulp.task('spritemade', function() {
    var spriteData =
        gulp.src('app/img/sprite/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            padding: 15,
            cssFormat: 'scss',
            algorithm: 'binary-tree',
            cssTemplate: 'sass.template.mustache',
            cssVarMap: function(sprite) {
                sprite.name = 's-' + sprite.name;
            }
        }));

    spriteData.img.pipe(gulp.dest('app/img/sprite/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/sass/')); // путь, куда сохраняем стили
});
gulp.task('sprite', ['cleansprite', 'spritemade']);


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
