import assign from 'lodash.assign'
import throttle from 'lodash.throttle'

import ViewAutoBinder from 'common/ViewAutoBinder'
import Channel from 'common/Channel'
import Constants from 'common/Constants'
import Singleton from 'common/Singleton'

function getElHeight (el) {
  const height = el.offsetHeight
  const { marginTop, marginBottom } = getComputedStyle(el)

  return height + parseInt(marginTop, 10) + parseInt(marginBottom, 10)
}

function getElOffset (el) {
  return Math.floor(el.getBoundingClientRect().top + document.body.scrollTop)
}

function sortComparator (a, b) {
  return a.offset > b.offset ? 1 : -1
}

class ScrollItemInView {
  constructor (config = {}) {
    this.items = []

    this._bindClassMethods()

    this.appView = config.appView || window.appView

    this.bindEvents()
  }

  _bindClassMethods () {
    this.onScroll = throttle(this.onScroll.bind(this), Constants.SCROLL_THROTTLE)
    this.onScrollEnd = this.onScrollEnd.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onChangeViewComplete = this.onChangeViewComplete.bind(this)
  }

  bindEvents () {
    if (Modernizr.naaw_scroll_transition) {
      Channel.on(Constants.EVENT_SCROLL, this.onScroll)
      Channel.on(Constants.EVENT_SCROLL_END, this.onScrollEnd)
      Channel.on(Constants.EVENT_RESIZE, this.onResize)
      Channel.on(Constants.EVENT_CHANGE_VIEW_COMPLETE, this.onChangeViewComplete)
      Channel.on(Constants.EVENT_UPDATE_SCROLL_ITEMS, this.onChangeViewComplete)
    }
  }

  initialPageLoad () {
    this.getItems()
    this.resetItems()
  }

  onScroll () {
    this.checkItemsPositions(true)
  }

  onScrollEnd () {
    this.resetItems()
  }

  onResize () {
    this.resetItems()
  }

  onChangeViewComplete() {
    this.getItems()
    this.resetItems()
  }

  resetItems () {
    this.items = this.items.filter((item) => {
      return item.el.className.indexOf(Constants.SCROLL_ITEM_SHOW) === -1
    })

    this.updateItems()
    this.checkItemsPositions(false)
  }

  getItems (view) {
    const context = view || this.appView.wrapper

    this.items = context.queryAll(`[${Constants.SCROLL_ITEM_SELECTOR}]`)
      .filter((el) => el.className.indexOf(Constants.SCROLL_ITEM_SHOW) === -1)
      .map((el) => {
        return {
          el,
          height: getElHeight(el),
          offset: getElOffset(el)
        }
      })
      .sort(sortComparator)
  }

  updateItems () {
    this.items = this.items.map((item) => {
      item.height = getElHeight(item.el)
      item.offset = getElOffset(item.el)

      return item
    })
      .sort(sortComparator)
  }

  checkItemsPositions (fromScroll = false) {
    if (!this.items.length) {
      return
    }

    if (!Modernizr.naaw_scroll_transition) {
      this.showAllFallback()
      return
    }

    const viewportThreshold = fromScroll ? Constants.SCROLL_THRESHOLD : 1
    const threshold = this.appView.lastScrollY + (this.appView.dimensions.height * viewportThreshold)
    const itemsToShow = this.items.filter((item) => {
      if (threshold > item.offset) {
        item.shouldDelay = !(!fromScroll && threshold > (item.offset + item.height))

        return item
      }
    })

    if (itemsToShow.length) {
      this.showItems(itemsToShow)
      this.items = this.items.slice(itemsToShow.length, this.items.length)
    }
  }

  showItems (items) {
    let delayCount = 0

    items.forEach((item, i) => {
      ((_item) => {
        let delay = 0

        if (_item.shouldDelay) {
          delay = Constants.SCROLL_SHOW_TIMEOUT * delayCount
          delayCount++
        }

        setTimeout(() => {
          this.showItem(_item.el)
        }, delay)
      })(item, i)
    })
  }

  showItem (el) {
    if (el.className.indexOf(Constants.SCROLL_ITEM_SHOW) !== -1) {
      return
    }

    if (el.classList) {
      el.classList.add(Constants.SCROLL_ITEM_SHOW)
    } else {
      el.className += ` ${Constants.SCROLL_ITEM_SHOW}`
    }

    if (el.hasAttribute(Constants.SCROLL_ITEM_EVENT)) {
      this.showItemEvent(el)
    }
  }

  showItemEvent (el) {
    const id = ViewAutoBinder.getElViewId(el)

    // view hasn't been instantiated yet - leave a flag telling it to fire showFromScroll immediately
    if (!id) {
      el.setAttribute(Constants.SCROLL_ITEM_EVENT, 'immediate')
      return
    }

    const view = ViewAutoBinder.getViewById(id)

    if (view) {
      view.showFromScroll()
    }
  }

  showAllFallback () {
    this.items.forEach((item) => {
      if (item.el.hasAttribute(Constants.SCROLL_ITEM_EVENT)) {
        this.showItemEvent(item.el)
      }
    })
  }
}

export default assign(ScrollItemInView, Singleton)
