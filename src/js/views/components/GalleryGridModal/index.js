import template from 'lodash.template'

import Channel from 'common/Channel'
import Constants from 'common/Constants'

import AbstractView from 'views/abstract/AbstractView'

import { modalItem as modalItemTmplStr } from './index.tmpl'

const GalleryGridModal = AbstractView.extend({
  template: 'gallery-grid-modal',

  events: {
    'click [data-close-btn]': 'onCloseClick'
  },

  constructor() {
    this._bindClassMethods()

    GalleryGridModal.__super__.constructor.call(this)

    this.itemTmpl = template(modalItemTmplStr)
    this.bindEvents()
  },

  _bindClassMethods() {
    this.onShowItem = this.onShowItem.bind(this)
  },

  bindEvents() {
    this.listenTo(Channel, Constants.EVENT_GALLERY_MODAL_SHOW, this.onShowItem)
  },

  show(item) {
    console.log('show', item);
    this.el.classList.add('is-shown')
  },

  hide() {
    this.el.classList.remove('is-shown')
  },

  onShowItem(item) {
    this.show(item)
  },

  // onReplaceItem(item) {},

  onCloseClick() {
    this.hide()
  }
})

export default GalleryGridModal
