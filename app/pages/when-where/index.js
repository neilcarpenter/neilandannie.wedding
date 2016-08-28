import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

import content from './content.tmpl'

export function getPageHtml (version) {
  version = version || 1

  return getPageMarkup({
    title: 'When and where page',
    pageContent: compileTemplate('pages/General', {
      version,
      content
    }),
    version
  })
}

function whenWhere (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default whenWhere
