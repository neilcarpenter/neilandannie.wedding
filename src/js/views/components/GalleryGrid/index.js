import random from 'lodash.random'
import shuffle from 'lodash.shuffle'

import AbstractView from 'views/abstract/AbstractView'

const PHOTOS = shuffle([
  'annie-baby-charlie.jpg',
  'annie-ruby-violet.jpg',
  'camping-dinner.jpg',
  'drinking-grafton.jpg',
  'neil-annie-halong-bay.jpg',
  'neil-annie-malvern.jpg',
  'neil-school-photo.jpg',
])

const COLOURS = [
  'one',
  'two',
  'three',
  'four',
  'five'
]

const GalleryGrid = AbstractView.extend({
  template: 'gallery-grid',

  constructor() {
    GalleryGrid.__super__.constructor.call(this)
    this.buildGrid()
  },

  buildGrid() {
    this.gridInner = this.query('[data-grid-inner]')
    for (let i = 0; i < 100; i++) {
      this.addGridItem(i)
    }
  },

  addGridItem(index) {
    const photo = PHOTOS[ random(0, (PHOTOS.length - 1)) ]
    // const photo = PHOTOS[ index % PHOTOS.length ]
    // const colour = COLOURS[ random(0, (COLOURS.length - 1)) ]
    // const colour = COLOURS[ index % 5 ]
    const colour = 'one'
    const row = Math.floor(index / 7) % 2 !== 0 ? 'even' : 'odd'

    const item = document.createElement('div')
    item.classList.add('gallery-grid--item')
    item.classList.add(`colour--${colour}`)
    item.classList.add(`row--${row}`)

    const itemInner = document.createElement('div')
    itemInner.classList.add('gallery-grid--item-inner')

    // item.style.borderTopWidth = random(1, 20) + 'px'
    // item.style.borderBottomWidth = random(1, 20) + 'px'
    // item.style.borderLeftWidth = random(1, 20) + 'px'
    // item.style.borderRightWidth = random(1, 20) + 'px'

    const image = document.createElement('img')
    // image.src = `http://loremflickr.com/500/500/paris?random=${Math.random()}`
    image.src = `/assets/img/_placeholders/${photo}`

    item.appendChild(itemInner)
    itemInner.appendChild(image)
    this.gridInner.appendChild(item)
  }
})

export default GalleryGrid
