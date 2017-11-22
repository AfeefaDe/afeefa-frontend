var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var notifier   = require('stream-notifier');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var minify = require('gulp-minify');


var paths = {
	styles: './src/sass/**/*.scss',
	entryStylesheet: './src/sass/afeefa.scss',
	entryScript: './src/js/main.js',
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
	.pipe(cleanCSS({sourceMap: false}))
	//output afeefa.min.css
	.pipe(gulp.dest('dist/built'))
});



function createBundler(debug, watch) {
	var bundler = browserify({
		entries: [paths.entryScript], 
		paths: ['./node_modules'],
		debug: debug,
		cache: {},
	  	packageCache: {}
	});
	if (watch) {
		bundler.plugin(watchify, {
			delay: 200,
			ignoreWatch: ['**/node_modules/**']
		})
	}
	return bundler;
}

gulp.task('browserify', function() {
	var bundler = createBundler(false, false);
	var bundle = compileBundle(bundler);
	return bundle();
});

gulp.task('watchify', function() {
	var bundler = createBundler(true, true);
  	var bundle = compileBundle(bundler)
  	bundler.on('update', bundle);

  	return bundle();
});

function compileBundle(bundler) {
  return function() {
    var n = notifier('browserify');
    console.log('[BUNDLER] Start rebundling')
    return bundler
    	.transform(babel)
      	.bundle()
      	.on('error', n.error)
		.pipe(source('build.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(minify({ext: {src: '', min:'.min.js'}}))
		.pipe(gulp.dest('./dist/built'))
      	.on('end', function() {
      		n.end;
      		console.log('[BUNDLER] Finished rebundling')
      	});
  };
}

gulp.task('build', function() {
	gulp.start('styles');
	gulp.start('browserify');
});

gulp.task('dev', function() {
	gulp.start('styles');
	gulp.start('watchify');
	gulp.watch(paths.styles, ['styles']);
})