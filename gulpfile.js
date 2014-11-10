var gulp = require('gulp'),
    $    = require('gulp-load-plugins')();


var paths = {
  scripts: ['src/directives/loader-directive.js', 'src/services/*.js'],
  css: ['src/styles/bar-loader.css', 'src/styles/materialSpinner.css']
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
    .pipe($.notify({message: 'Finished Concating the CSS'}));
});


gulp.task('default', ['jshint', 'css']);