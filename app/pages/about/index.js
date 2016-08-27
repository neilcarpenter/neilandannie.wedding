import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'
import pagesConfig from '../../config/pages'

function getPageHtml (version) {
  const versionPath = version ? `/${version}` : ''

  version = version || 1

  return getPageMarkup({
    title: 'About page',
    pagePath: `${pagesConfig.PAGES.ABOUT.route}${versionPath}`,
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
