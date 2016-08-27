import template from 'lodash.template'
import defaultsDeep from 'lodash.defaultsdeep'
import { getData as getTemplateData } from './templateData'

function compile (templatePath, data = { version: 1 } , templateSubComponent) {
  const { version } = data
  let tmplStr = require(`../../src/js/views/${templatePath}/index.tmpl.js`)

  if (typeof tmplStr === 'object') {
    tmplStr = tmplStr[ templateSubComponent || 'default' ]
  }

  data = defaultsDeep(data, getTemplateData(templatePath, templateSubComponent, version))
  const tmpl = template(tmplStr)

  return tmpl(data)
}

export default compile
