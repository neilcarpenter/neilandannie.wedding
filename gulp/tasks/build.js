import gulp from 'gulp'
import runSequence from 'run-sequence'
import { argv } from 'yargs'

gulp.task('build', () => {

  global.isProduction = argv.production

  const args = [
    'unrevAssets',
    [ 'browserify', 'scss', 'vendor', 'images', 'icons', 'appIcons', 'fonts' ]
  ]

  if (!global.isWatching && global.isProduction) {
    args.splice(2, 0, 'revAssets')
  }

  runSequence.apply(this, args)
})
