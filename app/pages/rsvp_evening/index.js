import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

export function getPageHtml (version) {
  version = version || 1

  return getPageMarkup({
    title: 'RSVP evening page',
    pageContent: compileTemplate('pages/RsvpEvening', {
      version,
      test: compileTemplate('components/Test', { version })
    }),
    version
  })
}

function rsvpEvening (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default rsvpEvening
