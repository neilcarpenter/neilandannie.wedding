import time from 'time-ago'
import assign from 'lodash.assign'

import Singleton from 'common/Singleton'

class TimestampManager {
  constructor (config = {}) {
    this._bindClassMethods()

    this.appView = config.appView || window.appView
    this.time = time()

    this.items = this.appView.queryAll('[data-timestamp]')

    this.interval = setInterval(this.update, 1000 * 60)
  }

  _bindClassMethods () {
    this.update = this.update.bind(this)
  }

  update () {
    this.items.forEach((item) => {
      const timestamp = parseInt(item.getAttribute('data-timestamp'), 10)

      item.textContent = this.time.ago(timestamp)
    })
  }
}

export default assign(TimestampManager, Singleton)
