import assign from 'lodash.assign'
import Model from 'ampersand-model'

import Singleton from 'common/Singleton'

const AppModel = Model.extend({

  props: {
    baseUrl: 'string',
    basePath: 'string',
    homePath: 'string',
    routeBlacklist: 'array',
    gaCode: 'string'
  },

  constructor() {
    AppModel.__super__.constructor.apply(this, arguments)

    if (!this.get('baseUrl')) {
      const basePath = this.get('basePath') ? `/${this.get('basePath')}` : ''
      this.set(
        'baseUrl',
        `${window.location.protocol}//${window.location.host}${basePath}`
      )
    }
  }

})

export default assign(AppModel, Singleton)
