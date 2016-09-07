import fs from 'fs'
import minifier from 'html-minifier'

const sourceDir = './app/pages'
const targetDir = './app/build'

const minifyOpts = {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true
}

function compileAndSavePage(name) {
  const pageModule  = require('../app/pages/' + name)
  const pageContent = pageModule.getPageHtml()
  const pageContentMin = minifier.minify(pageContent, minifyOpts)
  const pagePath = name === 'home' ? '' : `${name.replace(/_/g, '/')}`
  const target = `${targetDir}/${pagePath}`

  if (!fs.existsSync(target)){
    fs.mkdirSync(target)
  }

  console.log("Writing static HTML for page %s to %s", name, target)
  fs.writeFileSync(`${target}/index.html`, pageContentMin)
}

fs.readdir(sourceDir, (err, names) => {
  names.forEach((name) => {
    if (fs.statSync(sourceDir + '/' + name).isDirectory()) {
      compileAndSavePage(name)
    }
  })
})
