import template from 'lodash.template'
import domify from 'domify'

import AppView from 'views/AppView'
import AppRouter from 'router/AppRouter'
import Channel from 'common/Channel'
import Constants from 'common/Constants'
import MediaQueries from 'common/MediaQueries'
import GridContentModel from 'models/GridContentModel'

import AbstractView from 'views/abstract/AbstractView'

import { modalItem as modalItemTmplStr } from './index.tmpl'

const GalleryGridModal = AbstractView.extend({
  template: 'gallery-grid-modal',

  events: {
    'click [data-close-btn]': 'onCloseClick',
    'click [data-random-btn]': 'onRandomClick',
    'click [data-toggle-text-btn]': 'onTextToggleClick'
  },

  constructor() {
    this._bindClassMethods()

    GalleryGridModal.__super__.constructor.call(this)

    this.itemContainer = this.query('[data-modal-content]')
    this.itemTmpl = template(modalItemTmplStr)

    this.bindEvents()
  },

  _bindClassMethods() {
    this.onShowItem = this.onShowItem.bind(this)
    this.onAnchorOrHashChange = this.onAnchorOrHashChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  },

  bindEvents() {
    this.listenTo(Channel, Constants.EVENT_GALLERY_MODAL_SHOW, this.onShowItem)
    this.listenTo(Channel, Constants.EVENT_ANCHOR_CHANGED, this.onAnchorOrHashChange)
    this.listenTo(Channel, Constants.EVENT_HASH_CHANGED, this.onAnchorOrHashChange)

    window.addEventListener('keyup', this.onKeyUp)
  },

  show(item, fromRow) {
    const alignment = fromRow === 'even' ? 'right' : 'left'
    this.el.setAttribute('data-align', alignment)
    this.el.classList.add('is-shown')

    this.showItem(item, false)

    this.shown = true
  },

  hide() {
    this.el.classList.remove('is-shown')
    this.itemContainer.classList.remove('is-shown')

    setTimeout(() => {
      this.activeItem.remove()
      this.activeItem = null
    }, 400)

    this.shown = false

    Channel.trigger(Constants.EVENT_GALLERY_MODAL_HIDE)
  },

  showItem(item, fromSwitch=true) {
    const isMobile = MediaQueries.isSmallerThanBreakpoint(MediaQueries.TABLETPORTRAIT)
    const imageContain = isMobile || item.forceImageContain

    this.activeItem = domify(this.itemTmpl({ item, imageContain }))
    this.itemContainer.appendChild(this.activeItem)

    const delay = fromSwitch ? 100 : 250
    setTimeout(() => {
      this.itemContainer.classList.add('is-shown')
    }, delay)

    item.viewedInModal = true
  },

  switchItems(item) {
    console.log(`switchItems`)
    this.itemContainer.classList.remove('is-shown')

    setTimeout(() => {
      const alignment = this.el.getAttribute('data-align') === 'left' ? 'right' : 'left'
      this.el.setAttribute('data-align', alignment)

      this.activeItem.remove()
      this.showItem(item)
    }, 400)
  },

  triggerHide() {
    const appRouter = AppRouter.getInstance()
    appRouter.changeAnchor(null)
  },

  onShowItem(item, fromRow) {
    this.show(item, fromRow)
  },

  onCloseClick() {
    this.triggerHide()
  },

  onRandomClick() {
    const appView = AppView.getInstance()
    const appRouter = AppRouter.getInstance()
    const gridContentModel = GridContentModel.getInstance()

    const gridContentKeys = appView.wrapper.activePageModel.get('gridContent')._keys
    const nextItem = gridContentModel.getNextItem(gridContentKeys, 'viewedInModal')

    this.switchItems(nextItem)
    appRouter.changeAnchor(nextItem.slug)
  },

  onTextToggleClick() {
    this.itemContainer.classList.toggle('hide-text')
  },

  onKeyUp(e) {
    if (e.keyCode === 27) this.triggerHide()
  },

  onAnchorOrHashChange(current, previous, FIRST_ROUTE) {
    if (FIRST_ROUTE) return

    const appRouter = AppRouter.getInstance()
    const hash = appRouter.getAnchor()
    const gridContentModel = GridContentModel.getInstance()
    const item = gridContentModel.getItemBySlug(hash)

    if (item) {
      if (this.activeItem) {
        this.switchItems(item)
      } else {
        this.show(item)
      }
    } else if (this.shown) {
      this.hide()
    }
  }
})

export default GalleryGridModal
