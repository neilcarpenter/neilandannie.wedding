import AbstractViewPage from 'views/abstract/AbstractViewPage'

import Test from 'views/components/Test'

const HomePage = AbstractViewPage.extend({
  page: 'home',

  modules: [
    Test
  ],

  constructor(config = {}) {
    HomePage.__super__.constructor.call(this, config)

    console.debug('==> HomePage init')
  }
})

export default HomePage
