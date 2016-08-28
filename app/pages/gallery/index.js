import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

export function getPageHtml (version) {
  version = version || 1

  return getPageMarkup({
    title: 'Gallery page',
    pageContent: compileTemplate('pages/Gallery', {
      version
    }),
    version
  })
}

function gallery (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default gallery
