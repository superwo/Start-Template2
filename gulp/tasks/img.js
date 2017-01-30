var gulp           = require('gulp'),
    imagemin       = require('gulp-imagemin'),
    pngquant       = require('imagemin-pngquant'),
    cache          = require('gulp-cache'),
    del            = require('del'),
    spritesmith    = require("gulp.spritesmith");

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
