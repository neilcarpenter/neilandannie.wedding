import AbstractViewPage from 'views/abstract/AbstractViewPage'

const RsvpPage = AbstractViewPage.extend({
  page: 'rsvp',

  modules: [],

  constructor(config = {}) {
    RsvpPage.__super__.constructor.call(this, config)

    console.debug('==> RsvpPage init')
  }
})

export default RsvpPage
