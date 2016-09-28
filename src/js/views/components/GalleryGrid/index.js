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
  },

  cacheDimensions() {
    this.dimensions = {
      innerWidth: this.gridInner.clientWidth
    }
  },

  bindEvents() {
    this.listenToOnce(Channel, Constants.EVENT_HASH_CHANGED, this.onFirstHashChanged)
    this.listenTo(Channel, Constants.EVENT_CHANGE_VIEW_COMPLETE, this.onChangeViewComplete)
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
    this.currentItems.forEach(item => this.gridInner.removeChild(item))
    this.currentItems = []
    this.buildGrid()
  },

  buildGrid() {
    const appView = AppView.getInstance()
    const gridContentModel = GridContentModel.getInstance()
    const currentSize = this._getGridItemSize()
    const colCount = this._getColCount()
    const itemCount = Math.round((this.dimensions.innerWidth / currentSize) * Math.ceil(appView.dimensions.height / currentSize))

    const isFullPage = appView.wrapper.currentView instanceof HomeView || appView.wrapper.currentView instanceof GalleryView
    const gridContentKeys = appView.wrapper.activePageModel.get('gridContent')._keys

    for (let i = 0; i < itemCount; i++) {
      const item = gridContentModel.getNextItem(gridContentKeys)
      if (this._canRenderItem(i, isFullPage)) {
        this.addGridItem(item, currentSize, i, isFullPage)
      }
    }
  },

  addGridItem(contentItem, currentSize, index, isFullPage) {
    const colCount = this._getColCount()
    const colour = 'one'
    const row = Math.floor(index / colCount) % 2 !== 0 ? 'even' : 'odd'
    const hideDirection = shuffle([ 'top', 'bottom', 'left', 'right' ])[0]

    const classNames = [
      `colour--${colour}`,
      `hide--${hideDirection}`,
      `row--${row}`
    ]
    const slug = contentItem.slug
    const imgSrc = contentItem.source
    const width = currentSize
    const left = (index % colCount) * currentSize
    const top = Math.floor(index / colCount) * currentSize

    const item = domify(this.itemTmpl({
      classNames,
      slug,
      imgSrc,
      width,
      left,
      top
    }))

    if (!isFullPage) setTransform(item, `scale(${random(0.9, 1)})`)

    this.currentItems.push(item)
    this.gridInner.appendChild(item)

    setTimeout(() => {
      item.classList.remove('hide', `hide--${hideDirection}`)
    }, random(150, 1000))
  },

  _getGridItemSize() {
    let sizePercentage

    if (MediaQueries.isSmallerThanBreakpoint(MediaQueries.TABLETLANDSCAPE)) {
      sizePercentage = sizes.MEDIUM
    } else {
      sizePercentage = sizes.LARGE
    }

    return (sizePercentage / 100) * this.dimensions.innerWidth
  },

  _getColCount() {
    if (MediaQueries.isSmallerThanBreakpoint(MediaQueries.TABLETLANDSCAPE)) {
      return 5
    } else {
      return 7
    }
  },

  _canRenderItem(index, isFullPage) {
    const colCount = this._getColCount()
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

  animateItemsOut(cb) {
    let maxDelay = 0

    this.currentItems.forEach(item => {
      const delay = random(0, 500)
      const hideDirection = shuffle([ 'top', 'bottom', 'left', 'right' ])[0]

      setTimeout(() => {
        item.classList.add('hide', `hide--${hideDirection}`)
      }, delay)

      maxDelay = delay > maxDelay ? delay : maxDelay
    })

    setTimeout(cb, maxDelay + ITEM_TRANSITION_TIME)
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
  }
})

export default GalleryGrid
