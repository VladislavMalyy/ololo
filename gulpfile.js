var gulp = require('gulp');

var connect = require('gulp-connect-multi')();

var plumber = require('gulp-plumber');


gulp.task('connect', connect.server({
	host: '127.0.0.1',
	root: ['site'],
	port: 9090,
    livereload: true,
	open: {
		browser:'google-chrome'
	}
}));

var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');

gulp.task('styles',function(){
	gulp.src('./dev/scss/style.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle : 'compressed'
		}))
		.pipe(prefixer('last 2 version'))
		.pipe(gulp.dest("./site/"))
		.pipe(connect.reload());
});

var pug = require('gulp-pug');


gulp.task('html',function(){
	gulp.src('./dev/pug/**/*.pug')
        .pipe(plumber())
		.pipe(pug({

		}))
		.pipe(gulp.dest("./site/"))
        .pipe(connect.reload());
});

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('script',function(){
	gulp.src('./dev/js/*.js')
        .pipe(plumber())
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./site/'))
        .pipe(connect.reload());
});

var imagemin = require('gulp-imagemin');

gulp.task('image',function(){
	gulp.src('./dev/image/*')
        .pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest('./site/img/'))
        .pipe(connect.reload());
});

//watcher
gulp.task('watcher',function(){
	gulp.watch('pug/**/*.pug',{cwd:'./dev/'},['html']);
	gulp.watch('scss/*.scss',{cwd:'./dev/'},['styles']);
	gulp.watch('js/*.js',{cwd:'./dev/'},['script']);
	gulp.watch('image/**/*.{png,jpeg,jpg,gif,svg}',{cwd:'./dev/'},['image']);
});

gulp.task('default',['styles', 'html','script','image']);
gulp.task('dev',['default','connect','watcher']);


