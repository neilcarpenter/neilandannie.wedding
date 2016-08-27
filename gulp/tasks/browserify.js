/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

import gulp from 'gulp'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import gutil from 'gulp-util'
import stripDebug from 'gulp-strip-debug'
import bundleLogger from '../util/bundleLogger'
import handleErrors from '../util/handleErrors'
import { argv } from 'yargs'
import pkg from '../../package.json'

const src =`./${pkg.folders.src}/js/Main.js`
const dest = `./${pkg.folders.dest}/js/`
const destName = 'main.js'

gulp.task('browserify', () => {

  let bundleCount = 0
  let shouldReload = false
  let browserSync

  let bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: false,
    // Browserify Options
    entries: [ src ],
    paths: [ './src/js/' ],
    // Enable source maps!
    debug: !global.isProduction
  })

  bundler.transform(babelify.configure({
    plugins: [ 'transform-class-properties' ]
  }))

  function bundle () {
    if (bundleCount > 0) {
      browserSync = require('browser-sync').get('hello server')
      shouldReload = true
    }

    bundleCount++

    // Log when bundling starts
    bundleLogger.start()

    return bundler
      .bundle()
      // Report compile errors
      .on('error', handleErrors)

      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specifiy the
      // desired output filename here.
      .pipe(source(destName))

      // if not watching, prepare for production
      .pipe(buffer())
      .pipe(global.isProduction ? stripDebug() : gutil.noop())
      .pipe(global.isProduction ? uglify() : gutil.noop())

      // Specify the output destination
      .pipe(gulp.dest(dest))

      // Log when bundling completes!
      .on('end', () => {

        bundleLogger.end()

        if (shouldReload) {
          browserSync.reload()
        }
      })
  }

  if (global.isWatching) {
    bundler = watchify(bundler)
    bundler.on('update', bundle)
  }

  return bundle()
})
