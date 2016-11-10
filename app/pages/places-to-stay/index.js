import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'
import sanitiseGridContent from '../../utils/sanitiseGridContent'

import content from './content.tmpl'
import { location } from '../../gridContent'

export function getPageHtml (version) {
  version = version || 1

  let gridContent = {
    _keys: [ location.label ],
    data: [
      location
    ]
  }
  gridContent = sanitiseGridContent(gridContent)

  return getPageMarkup({
    title: 'Places to stay - Annie and Neil, wedding time',
    pageContent: compileTemplate('pages/General', {
      version,
      content
    }),
    gridContent,
    version
  })
}

function placesToStay (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default placesToStay
