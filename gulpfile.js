var gulp = require('gulp'),
    $    = require('gulp-load-plugins')();


var paths = {
  scripts: ['src/ngLoading.js', 'src/directives/loader-directive.js', 'src/services/*.js', 'src/directives/*.js'],
  css: ['src/styles/style.css', 'src/styles/bar-loader.css', 'src/styles/materialSpinner.css']
};

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe($.jshint())
    .pipe($.jshint({reporter: 'jshint-stylish'}))
    .pipe($.notify({message: 'Finished Linting'}));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe($.concat('ngLoading.css'))
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({message: 'Finished Concating your CSS'}));
});

gulp.task('js', ['css'], function() {
  return gulp.src(paths.scripts)
    .pipe($.concat('ngLoading.js'))
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({message: 'Finished Concating your scripts'}));
});

gulp.task('watch', function() {
  $.watch(paths.scripts, ['default']);
  $.watch(paths.css, ['default']);
});


gulp.task('default', ['jshint', 'js', 'watch']);