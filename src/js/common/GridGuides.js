import Channel from 'common/Channel'
import Constants from 'common/Constants'
import MediaQueries from 'common/MediaQueries'

const GridGuides = {
  el: null,
  cmdPressed: false,
  colTmpl: `<div class="guide-col"></div>`,

  setup() {
    console.log(`setup GridGuides`)

    GridGuides.addGridMarkup()
    GridGuides.bindEvents()
  },

  addGridMarkup() {
    const gridColCount = GridGuides.getColCount()
    let gridCols = ''

    for (let i = 0; i < gridColCount; i++) {
      gridCols += GridGuides.colTmpl
    }

    const guideTmpl = document.createElement('div')
    guideTmpl.className = 'cf container grid-guides'
    guideTmpl.setAttribute('data-grid-guides', true)
    guideTmpl.insertAdjacentHTML('beforeend', gridCols)

    const body = document.querySelector('body')
    body.appendChild(guideTmpl)
    GridGuides.el = document.querySelector(`[data-grid-guides]`)
  },

  bindEvents() {
    window.addEventListener('keydown', GridGuides.onWindowKeyDown)
    window.addEventListener('keyup', GridGuides.onWindowKeyUp)

    Channel.on(Constants.EVENT_RESIZE, GridGuides.onResize)
  },

  getColCount() {
    const deviceState = MediaQueries.getDeviceState()

    switch (deviceState) {
      case MediaQueries.DESKTOP:
        return 12
      case MediaQueries.TABLETPORTRAIT:
      case MediaQueries.TABLETLANDSCAPE:
        return 6
      default: return 4
    }
  },

  onWindowKeyDown(e) {
    if (e.keyCode === 91 || e.keyCode === 93) {
      GridGuides.cmdPressed = true
    }

    if (GridGuides.cmdPressed && e.keyCode === 186) {
      GridGuides.toggleGuides()
    }
  },

  onWindowKeyUp(e) {
    if (e.keyCode === 91 || e.keyCode === 93) {
      GridGuides.cmdPressed = false
    }
  },

  onResize() {
    GridGuides.el.remove()
    GridGuides.addGridMarkup()

    if (window.localStorage.getItem('NAAW_GRID_GUIDES_ENABLED') === 'true') {
      GridGuides.toggleGuides(false)
    }
  },

  toggleGuides(updateStorage = true) {
    GridGuides.el.classList.toggle('show-guides')

    console.log('toggleGuides called')

    if (updateStorage) {
      window.localStorage.setItem(
        'NAAW_GRID_GUIDES_ENABLED',
        window.localStorage.getItem('NAAW_GRID_GUIDES_ENABLED') === 'true' ? false : true
      )
    }
  }
}

export default GridGuides
