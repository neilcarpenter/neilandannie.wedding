import AbstractViewPage from 'views/abstract/AbstractViewPage'

import Test from 'views/components/Test'

const AboutPage = AbstractViewPage.extend({
  page: 'about',

  modules: [
    Test
  ],

  constructor(config = {}) {
    AboutPage.__super__.constructor.call(this, config)

    console.debug('==> AboutPage init')
  }
})

export default AboutPage
