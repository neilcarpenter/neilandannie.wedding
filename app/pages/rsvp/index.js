import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

export function getPageHtml (version) {
  version = version || 1

  return getPageMarkup({
    title: 'RSVP page',
    pageContent: compileTemplate('pages/Rsvp', {
      version,
      test: compileTemplate('components/Test', { version })
    }),
    version
  })
}

function rsvp (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default rsvp
