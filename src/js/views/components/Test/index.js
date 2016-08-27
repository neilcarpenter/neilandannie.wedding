import AbstractView from 'views/abstract/AbstractView'

const Test = AbstractView.extend({
  template: 'test',

  modules: [],

  events: {},

  constructor() {
    Test.__super__.constructor.call(this)
  }
})

export default Test
