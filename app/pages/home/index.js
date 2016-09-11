import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

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
    title: 'Homepage',
    isHome: true,
    pageContent: compileTemplate('pages/Home', {
      version
    }),
    gridContent,
    version
  })
}

function home (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default home
