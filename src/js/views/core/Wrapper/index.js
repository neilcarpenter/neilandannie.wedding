import assign from 'lodash.assign'

import AbstractView from 'views/abstract/AbstractView'
import AppRouter from 'router/AppRouter'
import PageModel, { getPagePartials } from 'models/PageModel'
import Singleton from 'common/Singleton'
import Channel from 'common/Channel'
import Constants from 'common/Constants'
import UrlHelper from 'common/UrlHelper'
import Analytics from 'common/Analytics'

import General from 'views/pages/General'
import Home from 'views/pages/Home'
import Gallery from 'views/pages/Gallery'
import Rsvp from 'views/pages/Rsvp'

const Wrapper = AbstractView.extend({
  template: 'wrapper',

  pages: [
    General,
    Home,
    Gallery,
    Rsvp
  ],

  activePageRequest: null,
  activePageModel: null,

  previousView: null,
  currentView: null,

  constructor() {
    this._bindClassMethods()
    Wrapper.__super__.constructor.call(this)
  },

  _bindClassMethods() {
    this.onHashChanged = this.onHashChanged.bind(this)
    this.onNewPageRequestDone = this.onNewPageRequestDone.bind(this)
    this.onPageModelRequest = this.onPageModelRequest.bind(this)
  },

  init() {
    this.bindEvents()
    this.bindChannelReplies()
  },

  dispose() {
    Channel.stopReplying(Constants.REQUEST_PAGE_MODEL)

    Wrapper.__super__.dispose.apply(this, arguments)
  },

  bindEvents() {
    this.listenTo(Channel, Constants.EVENT_HASH_CHANGED, this.onHashChanged)
  },

  bindChannelReplies() {
    Channel.reply(Constants.REQUEST_PAGE_MODEL, this.onPageModelRequest)
  },

  onHashChanged(current, previous, params) {
    // console.log('onHashChanged(current, previous) {', current, previous)

    // first view - render view based on existing markup
    if (params.FIRST_ROUTE) return this._firstChangeView(current)

    Channel.trigger(Constants.EVENT_SHOW_GLOBAL_LOADING)

    this._initiateNewPageRequest(current)
  },

  onPageModelRequest() {
    return this.activePageModel
  },

  getViewByPageType(type) {
    const Views = this.pages.filter(page => page.prototype.page === type)
    const View = Views.length ? Views[0] : false

    // @TODO - create default view
    if (!View) {
      throw new Error('No view... wut?')
    }

    // console.log('getViewByPageType(type) {', type, View)
    return View
  },

  _firstChangeView(current) {
    const document = window.document
    const page = this.query('[data-naaw-page]')
    const pagePartials = getPagePartials(page)
    const pageType = page.dataset.naawPage
    const pageUrl = UrlHelper.getFullPathFromRouteObject(current)
    const title = document.title
    const description = document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').getAttribute('content') : null
    const pageModel = new PageModel({
      document,
      page,
      pagePartials,
      pageType,
      pageUrl,
      title,
      description
    })

    this.activePageModel = pageModel

    this.changeView(pageModel)
  },

  _postFirstChangeView(pageModel) {
    this.activePageModel = pageModel

    document.title = pageModel.get('title')

    Analytics.page(this.activePageModel.get('pageUrl'))

    const appRouter = AppRouter.getInstance()
    if (appRouter.previous.route === appRouter.current.route) {
      Channel.trigger(Constants.EVENT_CHANGE_PARTIAL_VIEW)
      return
    }

    this.el.appendChild(pageModel.get('page'))

    this.changeView(pageModel)
  },

  changeView(pageModel) {
    this.previousView = this.currentView

    const NewView = this.getViewByPageType(pageModel.get('pageType'))
    const el = pageModel.get('page')
    const pageUrl = pageModel.get('pageUrl')
    const title = pageModel.get('title')

    this.currentView = new NewView({ el, pageUrl, title })
    this.addChild(this.currentView)

    this.transitionViews(this.previousView, this.currentView)
  },

  _initiateNewPageRequest(current) {
    if (this.activePageRequest) this.activePageRequest.abort()

    const pageUrl = UrlHelper.getFullUrlFromRouteObject(current)

    const pageModel = new PageModel({ pageUrl })

    const { promise, xhr } = pageModel.fetch()

    this.activePageRequest = xhr
    promise
      .then(this.onNewPageRequestDone)
      .catch(this.onNewPageRequestFail)
  },

  onNewPageRequestDone(pageModel) {
    Channel.trigger(Constants.EVENT_HIDE_GLOBAL_LOADING)

    // console.log(`Wrapper:onNewPageRequestDone -->`, pageModel)
    this._postFirstChangeView(pageModel)
    this.activePageRequest = null
  },

  onNewPageRequestFail(pageModel) {
    Channel.trigger(Constants.EVENT_HIDE_GLOBAL_LOADING)

    // console.log(`Wrapper::onNewPageRequestFail -->`, pageModel)

    // fallback to default link behaviour
    window.location.reload()
  },

  transitionViews(from, to) {
    // console.log('transitionViews: function(from, to) {', from, to);

    if (from === to) return

    if (!from && to) {
      to.show()
    } else if (from && to) {
      this._switchPages(from, to)
    }
  },

  _switchPages(from, to) {
    from.hide(() => {
      this.remove(from)

      Channel.trigger(Constants.EVENT_CHANGE_VIEW_START)
      to.show()

      window.requestAnimationFrame(() => {
        Channel.trigger(Constants.EVENT_CHANGE_VIEW_COMPLETE)
      })
    })
  }
})

export default assign(Wrapper, Singleton)
