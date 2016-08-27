import gulp from 'gulp'
import path from 'path'
import vinylPaths from 'vinyl-paths'
import del from 'del'
import filter from 'gulp-filter'
import rev from 'gulp-rev'
import pkg from '../../package.json'

const exts = [ 'css', 'js' ]
const re = new RegExp('(-[a-z0-9]{8,})(.(' + exts.join('|') + '))$', 'i')

const src = [
  pkg.folders.dest + '/**/*.{' + exts.join(',') + '}'
]
const dest = pkg.folders.dest
const destManifest = path.resolve(pkg.folders.dest, '../../')

gulp.task('_versionCleanAssets', () => {
  return gulp.src(src)
    .pipe(rev())
    .pipe(gulp.dest(dest))
    .pipe(rev.manifest())
    .pipe(gulp.dest(destManifest))
})

gulp.task('revAssets', [ '_versionCleanAssets' ], () => {

  const unHashedFilter = filter((file) => {
    return !re.test(file.path)
  })

  const stream = gulp.src(src)
    .pipe(unHashedFilter)
    .pipe(vinylPaths(del))

  return stream
})
