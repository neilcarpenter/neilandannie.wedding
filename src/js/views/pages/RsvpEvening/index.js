import AbstractViewPage from 'views/abstract/AbstractViewPage'

import Test from 'views/components/Test'

const RsvpEveningPage = AbstractViewPage.extend({
  page: 'rsvp-evening',

  modules: [
    Test
  ],

  constructor(config = {}) {
    RsvpEveningPage.__super__.constructor.call(this, config)

    console.debug('==> RsvpEveningPage init')
  }
})

export default RsvpEveningPage
