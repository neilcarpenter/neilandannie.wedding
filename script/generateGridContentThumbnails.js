import fs from 'fs'
import path from 'path'
import im from 'imagemagick'
import imageOptim from 'imageoptim'

const THUMBNAIL_SIZE = '400x400'
const THUMBNAIL_DIR = '../app/gridContent/gridAssets/thumbnails/'
const SOURCE_DIRS = [
  '../app/gridContent/gridAssets/images/'
]

SOURCE_DIRS.forEach(sourceDir => {
  fs.readdir(path.resolve(__dirname, sourceDir), (err, files) => {
    files.forEach(file => {
      const src = path.resolve(__dirname, `${sourceDir}/${file}`)
      const dest = path.resolve(__dirname, `${THUMBNAIL_DIR}/${file}`)
      const args = [
        src,
        '-resize',
        THUMBNAIL_SIZE,
        dest
      ]
      im.convert(args, (err, stdout) => {
        if (err) throw err
        imageOptim.optim([dest])
        console.log(`Resized and optimised ${file}`)
      })
    })
  })
})
