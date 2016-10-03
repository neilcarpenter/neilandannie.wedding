import assign from 'lodash.assign'
import assignIn from 'lodash.assignin'
import merge from 'lodash.merge'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'

import AppView from 'views/AppView'
import AppRouter from 'router/AppRouter'
import AppModel from 'models/AppModel'
import Channel from 'common/Channel'
import Constants from 'common/Constants'
import Singleton from 'common/Singleton'
import ViewFinder from 'common/ViewFinder'
import Device from 'common/Device'

import AbstractView from 'views/abstract/AbstractView'

const Header = AbstractView.extend({
  template: 'header',

  mobileMenuOpen: false,

  modules: [],

  events: {
    'click [data-burger-btn]': 'onBurgerClick'
  },

  constructor() {
    this._bindClassMethods()
    Header.__super__.constructor.call(this)
  },

  _bindClassMethods() {
    this.onScroll = this.onScroll.bind(this)
    this.onResize = debounce(this.onResize.bind(this), Constants.RESIZE_DEBOUNCE)
    this.onHashChanged = this.onHashChanged.bind(this)
    this.onFirstHashChanged = this.onFirstHashChanged.bind(this)
    this.onChangeViewStart = this.onChangeViewStart.bind(this)
    this.onChangeViewEnd = this.onChangeViewEnd.bind(this)
    this.onGlobalLoadingShow = this.onGlobalLoadingShow.bind(this)
    this.onGlobalLoadingHide = this.onGlobalLoadingHide.bind(this)
  },

  init() {
    this.listenTo(Channel, Constants.EVENT_SCROLL, this.onScroll)
    this.listenTo(Channel, Constants.EVENT_RESIZE, this.onResize)
    this.listenTo(Channel, Constants.EVENT_HASH_CHANGED, this.onHashChanged)
    this.listenToOnce(Channel, Constants.EVENT_HASH_CHANGED, this.onFirstHashChanged)
    this.listenTo(Channel, Constants.EVENT_CHANGE_VIEW_START, this.onChangeViewStart)
    this.listenTo(Channel, Constants.EVENT_CHANGE_VIEW_COMPLETE, this.onChangeViewEnd)
    this.listenTo(Channel, Constants.EVENT_SHOW_GLOBAL_LOADING, this.onGlobalLoadingShow)
    this.listenTo(Channel, Constants.EVENT_HIDE_GLOBAL_LOADING, this.onGlobalLoadingHide)

    this.navLinks = this.queryAll('[data-nav-link]')
    this.loader = this.query('[data-loader]')

    this.getDimensions()
  },

  getDimensions() {
    this.dims = merge({}, this.el.getBoundingClientRect())
    this.dims.top += document.body.scrollTop
    this.dims.bottom += document.body.scrollTop
  },

  onScroll(scrollY) {},

  onResize() {
    this.getDimensions()
  },

  onFirstHashChanged() {
    this.setActiveLink()
  },

  onHashChanged(current, previous, params) {
    if (this.mobileMenuOpen) this.closeMobileMenu()
  },

  onChangeViewStart() {
    window.scrollTo(0, 0)
  },

  onChangeViewEnd() {
    this.setActiveLink()
  },

  onGlobalLoadingShow() {
    this.loader.classList.add('show')
  },

  onGlobalLoadingHide() {
    this.loader.classList.remove('show')
  },

  onBurgerClick() {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu()
    } else {
      this.openMobileMenu()
    }
  },

  openMobileMenu() {
    this.el.classList.add('mobile-menu-open')
    this.mobileMenuOpen = true
  },

  closeMobileMenu() {
    this.el.classList.remove('mobile-menu-open')
    this.mobileMenuOpen = false
  },

  setActiveLink() {
    const appRouter = AppRouter.getInstance()
    this.navLinks.forEach(link => {
      const classChange = link.href.match(appRouter.current.route) ? 'add' : 'remove'
      link.classList[classChange]('is-active')
    })
  }
})

export default assign(Header, Singleton)
