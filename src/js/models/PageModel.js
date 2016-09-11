import Model from 'ampersand-model'
import Promise from 'native-promise-only'

import Channel from 'common/Channel'
import Constants from 'common/Constants'

const AVERAGE_PAGE_SIZE = 30000

export function getPagePartials(page) {
  const partialsObject = {}

  let partials = page.querySelectorAll('[data-naaw-page-partial]')
  partials = Array.prototype.slice.call(partials)
  partials.forEach(partial => {
    const name = partial.dataset.naawPagePartial
    if (partialsObject[name]) {
      partialsObject[name].push(partial)
    } else {
      partialsObject[name] = [ partial ]
    }
  })

  return partialsObject
}

const PageModel = Model.extend({

  _promise: {
    resolve: null,
    reject: null,
  },
  _xhr: null,

  props: {
    document: 'object',
    page: 'object',
    pageType: 'string',
    pageUrl: 'string',
    pagePartials: 'object',
    title: 'string',
    description: 'string',
    gridContent: 'object'
  },

  requiredProps: [
    'document',
    'page',
    'pageType',
    'pageUrl',
    'title'
  ],

  ajaxConfig() {
    if (Modernizr.xhr2) {
      return {
        xhr: this.getXhr.call(this),
        responseType: 'document'
      }
    }
  },

  url() {
    return this.get('pageUrl')
  },

  fetch() {
    let xhr
    const promise = new Promise((resolve, reject) => {
      this._promise = { resolve, reject }
      this._xhr = xhr = PageModel.__super__.fetch.apply(this, arguments)
      this.once('sync', this.onSync.bind(this))
    })

    return { promise, xhr }
  },

  parse(response, options) {
    const document = response
    const page = response.querySelector('[data-naaw-page]')
    const pageType = page ? page.dataset.naawPage : null
    const pagePartials = getPagePartials(page)
    const title = response.querySelector('title').textContent
    const description = response.querySelector('meta[name="description"]') ? response.querySelector('meta[name="description"]').getAttribute('content') : null
    const gridContent = JSON.parse(document.querySelector('[data-grid-content]').getAttribute('data-grid-content'))

    return {
      document,
      page,
      pageType,
      pagePartials,
      title,
      description,
      gridContent
    }
  },

  hasCorrectData() {
    const data = this.toJSON()
    const setProps = this.requiredProps.filter(prop => !!data[prop])
    return setProps.length === this.requiredProps.length
  },

  getXhr() {
    const xhr = new window.XMLHttpRequest()

    xhr.addEventListener('loadstart', this.onStart, false)
    xhr.addEventListener('progress', this.onProgress, false)
    xhr.addEventListener('load', this.onComplete.bind(this), false)
    xhr.addEventListener('error', this.onError.bind(this), false)
    xhr.addEventListener('abort', this.onAbort.bind(this), false)

    return xhr
  },

  onStart() {
    // console.log(`PageModel::onStart()`)

    Channel.trigger(Constants.EVENT_PAGE_LOAD_START)
  },

  onProgress(evt) {
    const percentComplete = (evt.loaded / AVERAGE_PAGE_SIZE) * 100
    // console.log(`PageModel::onProgress() ${percentComplete}`)

    Channel.trigger(Constants.EVENT_PAGE_LOAD_PROGRESS, percentComplete)
  },

  onComplete() {
    // console.log(`PageModel::onComplete()`)

    if (this._xhr.status > 400) this._promise.reject(this)

    Channel.trigger(Constants.EVENT_PAGE_LOAD_END)
  },

  onAbort() {
    // console.log(`PageModel::onAbort()`)

    Channel.trigger(Constants.EVENT_PAGE_LOAD_ABORT)
  },

  onError() {
    // console.log(`PageModel::onError()`)

    this._promise.reject(this)

    Channel.trigger(Constants.EVENT_PAGE_LOAD_ERROR)
  },

  onSync() {
    if (this.hasCorrectData()) {
      this._promise.resolve(this)
    } else {
      this._promise.reject(this)
    }
  }

})

export default PageModel
