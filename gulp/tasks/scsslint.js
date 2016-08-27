import gulp from 'gulp'
import scsslint from 'gulp-scss-lint'
import pkg from '../../package.json'

gulp.task('scsslint', () => {

  return gulp.src([ `./${pkg.folders.src}/scss/**/*.scss` ])
    .pipe(scsslint({
      config: '.scss-lint.yml'
    }))
})
