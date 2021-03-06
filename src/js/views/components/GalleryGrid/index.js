import random from 'lodash.random'
import shuffle from 'lodash.shuffle'
import template from 'lodash.template'
import domify from 'domify'

import AppRouter from 'router/AppRouter'
import AppView from 'views/AppView'
import HomeView from 'views/pages/Home'
import GalleryView from 'views/pages/Gallery'
import GridContentModel from 'models/GridContentModel'
import Channel from 'common/Channel'
import Constants from 'common/Constants'
import ViewFinder from 'common/ViewFinder'
import MediaQueries from 'common/MediaQueries'

import { setTransform } from 'utils/DOM'

import AbstractView from 'views/abstract/AbstractView'
import gridItemTmplStr from './components/Item/index.tmpl'

const sizes = {
  LARGE_FULL_PAGE: 10,
  LARGE: 14,
  MEDIUM: 20,
  SMALL: 20
}

const ITEM_TRANSITION_TIME = 300

const GalleryGrid = AbstractView.extend({
  template: 'gallery-grid',

  events: {
    'click [data-grid-item]': 'onItemClick'
  },

  modules: [],

  currentItems: [],

  constructor() {
    this._bindClassMethods()

    GalleryGrid.__super__.constructor.call(this)

    this.gridInner = this.query('[data-grid-inner]')

    this.itemTmpl = template(gridItemTmplStr)

    this.cacheDimensions()
    this.bindEvents()
  },

  _bindClassMethods() {
    this.reset = this.reset.bind(this)
    this.onFirstHashChanged = this.onFirstHashChanged.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onChangeViewComplete = this.onChangeViewComplete.bind(this)
    this.onModalHide = this.onModalHide.bind(this)
  },

  cacheDimensions() {
    this.dimensions = {
      innerWidth: this.gridInner.clientWidth
    }
  },

  bindEvents() {
    this.listenToOnce(Channel, Constants.EVENT_HASH_CHANGED, this.onFirstHashChanged)
    this.listenTo(Channel, Constants.EVENT_CHANGE_VIEW_COMPLETE, this.onChangeViewComplete)
    this.listenTo(Channel, Constants.EVENT_GALLERY_MODAL_HIDE, this.onModalHide)
  },

  onFirstHashChanged() {
    this.listenTo(Channel, Constants.EVENT_RESIZE, this.onResize)
    this.reset()
  },

  onResize() {
    this.cacheDimensions()
    this.reset()
  },

  onChangeViewComplete() {
    this.animateItemsOut(this.reset)
  },

  reset() {
    this.currentItems.forEach(item => {
      clearTimeout(item.timer)
      this.gridInner.removeChild(item.el)
    })
    this.currentItems = []
    this.buildGrid()
  },

  buildGrid() {
    const appView = AppView.getInstance()
    const isFullPage = appView.wrapper.currentView instanceof HomeView || appView.wrapper.currentView instanceof GalleryView
    const gridContentKeys = appView.wrapper.activePageModel.get('gridContent')._keys

    const gridContentModel = GridContentModel.getInstance()
    const currentSize = this._getGridItemSize(isFullPage)
    const colCount = this._getColCount(isFullPage)
    const itemCount = Math.round((this.dimensions.innerWidth / currentSize) * Math.ceil(appView.dimensions.height / currentSize))


    for (let i = 0; i < itemCount; i++) {
      const item = gridContentModel.getNextItem(gridContentKeys)
      if (this._canRenderItem(i, isFullPage)) {
        this.addGridItem(item, currentSize, i, isFullPage)
      }
    }

    // this.startItemTimers()
  },

  addGridItem(contentItem, currentSize, index, isFullPage, config={}) {
    const colCount = this._getColCount(isFullPage)
    const colour = 'one'
    const row = Math.floor(index / colCount) % 2 !== 0 ? 'even' : 'odd'
    const hideDirection = config.hideDirection || shuffle([ 'top', 'bottom', 'left', 'right' ])[0]

    const classNames = [
      `colour--${colour}`,
      `hide--${hideDirection}`,
      `row--${row}`
    ]
    const slug = contentItem.slug
    const imgSrc = contentItem.thumbnail
    const width = currentSize
    const left = config.left || (index % colCount) * currentSize
    const top = config.top || Math.floor(index / colCount) * currentSize
    const delay = typeof config.delay === 'number' ? config.delay : random(150, 1000)

    const el = domify(this.itemTmpl({
      classNames,
      slug,
      imgSrc,
      width,
      left,
      top
    }))

    if (!isFullPage) setTransform(el, `scale(${random(0.9, 1)})`)

    const item = { el, left, top }

    if (!config.itemIsReplacement) this.currentItems[index] = item
    this.gridInner.appendChild(item.el)

    setTimeout(() => {
      item.el.classList.remove('hide', `hide--${hideDirection}`)
    }, delay)
  },

  replaceGridItem(item) {
    // @TODO - set this as a timer and clear on page change
    const hideDirection = shuffle([ 'top', 'bottom', 'left', 'right' ])[0]
    const oppositeDirection = this._getOppositeDirection(hideDirection)

    this.animateItemOut(item, null, hideDirection, () => {

      const appView = AppView.getInstance()
      const isFullPage = appView.wrapper.currentView instanceof HomeView || appView.wrapper.currentView instanceof GalleryView

      const gridContentModel = GridContentModel.getInstance()
      const currentSize = this._getGridItemSize(isFullPage)
      const gridContentKeys = appView.wrapper.activePageModel.get('gridContent')._keys

      const i = this.currentItems.indexOf(item)

      const newItem = gridContentModel.getNextItem(gridContentKeys)
      if (this._canRenderItem(i, isFullPage)) {
        const config = {
          top: item.top,
          left: item.left,
          hideDirection: oppositeDirection,
          delay: 50,
          itemIsReplacement: true
        }
        this.addGridItem(newItem, currentSize, i, isFullPage, config)
        this.startItemTimer(item)
      }

      // @TODO - make this work
      this.currentItems.splice(i, 1, newItem)

    })
  },

  _getGridItemSize(isFullPage=false) {
    let sizePercentage

    if (MediaQueries.isSmallerThanBreakpoint(MediaQueries.TABLETLANDSCAPE)) {
      sizePercentage = sizes.MEDIUM
    } else if (isFullPage) {
      sizePercentage = sizes.LARGE_FULL_PAGE
    } else {
      sizePercentage = sizes.LARGE
    }

    return (sizePercentage / 100) * this.dimensions.innerWidth
  },

  _getColCount(isFullPage=false) {
    if (MediaQueries.isSmallerThanBreakpoint(MediaQueries.TABLETLANDSCAPE)) {
      return 5
    } else if (isFullPage) {
      return 10
    } else {
      return 7
    }
  },

  _canRenderItem(index, isFullPage) {
    const colCount = this._getColCount(isFullPage)
    const state = MediaQueries.getDeviceState()
    let shouldRenderLayout = false
    let shouldRenderChance = false

    if (isFullPage) {
      shouldRenderLayout = true
    } else if (state === MediaQueries.DEFAULT) {
      shouldRenderLayout = (index % colCount < 1)
    } else if (state === MediaQueries.TABLETPORTRAIT) {
      shouldRenderLayout = (index % colCount < 2)
    } else {
      shouldRenderLayout = (index % colCount < 3 || index % colCount > 5) && (Math.floor(index / colCount) > 0 || index % colCount < 3)
    }

    if (index === 0 || Math.random() > 0.333 || state === MediaQueries.DEFAULT || isFullPage) {
      shouldRenderChance = true
    }

    return shouldRenderLayout && shouldRenderChance
  },

  _getOppositeDirection(direction) {
    let oppositeDirection
    switch (direction) {
      case 'top':
        oppositeDirection = 'bottom'
        break
      case 'bottom':
        oppositeDirection = 'top'
        break
      case 'left':
        oppositeDirection = 'right'
        break
      case 'right':
        oppositeDirection = 'left'
        break
    }
    return oppositeDirection
  },

  animateItemsOut(cb) {
    // this.stopItemTimers()

    let maxDelay = 0
    this.currentItems.forEach(item => {

      const delay = random(0, 500)
      this.animateItemOut(item, delay)

      maxDelay = delay > maxDelay ? delay : maxDelay
    })

    setTimeout(cb, maxDelay + ITEM_TRANSITION_TIME)
  },

  animateItemOut(item, delay, direction, cb) {
    delay = delay || random(0, 500)
    const hideDirection = direction || shuffle([ 'top', 'bottom', 'left', 'right' ])[0]

    setTimeout(() => {
      item.el.classList.add('hide', `hide--${hideDirection}`)
      if (cb && typeof cb === 'function') cb()
    }, delay)
  },

  startItemTimers() {
    this.currentItems.forEach(item => {
      this.startItemTimer(item)
    })
  },

  startItemTimer(item) {
    const replaceItemDelay = random(3000, 50000)
    item.timer = setTimeout(this.replaceGridItem.bind(this, item), replaceItemDelay)
  },

  stopItemTimers() {
    this.currentItems.forEach(item => clearTimeout(item.timer))
  },

  onItemClick(e) {
    const target = e.delegateTarget
    const slug = target.getAttribute('data-grid-item')
    const row = Array.prototype.slice.call(target.classList).filter(className => className.match(/^row--/)).map(className => className.replace(/^row--/, ''))[0]
    const gridContentModel = GridContentModel.getInstance()
    const item = gridContentModel.getItemBySlug(slug)
    const appRouter = AppRouter.getInstance()

    Channel.trigger(Constants.EVENT_GALLERY_MODAL_SHOW, item, row)
    appRouter.changeAnchor(item.slug)

    // this.stopItemTimers()
  },

  onModalHide() {
    // this.startItemTimers()
  }
})

export default GalleryGrid
