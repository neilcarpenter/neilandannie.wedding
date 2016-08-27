import gulp from 'gulp'
import sass from 'gulp-sass'
import prefix from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import gutil from 'gulp-util'
import rename from 'gulp-rename'
import handleErrors from '../util/handleErrors'
import { argv } from 'yargs'
import pkg from '../../package.json'

let browserSyncInitiated = false
let browserSync

const src = `${pkg.folders.src}/scss/main.scss`
const dest = `${pkg.folders.dest}/css`

const destName = 'main'

function nameOutput (path) {
  path.basename = destName
}

gulp.task('scss', [ 'images' ], () => {

  if (global.isWatching && !browserSyncInitiated) {
    browserSync = require('browser-sync').get('hello server')
    browserSyncInitiated = true
  }

  return gulp.src(src)
    .pipe(!global.isProduction ? sourcemaps.init() : gutil.noop())
    .pipe(sass())
    .on('error', handleErrors)
    .pipe(prefix({ browsers: [ 'last 2 versions', 'IE 9' ] }))
    .pipe(rename(nameOutput))
    .pipe(global.isProduction ? cleanCSS({ restructuring: false }) : gutil.noop())
    .pipe(!global.isProduction ? sourcemaps.write() : gutil.noop())
    .pipe(gulp.dest(dest))
    .pipe(!global.isWatching ? gutil.noop() : browserSync.stream())
})
