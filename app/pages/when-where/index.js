import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'
import sanitiseGridContent from '../../utils/sanitiseGridContent'

import content from './content.tmpl'
import { wedding } from '../../gridContent'

export function getPageHtml (version) {
  version = version || 1

  let gridContent = {
    _keys: [ wedding.label ],
    data: [
      wedding
    ]
  }
  gridContent = sanitiseGridContent(gridContent)

  return getPageMarkup({
    title: 'When and where - Annie and Neil, wedding time',
    pageContent: compileTemplate('pages/General', {
      version,
      content
    }),
    gridContent,
    version
  })
}

function whenWhere (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default whenWhere
