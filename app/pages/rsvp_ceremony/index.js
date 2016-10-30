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
    title: 'RSVP ceremony page',
    pageContent: compileTemplate('pages/Rsvp', {
      version,
      content,
      form: compileTemplate('components/FormEmbed', { version: 1 })
    }),
    gridContent,
    version
  })
}

function rsvpCeremony (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default rsvpCeremony
