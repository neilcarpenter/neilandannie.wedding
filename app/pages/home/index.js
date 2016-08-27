import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'
import pagesConfig from '../../config/pages'

function getPageHtml (version) {
  const versionPath = version ? `/${version}` : ''

  version = version || 1

  return getPageMarkup({
    title: 'Homepage',
    pagePath: `${pagesConfig.PAGES.HOME.route}${versionPath}`,
    pageContent: compileTemplate('pages/Home', {
      version,
      test: compileTemplate('components/Test', { version })
    }),
    version
  })
}

function home (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default home
