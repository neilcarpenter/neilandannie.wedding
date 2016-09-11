import assign from 'lodash.assign'
import shuffle from 'lodash.shuffle'
import Model from 'ampersand-model'

import Singleton from 'common/Singleton'

const GridContentModel = Model.extend({

  props: {
    neil_and_annie: 'array',
    neil_and_annie_extension: 'array',
    wedding: 'array',
    location: 'array'
  },

  updateContent(gridContent) {
    console.log(`updateContent`, gridContent)
    gridContent.data.forEach(contentItem => {
      if (this.get(contentItem.label)) return
      this.set(contentItem.label, contentItem.data)
    })
  },

  getPageContent(keys) {
    let content = []
    keys.forEach(key => content = content.concat(this.get(key)))
    return shuffle(content)
  }

})

export default assign(GridContentModel, Singleton)
