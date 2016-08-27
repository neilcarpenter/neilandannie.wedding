import changed from 'gulp-changed'
import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import pkg from '../../package.json'
import { argv } from 'yargs'

const dest = `${pkg.folders.dest}/img`
const src = [
  `${pkg.folders.src}/img/**`,
  `!${pkg.folders.src}/img/icons/**/*`
]

gulp.task('_allImages', () => {
  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(imagemin())
    .pipe(gulp.dest(dest))
})

gulp.task('images', [ '_allImages' ], () => {
  const src = [
    `${pkg.folders.src}/img/**`,
    `!${pkg.folders.src}/img/icons/**/*`,
    `!${pkg.folders.src}/img/_placeholders/**/*`
  ]

  return gulp.src(src)
    .pipe(gulp.dest(dest))
})
