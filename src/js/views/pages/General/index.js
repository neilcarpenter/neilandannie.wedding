import AbstractViewPage from 'views/abstract/AbstractViewPage'

const GeneralPage = AbstractViewPage.extend({
  page: 'general',

  modules: [],

  constructor(config = {}) {
    GeneralPage.__super__.constructor.call(this, config)

    console.log('==> GeneralPage init')
  }
})

export default GeneralPage
