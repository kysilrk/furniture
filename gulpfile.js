const gulp       = require('gulp');
	scss         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');
  htmlPartial = require('gulp-html-partial');

gulp.task('scss', function(){ // scss task
	return gulp.src('app/scss/**/*.scss')
		.pipe(scss()) // scss to css
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // prefixes
		.pipe(gulp.dest('app/css')) // export
		.pipe(browserSync.reload({stream: true})) // reload page
});

gulp.task('browser-sync', function() { // task browser-sync
	browserSync({
		server: {
			baseDir: 'app' // server dir - app
		},
		notify: false
	});
});

gulp.task('scripts', function() {
	return gulp.src([ // libs needed
		'app/libs/jquery/dist/jquery.min.js', // jQuery
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Magnific Popup
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // minify JS
		.pipe(gulp.dest('app/js')); // export app/js
});

gulp.task('css-libs', ['scss'], function() {
	return gulp.src('app/css/libs.css') // take file for minify
		.pipe(cssnano()) // minify
		.pipe(rename({suffix: '.min'})) // add .min
		.pipe(gulp.dest('app/css')); // export to folder
});

gulp.task('html', function () {
  gulp.src(['app/html/*.html'])
    .pipe(htmlPartial({
      basePath: 'app/html/partials/'
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('watch', ['html', 'browser-sync', 'css-libs', 'scripts'], function() { // look over files
	gulp.watch('app/scss/**/*.scss', ['scss']);
	gulp.watch(['app/html/**/*.html'], ['html']);
	gulp.watch(['app/html/**/*.html', 'app/index.html'],  browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist'); // delete dist folder even build
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // take images
		.pipe(cache(imagemin({ // + caching
		// .pipe(imagemin({ // minify images
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('dist/img')); // load to prod
});

gulp.task('build', ['clean', 'img', 'scss', 'scripts'], function() {

	var buildCss = gulp.src([ // transfer to prod
		'app/css/main.css',
		'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*') // load to prod
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*') // load to prod
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/index.html') // load to prod
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
});

gulp.task('default', ['watch']);
