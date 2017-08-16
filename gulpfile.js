var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');

var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');


var paths = {
	styles: './src/sass/**/*.scss',
	entryStylesheet: './src/sass/afeefa.scss',
	entryScript: './src/js/index.js'
};

gulp.task('styles', function() {
	gulp.src([paths.entryStylesheet])
	//Sass conversion
	.pipe(sass().on('error', sass.logError))
	//autoprefixer for compability
	.pipe(prefix({
			browsers: ['> 1%','last 8 versions','Firefox >= 20'],
			cascade: false
	}))
	//output afeefa.css
	.pipe(gulp.dest('dist/built'))
	.pipe(rename({suffix: '.min'}))
	.pipe(cleanCSS())
	//output afeefa.min.css
	.pipe(gulp.dest('dist/built'))
});

function compile(watch) {
	var bundler = watchify(browserify(paths.entryScript, { debug: true }).transform(babel));
	function rebundle() {
		bundler.bundle()
			.on('error', function(err) { console.error(err); this.emit('end'); })
			.pipe(source('build.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./dist/built'));
	}
	if (watch) {
		bundler.on('update', function() {
			console.log('-> bundling...');
			rebundle();
		});
	}
	rebundle();
}
function watch() {
	return compile(true);
}



gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });


gulp.task('default', function() {
	gulp.start('styles');
	gulp.start('watch', function() { return watch(); });
	gulp.watch(paths.styles, ['styles']);
})