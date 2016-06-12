var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var filter = require('gulp-filter');
var merge = require('merge-stream');
var debug = require('gulp-debug');
var plumber = require('gulp-plumber');
var server = require('gulp-server-livereload');

var s_filter_i, js_filter, js_filter_i;

(function(){

    function createFilter(file_ending, inverse) {
        if (typeof(file_ending) == "string") { file_ending = [file_ending]}
        var pattern = [];

        if (inverse) {
            pattern.push("**");
        }

        file_ending.forEach(function(e) { pattern.push((inverse?"!":"") + "**/*." + e); });

        return filter(pattern);
    }

    s_filter_i = createFilter(['scss', 'css'],true);
    js_filter = createFilter('js');
    js_filter_i = createFilter('js',true)

})();

gulp.task('webserver',['watch'], function() {
  gulp.src('public')
    .pipe(server({
	  defaultFile: 'index.html',
      livereload: true,
	  port:8080,
      directoryListing: false,
      open: true
    }));
});

gulp.task('sass', function () {
    return gulp.src([
        //usually only screen.scss
        'app/sass/**/*.scss',
        // no partials
        "!app/sass/**/_*.scss",
        //no libs
        '!app/sass/libs/**/*'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'));
});

var files = {
    data_src : [
        './files.json',
        'data/**/*.*'
    ],
};

gulp.task('copy-data', function() {
    gulp.src(files.data_src, { base: './' })
        .pipe(gulp.dest('public'));
});

gulp.task('frontend-libs-copy', function() {

    var all_libs = gulp.src(mainBowerFiles(), { base: 'bower_components' })
        .pipe(plumber())
        //css and scss should be includes using sass
        .pipe(s_filter_i);


    var other_libs = all_libs
        .pipe(js_filter_i)
        .pipe(gulp.dest('./public/libs'));

    /**
     * suspend minification due to chrome bug
     * https://bugs.chromium.org/p/chromium/issues/detail?id=327092
     */
    var js_libs = all_libs
        .pipe(js_filter)
        //.pipe(sourcemaps.init())
        .pipe(concat('libs.js'))
        //.pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/libs'));

    return merge(other_libs, js_libs);
});

gulp.task('app-js', function () {
    //first list files that define new modules. the module definitions must be at the beginning
    return gulp.src(['app/ng/**/app.js', 'app/ng/components/movies/movies-module.js', 'app/ng/**/*.js'])
        .pipe(plumber())
        /*
        suspend minification, since angular cannot handle sourcemaps in errors https://github.com/angular/angular.js/issues/5217#issuecomment-50993513
         */
        //.pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        //.pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'))
})

gulp.task('app-templates', function () {
    return gulp.src('app/ng/**/*.html')
        .pipe(plumber())
        .pipe(templateCache('templates.js', {standalone: true}))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'));
});

var MAIN_TASKS = ['app-js', 'app-templates', 'frontend-libs-copy', 'sass','copy-data'];

gulp.task('watch', MAIN_TASKS, function () {
    gulp.watch('app/ng/**/*.js', ['app-js']);
    gulp.watch('app/ng/**/*.html', [ 'app-templates']);
    gulp.watch('bower.json', [ 'frontend-libs-copy']);
    gulp.watch(['app/sass/**/*.scss', 'bower.json'], ['sass']);
    gulp.watch('data/**/*.*', ['copy-data']);
})

gulp.task('install', MAIN_TASKS);

gulp.task('clean', function () {
    return gulp.src([
                        'public/js/app.js',
                        'public/js/templates.js',
                        'public/css',
                        'public/libs',
                        'public/data'], {read: false})
        .pipe(clean());
});





