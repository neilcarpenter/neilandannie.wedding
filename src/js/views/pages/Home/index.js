import AbstractViewPage from 'views/abstract/AbstractViewPage'

const HomePage = AbstractViewPage.extend({
  page: 'home',

  modules: [],

  constructor(config = {}) {
    HomePage.__super__.constructor.call(this, config)

    console.debug('==> HomePage init')
  }
})

export default HomePage
