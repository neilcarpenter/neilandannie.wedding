import assign from 'lodash.assign'
import shuffle from 'lodash.shuffle'
import findWhere from 'lodash.findwhere'
import Model from 'ampersand-model'

import Singleton from 'common/Singleton'

const TYPES = [
  'neil_and_annie',
  'neil_and_annie_extension',
  'wedding',
  'location'
]

const props = {}
TYPES.forEach(type => props[type] = 'array')

const GridContentModel = Model.extend({

  props,

  updateContent(gridContent) {
    gridContent.data.forEach(contentItem => {
      if (this.get(contentItem.label)) return
      contentItem.data.forEach(item => {
        assign(item, {
          // loaded: false,
          viewed: false
        })
      })
      this.set(contentItem.label, shuffle(contentItem.data))
    })
  },

  getKeysContent(keys) {
    let content = []
    keys.forEach(key => content = content.concat(this.get(key)))
    return content
  },

  resetKeysContent(keys) {
    keys.forEach(key => {
      this.set(key, shuffle(this.get(key)))
      this.get(key).forEach(item => {
        assign(item, {
          viewed: false
        })
      })
    })
  },

  getAllItems() {
    let allItems = []
    TYPES.forEach(type => allItems = allItems.concat(this.get(type) || []))
    return allItems
  },

  getItemBySlug(slug) {
    const allItems = this.getAllItems()
    const item = findWhere(allItems, { slug })
    return item
  },

  getNextItem(keys) {
    const items = shuffle(this.getKeysContent(keys))
    const item = findWhere(items, { viewed: false })

    if (!item) {
      this.resetKeysContent(keys)
      return this.getNextItem(keys)
    } else {
      item.viewed = true
      return item
    }
  }

})

export default assign(GridContentModel, Singleton)
