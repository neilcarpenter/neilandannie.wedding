import AbstractViewPage from 'views/abstract/AbstractViewPage'

import FormEmbed from 'views/components/FormEmbed'

const RsvpPage = AbstractViewPage.extend({
  page: 'rsvp',

  modules: [
    FormEmbed
  ],

  constructor(config = {}) {
    RsvpPage.__super__.constructor.call(this, config)

    console.log('==> RsvpPage init')
  }
})

export default RsvpPage
