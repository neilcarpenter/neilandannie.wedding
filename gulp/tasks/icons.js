import gulp from 'gulp'
import gutil from 'gulp-util'
import imagemin from 'gulp-imagemin'
import pkg from '../../package.json'
import svgSprite from 'gulp-svg-sprite'

const src = `${pkg.folders.src}/img/icons/**/*.svg`
const dest = `${pkg.folders.dest}/img/icons`

gulp.task('icons', () => {

  return gulp.src(src)
    .pipe(imagemin({
      svgoPlugins: [{
        // convertStyleToAttrs: true,
        // remove class attributes as the inner css classes
        // are overriding external styling
        removeAttrs: {
          attrs: '(class|style|fill)'
        }
      }]
    }))
    .pipe(svgSprite({
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        rootAttributes: {
          style: 'clip:rect(0,0,0,0);height:0;width:0;position:absolute;transform:scale(0);'
        }
      },
      mode: {
        css: false, // Create a «css» sprite
        view: false, // Create a «view» sprite
        defs: false, // Create a «defs» sprite
        symbol: true, // Create a «symbol» sprite
        stack: false // Create a «stack» sprite
      },
      dest: dest
    }).on('error', gutil.log))
    .pipe(gulp.dest(dest))
})
