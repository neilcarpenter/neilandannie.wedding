import browserSync from 'browser-sync'
import gulp from 'gulp'

gulp.task('browserSync', [ 'build' ], () => {

  browserSync.create('hello server').init({
    port: 1234,
    proxy: '127.0.0.1:3000'
  })
})
