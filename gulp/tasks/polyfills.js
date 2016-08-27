import gulp from 'gulp'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import gutil from 'gulp-util'
import pkg from '../../package.json'

gulp.task('polyfills', [ '_polyfill_shiv', '_polyfill_vendor' ])

gulp.task('_polyfill_shiv', () => {

  return gulp.src([ `${pkg.folders.vendor}/polyfill__html5shiv.js` ])
    .pipe(global.isProduction ? uglify() : gutil.noop())
    .pipe(gulp.dest(`${pkg.folders.dest}/js/vendor/`))
})

gulp.task('_polyfill_vendor', () => {

  const source = []

  for (let key in pkg.vendor_polyfill) {
    source.push(pkg.folders.vendor + '/' + pkg.vendor_polyfill[ key ])
  }

  return gulp.src(source)
    .pipe(concat('polyfill__v.js'))
    .pipe(global.isProduction ? uglify() : gutil.noop())
    .pipe(gulp.dest(`${pkg.folders.dest}/js/vendor/`))
})
