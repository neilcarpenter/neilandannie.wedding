import random from 'lodash.random'
import shuffle from 'lodash.shuffle'
import template from 'lodash.template'
import domify from 'domify'

import AppRouter from 'router/AppRouter'
import AppView from 'views/AppView'
import GridContentModel from 'models/GridContentModel'
import Channel from 'common/Channel'
import Constants from 'common/Constants'
import ViewFinder from 'common/ViewFinder'

import AbstractView from 'views/abstract/AbstractView'
import gridItemTmplStr from './components/Item/index.tmpl'

const GalleryGrid = AbstractView.extend({
  template: 'gallery-grid',

  events: {
    'click [data-grid-item]': 'onItemClick'
  },

  modules: [],

  constructor() {
    this._bindClassMethods()

    GalleryGrid.__super__.constructor.call(this)

    this.gridInner = this.query('[data-grid-inner]')

    this.itemTmpl = template(gridItemTmplStr)

    this.bindEvents()
  },

  _bindClassMethods() {
    this.reset = this.reset.bind(this)
  },

  bindEvents() {
    this.listenToOnce(Channel, Constants.EVENT_HASH_CHANGED, this.reset)
    this.listenTo(Channel, Constants.EVENT_CHANGE_VIEW_COMPLETE, this.reset)
  },

  reset() {
    while (this.gridInner.firstChild) this.gridInner.removeChild(this.gridInner.firstChild)
    this.buildGrid()
  },

  buildGrid() {
    const appRouter = AppRouter.getInstance()
    const appView = AppView.getInstance()
    const gridContentModel = GridContentModel.getInstance()

    const isHome = !appRouter.current.route
    const gridContentKeys = appView.wrapper.activePageModel.get('gridContent')._keys

    for (let i = 0; i < 100; i++) {
      const item = gridContentModel.getNextItem(gridContentKeys)
      this.addGridItem(item, i, isHome)
    }
  },

  addGridItem(contentItem, index, isHome) {
    const colour = 'one'
    const row = Math.floor(index / 7) % 2 !== 0 ? 'even' : 'odd'
    const hideDirection = shuffle([ 'top', 'bottom', 'left', 'right' ])[0]

    const classNames = [
      `colour--${colour}`,
      `hide--${hideDirection}`,
      `row--${row}`
    ]
    const slug = contentItem.slug
    const imgSrc = contentItem.source
    const style = (!isHome) ? `transform: scale(${random(0.9, 1)});` : null

    const item = domify(this.itemTmpl({
      classNames,
      slug,
      imgSrc,
      style
    }))

    this.gridInner.appendChild(item)

    // if (Math.random() > 0.75) {
    // if (((index % 7) / 7) < 0.3) {
    if ((index % 7 < 3 || index % 7 > 5) && (Math.floor(index / 7) > 0 || index % 7 < 3) || isHome) {

      if (index === 0 || Math.random() > 0.333 || isHome) {
        setTimeout(() => {
          item.classList.remove('hide', `hide--${hideDirection}`)
        // }, index * 150 - (Math.floor(index / 7) * 900))
        }, random(150, 1000))
      }
    }
    // }
  },

  onItemClick(e) {
    const target = e.delegateTarget
    const slug = target.getAttribute('data-grid-item')
    const gridContentModel = GridContentModel.getInstance()
    const item = gridContentModel.getItemBySlug(slug)

    Channel.trigger(Constants.EVENT_GALLERY_MODAL_SHOW, item)

    console.log('show item', item)
  }
})

export default GalleryGrid
