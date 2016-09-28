import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

import content from './content.tmpl'
import { neilAndAnnie, neilAndAnnieExtension, wedding } from '../../gridContent'

export function getPageHtml (version) {
  version = version || 1

  const gridContent = {
    _keys: [ neilAndAnnie.label, neilAndAnnieExtension.label, wedding.label ],
    data: [
      neilAndAnnie,
      neilAndAnnieExtension,
      wedding
    ]
  }

  return getPageMarkup({
    title: 'Gallery page',
    pageContent: compileTemplate('pages/Gallery', {
      version,
      content
    }),
    gridContent,
    version,
    isGallery: true
  })
}

function gallery (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default gallery
