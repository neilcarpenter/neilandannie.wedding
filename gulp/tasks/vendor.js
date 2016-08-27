import gulp from 'gulp'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import gutil from 'gulp-util'
import pkg from '../../package.json'

gulp.task('vendor', [ '_vendor_shims', '_vendor_modernizr' ], () => {

  const source = []

  for (let key in pkg.vendor) {
    source.push(pkg.folders.vendor + '/' + pkg.vendor[ key ])
  }

  return gulp.src(source)
    .pipe(concat('v.js'))
    .pipe(global.isProduction ? uglify() : gutil.noop())
    .pipe(gulp.dest(`${pkg.folders.dest}/js/vendor/`))
})

gulp.task('_vendor_modernizr', () => {

  return gulp.src([ `${pkg.folders.vendor}/modernizr-custom.js` ])
    .pipe(global.isProduction ? uglify() : gutil.noop())
    .pipe(gulp.dest(`${pkg.folders.dest}/js/vendor/`))
})

gulp.task('_vendor_shims', () => {

  const shims = [
    'classList.min.js'
  ].map((shim) => `${pkg.folders.vendor}/${shim}`)

  return gulp.src(shims)
    .pipe(global.isProduction ? uglify() : gutil.noop())
    .pipe(gulp.dest(`${pkg.folders.dest}/js/vendor/`))
})
