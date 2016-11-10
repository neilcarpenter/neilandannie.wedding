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
    title: 'RSVP for evening guests - Annie and Neil, wedding time',
    pageContent: compileTemplate('pages/Rsvp', {
      version,
      content,
      form: compileTemplate('components/FormEmbed', { version: 2 })
    }),
    gridContent,
    version
  })
}

function rsvpEvening (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default rsvpEvening
