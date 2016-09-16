import AbstractView from 'views/abstract/AbstractView'

const GalleryGridModal = AbstractView.extend({
  template: 'gallery-grid-modal',

  events: {},

  constructor() {
    this._bindClassMethods()
    GalleryGridModal.__super__.constructor.call(this)
  },

  _bindClassMethods() {}
})

export default GalleryGridModal
