import AbstractViewPage from 'views/abstract/AbstractViewPage'

import Test from 'views/components/Test'

const RsvpPage = AbstractViewPage.extend({
  page: 'rsvp',

  modules: [
    Test
  ],

  constructor(config = {}) {
    RsvpPage.__super__.constructor.call(this, config)

    console.debug('==> RsvpPage init')
  }
})

export default RsvpPage
