import AbstractViewPage from 'views/abstract/AbstractViewPage'

const GalleryPage = AbstractViewPage.extend({
  page: 'gallery',

  modules: [],

  events: {
    'click [data-message-toggle]' : 'onMessageToggleClick'
  },

  constructor(config = {}) {
    GalleryPage.__super__.constructor.call(this, config)

    this.messageToggleBtn = this.query('[data-message-toggle]')
  },

  onMessageToggleClick() {
    const buttonText = this.el.classList.contains('gallery-message-hidden') ? 'Hide message' : 'Show message'
    this.messageToggleBtn.textContent = buttonText
    this.el.classList.toggle('gallery-message-hidden')
  }
})

export default GalleryPage
