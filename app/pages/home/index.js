import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'
import sanitiseGridContent from '../../utils/sanitiseGridContent'

import { neilAndAnnie, neilAndAnnieExtension, wedding } from '../../gridContent'

export function getPageHtml (version) {
  version = version || 1

  let gridContent = {
    _keys: [ neilAndAnnie.label ],
    data: [
      neilAndAnnie
    ]
  }
  gridContent = sanitiseGridContent(gridContent)

  return getPageMarkup({
    title: 'Annie and Neil, wedding time',
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
