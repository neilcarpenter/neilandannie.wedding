import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

export function getPageHtml (version) {
  version = version || 1

  return getPageMarkup({
    title: 'Homepage',
    pageContent: compileTemplate('pages/Home', {
      version
    }),
    version
  })
}

function home (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default home
