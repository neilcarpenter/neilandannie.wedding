import assign from 'lodash.assign'
import debounce from 'lodash.debounce'

import AbstractView from 'views/abstract/AbstractView'
import AppRouter from 'router/AppRouter'
import Device from 'common/Device'
import MediaQueries from 'common/MediaQueries'
import GridGuides from 'common/GridGuides'
import Channel from 'common/Channel'
import Constants from 'common/Constants'
import Singleton from 'common/Singleton'
import UrlHelper from 'common/UrlHelper'

import ScrollItemInView from 'common/ScrollItemInView'
import TimestampManager from 'common/TimestampManager'

import Header from 'views/core/Header'
import Wrapper from 'views/core/Wrapper'

import { closest } from 'utils/DOM'

const UTILITY_KEYS = [ 91, 17, 16 ]

const AppView = AbstractView.extend({
  template: 'naaw-app',

  body: null,

  header: null,
  footer: null,
  wrapper: null,

  dimensions: {
    width: 0,
    height: 0
  },

  events: {
    'click a': 'onLinkClick'
  },

  keysDown: {},

  constructor() {
    console.log('~~ AppView::constructor called')

    this._bindClassMethods()

    AppView.__super__.constructor.call(this)
  },

  init() {
    Device.setup()
    MediaQueries.setup()
    GridGuides.setup()

    this.body = document.querySelector('body')

    this.header = Header.getInstance()
    this.wrapper = Wrapper.getInstance()

    this
      .addChild(this.header)
      .addChild(this.wrapper)

    this.scrollItemInView = ScrollItemInView.getInstance({ appView: this })
    this.timestampManager = TimestampManager.getInstance({ appView: this })

    this.begin()
  },

  _bindClassMethods() {
    this.onScroll = this.onScroll.bind(this)
    this.onResize = this.onResize.bind(this)
    this.scrollUpdate = this.scrollUpdate.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onPageOrAnchorChange = this.onPageOrAnchorChange.bind(this)
    this.onViewChangeComplete = this.onViewChangeComplete.bind(this)
  },

  bindEvents() {
    // Call this here to make sure that we have app view dimensions
    // before we kick everything off
    this.onResize()

    this.onResize = debounce(this.onResize.bind(this), Constants.RESIZE_DEBOUNCE)

    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('blur', this.onBlur)

    this.listenTo(Channel, Constants.EVENT_ANCHOR_CHANGED, this.onPageOrAnchorChange)
    this.listenTo(Channel, Constants.EVENT_CHANGE_VIEW_COMPLETE, this.onPageOrAnchorChange)
    this.listenTo(Channel, Constants.EVENT_CHANGE_VIEW_COMPLETE, this.onViewChangeComplete)
  },

  begin() {
    Channel.trigger(Constants.EVENT_APP_START)

    this.bindEvents()

    this.onScroll()

    this.scrollItemInView.initialPageLoad()
    this.timestampManager.update()
  },

  onKeyDown(e) {
    this.keysDown[e.keyCode] = true
  },

  onKeyUp(e) {
    delete this.keysDown[e.keyCode]
  },

  onBlur() {
    this.keysDown = {}
  },

  onPageOrAnchorChange() {},

  onViewChangeComplete() {},

  onScroll(e) {
    this.lastScrollY = window.pageYOffset
    this.requestTick()
  },

  requestTick() {
    if (!this.ticking) {
      window.requestAnimationFrame(this.scrollUpdate)
      this.ticking = true
    }
  },

  scrollUpdate() {
    this.ticking = false

    clearTimeout(this.timerScroll)

    this.timerScroll = setTimeout(() => {
      Channel.trigger(Constants.EVENT_SCROLL_END, this.lastScrollY)
    }, Constants.SCROLL_END_THROTTLE)

    Channel.trigger(Constants.EVENT_SCROLL, this.lastScrollY)
  },

  onResize(e) {
    this.setViewportDimensions()

    Channel.trigger(Constants.EVENT_RESIZE, this.dimensions)
  },

  onNavMaskClick(e) {
    Channel.trigger(Constants.NAV_MASK_CLICK, {})
  },

  onLinkClick(e) {
    const href = e.delegateTarget.href

    if (!href) return false

    this.navigateToUrl(href, e)
  },

  navigateToUrl(href, e = null) {
    console.log('ROUTE THAT', href)

    if (Modernizr.naaw_page_transitions
      && this.noUtilityKeysPressed()
      && UrlHelper.isSafeUrl(href)) {
      e.preventDefault()

      const appRouter = AppRouter.getInstance()
      appRouter.navigateTo(href)
    } else {
      if (e) e.preventDefault()
      window.open(href)
    }
  },

  noUtilityKeysPressed() {
    return !UTILITY_KEYS.filter(key => this.keysDown[key]).length
  },

  setViewportDimensions() {
    const width = this.getWindowWidth()
    const height = this.getWindowHeight()

    this.dimensions = { width, height}
  },

  getWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  },

  getWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
})

export default assign(AppView, Singleton)
