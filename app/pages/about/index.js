import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

export function getPageHtml (version) {
  version = version || 1

  return getPageMarkup({
    title: 'About page',
    pageContent: compileTemplate('pages/About', {
      version,
      test: compileTemplate('components/Test', { version })
    }),
    version
  })
}

function about (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default about
