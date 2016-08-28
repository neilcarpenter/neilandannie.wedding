import AbstractViewPage from 'views/abstract/AbstractViewPage'

const GalleryPage = AbstractViewPage.extend({
  page: 'gallery',

  modules: [],

  constructor(config = {}) {
    GalleryPage.__super__.constructor.call(this, config)

    console.debug('==> GalleryPage init')
  }
})

export default GalleryPage
