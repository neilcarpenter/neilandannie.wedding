import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import pkg from '../../package.json'

const dest = `${pkg.folders.dest}/appIcons`

gulp.task('appIcons', () => {
  const src = [
    `${pkg.folders.src}/appIcons/**`
  ]

  return gulp.src(src)
    .pipe(imagemin())
    .pipe(gulp.dest(dest))
})
