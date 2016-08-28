import AbstractView from 'views/abstract/AbstractView'
import ViewAutoBinder from '../../common/ViewAutoBinder'

const AbstractViewPage = AbstractView.extend({

  autobindOnInstantiation: false,

  _pageUrl: null,
  _title: null,

  constructor(config = { pageUrl: '', title: '' }) {
    this._pageUrl = config.pageUrl
    this._title = config.title

    // console.log(config)

    AbstractViewPage.__super__.constructor.call(this, config)
  },

  show(cb) {
    ViewAutoBinder.bindView(this)

    if (cb && typeof cb === 'function') cb()
  },

  hide(cb) {
    this.el.classList.add('is-animating-out')

    setTimeout(() => {
      if (cb && typeof cb === 'function') cb()
    }, 500)
  }

})

export default AbstractViewPage
