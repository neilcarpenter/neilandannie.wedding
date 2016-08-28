import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

export function getPageHtml (version) {
  version = version || 1

  return getPageMarkup({
    title: 'RSVP ceremony page',
    pageContent: compileTemplate('pages/Rsvp', {
      version,
      form: compileTemplate('components/FormEmbed', { version: 1 })
    }),
    version
  })
}

function rsvpCeremony (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default rsvpCeremony
