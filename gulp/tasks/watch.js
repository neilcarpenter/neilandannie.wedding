/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js automatically reloads any files
     that change within the directory it's serving from
*/

import gulp from 'gulp'
import pkg from '../../package.json'

gulp.task('watch', [ 'setWatch', 'browserSync' ], () => {

  gulp.watch(`${pkg.folders.src}/scss/**`, [ 'scss' ])
  gulp.watch(`${pkg.folders.src}/vendor/**`, [ 'vendor' ])
})
