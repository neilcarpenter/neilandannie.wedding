import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

export function getPageHtml (version) {
  version = version || 1

  return getPageMarkup({
    title: 'RSVP evening page',
    pageContent: compileTemplate('pages/Rsvp', {
      version,
      form: compileTemplate('components/FormEmbed', { version: 2 })
    }),
    version
  })
}

function rsvpEvening (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default rsvpEvening
