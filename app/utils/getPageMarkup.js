import fs from 'fs'
import path from 'path'
import pick from 'lodash.pick'
import defaults from 'lodash.defaults'
import template from 'lodash.template'

import appConfig from '../config/app'
import htmlTmplStr from '../../src/js/views/core/html/index.tmpl.js'
import compileTemplate from './templateCompiler'

function _getStaticAssets () {
  let manifest, assets

  try {
    manifest = require('../rev-manifest.json')
  } catch (e) {
    console.log('No rev-manifest found, using defaults.')
  }

  if (manifest) {
    assets = {
      cssMain: manifest[ 'css/main.css' ],
      jsModernizr: manifest[ 'js/vendor/modernizr-custom.js' ],
      jsClassList: manifest[ 'js/vendor/classList.min.js' ],
      jsMain: manifest[ 'js/main.js' ]
    }
  } else {
    assets = {
      cssMain: 'css/main.css',
      jsModernizr: 'js/vendor/modernizr-custom.js',
      jsClassList: 'js/vendor/classList.min.js',
      jsMain: 'js/main.js'
    }
  }

  return assets
}

function _getHtmlVars (vars = {}) {
  const assets = _getStaticAssets()

  const basePath = `${appConfig.BASE_ROUTES.PAGES}`

  const htmlDefaults = {
    title: 'neilandannie.wedding front-end',
    lang: 'en-gb',
    assets: assets,
    config: {
      basePath: basePath,
      baseUrl: '', // TEMP
      homePath: appConfig.homePath,
      routeBlacklist: []
    },
    isHome: vars.isHome
  }

  const htmlVars = pick(vars, Object.keys(htmlDefaults))

  return defaults(htmlVars, htmlDefaults)
}

function getHeader (version) {
  const logoSvg = fs.readFileSync(path.resolve(__dirname, '../build/assets/img/logos/logo.svg'))
  const header = compileTemplate('core/Header', {
    logoSvg,
    version
  })

  return header
}

function getPageMarkup (vars = {}) {
  const htmlTmpl = template(htmlTmplStr)
  const htmlVars = _getHtmlVars(vars)
  const svgSymbols = fs.readFileSync(path.resolve(__dirname, '../build/assets/img/icons/symbol/svg/sprite.symbol.svg'))

  htmlVars.main = compileTemplate('core/Wrapper', {
    pageContent: vars.pageContent
  })
  htmlVars.header = getHeader(vars.version)
  htmlVars.galleryGrid = compileTemplate('components/GalleryGrid', {
    version: 1,
    gridContent: vars.gridContent
  })
  htmlVars.galleryGridModal = compileTemplate('components/GalleryGridModal', { version: 1 })
  htmlVars.svgSymbols = svgSymbols

  return htmlTmpl(htmlVars)
}

export default getPageMarkup
export { getPageMarkup, _getStaticAssets, _getHtmlVars }
