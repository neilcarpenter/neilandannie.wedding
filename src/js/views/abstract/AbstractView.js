import View from 'ampersand-view'
import assign from 'lodash.assign'
import template from 'lodash.template'

import ViewAutoBinder from '../../common/ViewAutoBinder'

const AbstractView = View.extend({
  autoRender: false,

  events: {},

  id: null,
  naaw_id: null,

  children: null,

  template: null,
  templateStr: null,
  templateVars: null,
  modules: null,
  autobindOnInstantiation: true,

  constructor(config = {}) {
    config = assign(config, this.getElFromConfig(config))

    AbstractView.__super__.constructor.call(this, config)

    if (this.template && this.modules && this.modules.length && this.autobindOnInstantiation) {
      ViewAutoBinder.bindView(this)
    }

    // From Ampersand view - as we don't call render
    this._upsertBindings()
  },

  getElFromConfig(config) {
    let el

    if (config.el) {
      el = config.el
    } else {
      el = document.querySelector(`[data-${ViewAutoBinder.TMPL_DATA_ATTR}="${this.template}"]`)
    }

    return { el }
  },

  initialize() {
    AbstractView.__super__.initialize.call(this)

    this.children = []

    // this doesn't work with &-view...
    // if (this.templateStr) {
    //   const tmpHTML = template(this.templateStr)
    //   this.setElement(tmpHTML(this.templateVars))
    // }

    this.init()
  },

  init() {},

  update() {},

  showFromScroll() {},

  render() {},

  addChild(child) {
    if (child.el) {
      this.children.push(child)
    }

    return this
  },

  replace(dom, child) {
    if (child.el) {
      this.children.push(child)
    }

    const c = child.el || child
    const replaceEl = this._findChild(this.el.children, dom)

    this.el.replaceChild(replaceEl, c)
  },

  remove(child, removeFromDOM = true) {
    if (!child) {
      return
    }

    const c = child.el || child

    if (c && child.dispose) {
      child.dispose()
    }

    if (c && this.children.indexOf(child) > -1) {
      this.children = this.children.filter((item) => item !== child)
    }

    if (child.children.length) {
      child.children.forEach((_child) => {
        child.remove(_child, removeFromDOM)})
    }

    if (removeFromDOM) c.remove()
  },

  mouseEnabled(enabled) {
    this.el.style.pointerEvents = enabled ? 'auto' : 'none'
  },

  CSSTranslate(x, y, value = '%' , scale) {
    let str

    if (Modernizr.csstransforms3d) {
      str = `translate3d(${x + value}, ${y + value}, 0`
    } else {
      str = `translate(${x + value}, ${y + value})`
    }

    if (scale) {
      str = `${str} scale(${scale})`
    }

    return str
  },

  removeAllChildren() {
    this.children.forEach(child => this.remove(child))
  },

  triggerChildren(msg, children) {
    children = children || this.children

    children.forEach((child) => {
      child.trigger(msg)

      if (chil.children.length) {
        this.triggerChildren(msg, child.children)
      }
    })
  },

  callChildren(method, params, children) {
    children = children || this.children

    children.forEach((child) => {
      if (child[ method ]) {
        child[ method ](params)
      }

      if (child.children.length) {
        this.callChildren(method, params, child.children)
      }
    })
  },

  callChildrenAndSelf(method, params, children) {
    children = children || this.children

    if (this[ method ]) {
      this[ method ](params)
    }

    this.callChildren(method, params, children)
  },

  dispose() {
    this.undelegateEvents()
    this.stopListening()

    ViewAutoBinder.unbindView(this)
  }
})

export default AbstractView
