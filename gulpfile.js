var gulp = require('gulp')
var babel = require('gulp-babel')

gulp.task('build', function () {
  return gulp.src('src/*')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
  gulp.watch('src/*', ['build'])
})
