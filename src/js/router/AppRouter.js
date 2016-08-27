import Router from 'ampersand-router'
import assign from 'lodash.assign'
import isEmpty from 'lodash.isempty'

import AppView from 'views/AppView'
import AppModel from 'models/AppModel'
import Channel from 'common/Channel'
import Constants from 'common/Constants'
import Singleton from 'common/Singleton'
import UrlHelper from 'common/UrlHelper'
import parseQueryString from 'utils/parseQueryString'

const AppRouter = Router.extend({
  FIRST_ROUTE: true,

  routes: {
    '*route': 'hashChanged'
  },

  routeCount: 0,

  current: { route: null, query: null },
  previous: { route: null, query: null },
  params: null,

  constructor(config = {}) {
    this._bindClassMethods()
    AppRouter.__super__.constructor.call(this, config)
  },

  execute(callback, args, name) {
    // parse querystring and hand to the route callback
    args.push(parseQueryString(args.pop()))

    if (callback) callback.apply(this, args)
  },

  start() {
    this.disableScrollRestoration()

    const appModel = AppModel.getInstance()

    if (Modernizr.naaw_page_transitions) {
      this.history.start({
        pushState: true,
        hashChange: false,
        root: `/${appModel.get('basePath')}`
      })
    } else {
      // manually invoke this, it will only get called once
      // per page load in fallback browsers - we just need
      // to invoke it to instantiate the page JS
      // TODO - tidy this
      const appView = AppView.getInstance()
      appView.wrapper.onHashChanged(
        { route: UrlHelper.getRelativeHref(window.location.pathname) },
        {},
        { FIRST_ROUTE: true }
      )
    }

    // listen for hash change separately for slideshow images:
    window.addEventListener('hashchange', this.onAnchorChange, false)

    if (this.getAnchor()) this.onAnchorChange()
  },

  _bindClassMethods() {
    this.onAnchorChange = this.onAnchorChange.bind(this)
  },

  hashChanged(route, query) {
    query = isEmpty(query) ? null : query

    this.previous = this.current
    this.current = { route, query}

    this.params = { FIRST_ROUTE: this.FIRST_ROUTE }

    // console.log(`>> EVENT_HASH_CHANGED @current <<`, this.current, this.previous)

    if (this.FIRST_ROUTE) this.FIRST_ROUTE = false

    Channel.trigger(Constants.EVENT_HASH_CHANGED, this.current, this.previous, this.params)

    this.routeCount++
  },

  navigateTo(where = '' , options = {}, params = {}) {
    // console.log('--> navigateTo:where', where)

    const whereRelativePath = UrlHelper.getRelativeHref(where) || '/'

    // console.log('--> navigateTo:whereRelativePath', whereRelativePath)

    this.params = params

    this.navigate(whereRelativePath, options)
  },

  onAnchorChange() {
    const hash = this.getAnchor()
    Channel.trigger(Constants.EVENT_ANCHOR_CHANGED, hash)
  },

  changeAnchor(hash) {
    const currentAnchor = this.getAnchor()

    if (!window.history.pushState) return

    if (!hash) {
      window.history.pushState('', document.title, window.location.pathname)
      this.onAnchorChange()
      return
    }

    if (hash !== currentAnchor) {
      const historyMethod = !currentAnchor ? 'pushState' : 'replaceState'
      window.history[ historyMethod ](null, null, `#${hash}`)
    }
  },

  getAnchor() {
    return window.location.hash.slice(1) || null
  },

  disableScrollRestoration() {
    if (Modernizr.naaw_page_transitions) {
      // manually control scroll position when using `history.pushState`
      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    }
  }
})

export default assign(AppRouter, Singleton)
