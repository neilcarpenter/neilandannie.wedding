import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

import content from './content.tmpl'
import { neilAndAnnie, wedding } from '../../gridContent'

export function getPageHtml (version) {
  version = version || 1

  const gridContent = {
    _keys: [ neilAndAnnie.label, wedding.label ],
    data: [
      neilAndAnnie,
      wedding
    ]
  }

  return getPageMarkup({
    title: 'About page',
    pageContent: compileTemplate('pages/General', {
      version,
      content
    }),
    gridContent,
    version
  })
}

function about (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default about
