import last from 'lodash.last'
import isEmpty from 'lodash.isempty'

import AppModel from 'models/AppModel'
import serializeToQueryString from 'utils/serializeToQueryString'

const safeUrlRe = {
  fileExtRe: /\./,
  absoluteUrlRe: /^(f|ht)tps?:\/\//i
}

const BLACKLIST = [] // @TODO - move to AppModel

const UrlHelper = {
  setup() {
    const appModel = AppModel.getInstance()

    safeUrlRe.basePathRe = new RegExp('^' + '/' + appModel.get('basePath'), 'i')
    safeUrlRe.baseUrlRe = new RegExp(appModel.get('baseUrl'), 'i')
  },

  _getUriSegments(href) {
    const relativeHref = UrlHelper.getRelativeHref(href)
    const uriSegments = relativeHref ? relativeHref.split('/') : []
    return uriSegments
  },

  isSafeUrl(href = '') {
    let isSafe = false

    const uriSegments = UrlHelper._getUriSegments(href)

    if (href === '' || href === '/' || uriSegments[ 0 ] === '') {
      // navigating to base route
      isSafe = true
    } else if ((safeUrlRe.fileExtRe).test(last(uriSegments))) {
      // file extension
      isSafe = false
    } else if (safeUrlRe.absoluteUrlRe.test(href) && !safeUrlRe.baseUrlRe.test(href)) {
      // absolute URL that isn't local
      isSafe = false
    } else if (BLACKLIST.indexOf(uriSegments[ 0 ]) === -1) { // @TODO - use full path not first URI segment
      // is a local URL, and is within a safe route
      isSafe = true
    }

    return isSafe
  },

  getRelativeHref(href) {
    const appModel = AppModel.getInstance()

    let relativeHref = safeUrlRe.baseUrlRe.test(href) ?
      href.split(appModel.get('baseUrl'))[ 1 ] :
      href

    relativeHref = appModel.get('basePath') && safeUrlRe.basePathRe.test(relativeHref) ?
      relativeHref.split(appModel.get('basePath'))[ 1 ] :
      relativeHref

    relativeHref = relativeHref && relativeHref.charAt(0) === '/' ?
      relativeHref.substr(1) :
      relativeHref

    return relativeHref
  },

  getFullUrlFromRouteObject(obj) {
    const appModel = AppModel.getInstance()

    const path = UrlHelper.getFullPathFromRouteObject(obj)
    const url = `${appModel.get('baseUrl')}/${path}`

    return url
  },

  getFullPathFromRouteObject(obj) {
    const route = obj.route || ''
    if (isEmpty(obj.query)) {
      return route
    } else {
      return `${route}?${serializeToQueryString(obj.query)}`
    }
  }
}

export default UrlHelper
