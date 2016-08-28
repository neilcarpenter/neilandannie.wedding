import AbstractView from 'views/abstract/AbstractView'

const FormEmbed = AbstractView.extend({
  template: 'form-embed',

  constructor() {
    FormEmbed.__super__.constructor.call(this)
  }
})

export default FormEmbed
