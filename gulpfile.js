var gulp   = require('gulp'),
    $      = require('gulp-load-plugins')(),
    bs     = require('browser-sync'),
    reload = bs.reload;


var paths = {
  scripts: ['src/ngLoading.js', 'src/directives/loader-directive.js', 'src/services/*.js', 'src/directives/*.js'],
  css: ['src/styles/*.css'],
  dev: ['demo/app/*.js', 'demo/index.html', 'demo/styles/*.css']
};

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe($.jshint())
    .pipe($.jshint({reporter: 'jshint-stylish'}))
    .pipe($.notify({message: 'Finished Linting'}));
});

gulp.task('dev', function(done) {
  bs({
    port: 9500,
    server: {
      baseDir: ['./demo', './dist']
    }
  }, done);

  gulp.watch(paths.scripts, ['js', reload]);
  gulp.watch(paths.css, ['css', reload]);
  gulp.watch(paths.dev, reload);
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe($.concat('ngLoading.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.dest('demo/styles/'))
    .pipe($.notify({message: 'Finished Concating your CSS'}));
});

gulp.task('js',['jshint'], function() {
  return gulp.src(paths.scripts)
    .pipe($.concat('ngLoading.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.dest('demo/app/'))
    .pipe($.notify({message: 'Finished Concating your scripts'}));
});

gulp.task('watch', ['js'], function() {
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.css, ['css']);
});


//task to tell travis to run karma start and run in phantom.js
gulp.task('test', $.shell.task([
  'karma start karma.conf.js --browsers Firefox --single-run'
]));

gulp.task('default', ['dev']);