import compileTemplate from '../../utils/templateCompiler'
import getPageMarkup from '../../utils/getPageMarkup'

import content from './content.tmpl'

export function getPageHtml (version) {
  version = version || 1

  return getPageMarkup({
    title: 'Placed to stay page',
    pageContent: compileTemplate('pages/General', {
      version,
      content
    }),
    version
  })
}

function placesToStay (req, res) {
  return res.send(getPageHtml(req.params.version))
}

export default placesToStay
