import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'
import sanitiseGridContent from '../../utils/sanitiseGridContent'

import content from './content.tmpl'
import { neilAndAnnie, wedding } from '../../gridContent'

export function getPageHtml (version) {
  version = version || 1

  let gridContent = {
    _keys: [ neilAndAnnie.label, wedding.label ],
    data: [
      neilAndAnnie,
      wedding
    ]
  }
  gridContent = sanitiseGridContent(gridContent)

  return getPageMarkup({
    title: 'RSVP - Annie and Neil, wedding time',
    pageContent: compileTemplate('pages/General', {
      version,
      content
    }),
    gridContent,
    version
  })
}

function rsvp (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default rsvp
