import random from 'lodash.random'
import shuffle from 'lodash.shuffle'

import AppRouter from 'router/AppRouter'
import AppView from 'views/AppView'
import GridContentModel from 'models/GridContentModel'
import Channel from 'common/Channel'
import Constants from 'common/Constants'

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
    this._bindClassMethods()

    GalleryGrid.__super__.constructor.call(this)

    this.gridInner = this.query('[data-grid-inner]')

    this.bindEvents()
  },

  _bindClassMethods() {
    this.reset = this.reset.bind(this)
  },

  bindEvents() {
    this.listenToOnce(Channel, Constants.EVENT_HASH_CHANGED, this.reset)
    this.listenTo(Channel, Constants.EVENT_CHANGE_VIEW_COMPLETE, this.reset)
  },

  reset() {
    while (this.gridInner.firstChild) this.gridInner.removeChild(this.gridInner.firstChild)
    this.buildGrid()
  },

  buildGrid() {
    const appRouter = AppRouter.getInstance()
    const appView = AppView.getInstance()
    const gridContentModel = GridContentModel.getInstance()

    const isHome = !appRouter.current.route
    const gridContentKeys = appView.wrapper.activePageModel.get('gridContent')._keys
    const gridContent = gridContentModel.getPageContent(gridContentKeys)

    console.log('\n')
    console.log('gridContent')
    console.log(gridContent)
    console.log('\n')

    for (let i = 0; i < 100; i++) {
      this.addGridItem(i, isHome)
    }
  },

  addGridItem(index, isHome) {
    const photo = PHOTOS[ random(0, (PHOTOS.length - 1)) ]
    // const photo = PHOTOS[ index % PHOTOS.length ]
    // const colour = COLOURS[ random(0, (COLOURS.length - 1)) ]
    // const colour = COLOURS[ index % 5 ]
    const colour = 'one'
    const row = Math.floor(index / 7) % 2 !== 0 ? 'even' : 'odd'

    const item = document.createElement('div')
    item.classList.add(
      'gallery-grid--item',
      `colour--${colour}`,
      'hide',
      `row--${row}`
    )

    const itemInner = document.createElement('div')
    itemInner.classList.add('gallery-grid--item-inner')

    // item.style.borderTopWidth = random(1, 20) + 'px'
    // item.style.borderBottomWidth = random(1, 20) + 'px'
    // item.style.borderLeftWidth = random(1, 20) + 'px'
    // item.style.borderRightWidth = random(1, 20) + 'px'

    const image = document.createElement('img')
    // image.src = `http://loremflickr.com/500/500/paris?random=${Math.random()}`
    image.src = `/assets/img/_placeholders/${photo}`

    // const opacity = 1 - (Math.floor(index / 7) / 7)
    // const opacity = random(0.142857143, 1)
    // const scale = 1 - ((index / 7) / 16)
    const scale = random(0.9, 1)
    // item.style.opacity = opacity
    if (!isHome) item.style.transform = `scale(${scale})`

    item.appendChild(itemInner)
    itemInner.appendChild(image)
    this.gridInner.appendChild(item)

    // if (Math.random() > 0.75) {
    // if (((index % 7) / 7) < 0.3) {
    if ((index % 7 < 3 || index % 7 > 5) && (Math.floor(index / 7) > 0 || index % 7 < 3) || isHome) {

      if (index === 0 || Math.random() > 0.333 || isHome) {
        setTimeout(() => {
          item.classList.remove('hide')
        }, index * 150 - (Math.floor(index / 7) * 900))
        // }, random(300, 1500))
      }
    }
    // }
  }
})

export default GalleryGrid
