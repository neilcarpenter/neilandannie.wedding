import gulp from 'gulp'
import pkg from '../../package.json'

const src = `${pkg.folders.src}/fonts/**`
const dest = `${pkg.folders.dest}/fonts`

gulp.task('fonts', () => {
  return gulp.src(src)
    .pipe(gulp.dest(dest))
})
