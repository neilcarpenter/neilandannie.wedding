import fs from 'fs'

const sourceDir = './app/pages'
const targetDir = './app/build'

function compileAndSavePage(name) {
  const pageModule  = require('../app/pages/' + name)
  const pageContent = pageModule.getPageHtml()
  const pagePath = name === 'home' ? '' : `${name.replace(/_/g, '/')}`
  const target = `${targetDir}/${pagePath}`

  if (!fs.existsSync(target)){
    fs.mkdirSync(target)
  }

  console.log("Writing static HTML for page %s to %s", name, target)
  fs.writeFileSync(`${target}/index.html`, pageContent)
}

fs.readdir(sourceDir, (err, names) => {
  names.forEach((name) => {
    if (fs.statSync(sourceDir + '/' + name).isDirectory()) {
      compileAndSavePage(name)
    }
  })
})
