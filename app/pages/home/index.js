import fs from 'fs'
import path from 'path'

import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

export function getPageHtml (version) {
  version = version || 1

  const logoSvg = fs.readFileSync(path.resolve(__dirname, '../../build/assets/img/logos/logo.svg'))

  return getPageMarkup({
    title: 'Homepage',
    pageContent: compileTemplate('pages/Home', {
      version,
      logoSvg
    }),
    version
  })
}

function home (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default home
