import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

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
    title: 'RSVP evening page',
    pageContent: compileTemplate('pages/Rsvp', {
      version,
      content: '',
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
