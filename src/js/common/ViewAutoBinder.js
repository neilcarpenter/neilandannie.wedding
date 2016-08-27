import find from 'lodash.find'
import uniqueId from 'lodash.uniqueid'

import { closest } from 'utils/DOM'

const ViewAutoBinder = {
  TMPL_DATA_ATTR: 'naaw-tmpl',
  APP_ID_DATA_ATTR: 'naaw-id',

  allViews: [],

  bindView(view) {
    ViewAutoBinder._setup(view)

    const allTmpls = view.queryAll(`[data-${ViewAutoBinder.TMPL_DATA_ATTR}]`)
      .filter(ViewAutoBinder._filterEls)

    ViewAutoBinder.bindViewTemplates(view, allTmpls)
  },

  bindViewTemplates(view, tmpls = []) {
    const modulesAvailable = view.modules.map((item) => {
      return item.prototype.template
    })

    const newViews = []

    tmpls.forEach((el) => {
      const tmpl = el.getAttribute(`data-${ViewAutoBinder.TMPL_DATA_ATTR}`)
      const classRef = find(view.modules, (item) => item.prototype.template === tmpl)

      if (modulesAvailable.indexOf(tmpl) > -1 &&
        !el.hasAttribute(`data-${ViewAutoBinder.APP_ID_DATA_ATTR}`)) {
        const newView = ViewAutoBinder._autoBindSubView(view, el, classRef)
        newViews.push(newView)
      }
    })

    return newViews
  },

  unbindView(view) {
    const viewItem = find(ViewAutoBinder.allViews, { id: view.naaw_id })
    const index = ViewAutoBinder.allViews.indexOf(viewItem)

    ViewAutoBinder.allViews.splice(index, 1)
  },

  getTemplateRef(templateName) {
    return templateName.replace(/-([a-z])/g, (g) => {
      return g[ 1 ].toUpperCase()
    })
  },

  getViewTemplates(view, modules = []) {
    let templates = []
    modules = modules.map((module) => ViewAutoBinder.getTemplateRef(module.prototype.template))

    for (let key in view._views) {
      if (modules.indexOf(key) > -1) {
        if (Array.isArray(view._views[ key ])) {
          templates.push(...view._views[ key ])
        } else {
          templates.push(view._views[ key ])
        }
      }
    }

    return templates
  },

  getViewById(id) {
    id = typeof id === 'string' ? id : id.toString()

    const reference = find(ViewAutoBinder.allViews, { id })
    const view = reference ? reference.view : false

    return view
  },

  getElViewId(el) {
    let id

    if (el.hasAttribute(`data-${ViewAutoBinder.APP_ID_DATA_ATTR}`)) {
      id = el.getAttribute(`data-${ViewAutoBinder.APP_ID_DATA_ATTR}`)
    }

    if (!id) {
      const closestEl = closest(el, (node) => node.hasAttribute && node.hasAttribute(`data-${ViewAutoBinder.APP_ID_DATA_ATTR}`))
      if (closestEl) id = closestEl.getAttribute(`data-${ViewAutoBinder.APP_ID_DATA_ATTR}`)
    }

    return id
  },

  _setup(view) {
    view._views = view._views || {}
  },

  _autoBindSubView(view, el, classRef) {
    const classInstanceRef = ViewAutoBinder.getTemplateRef(classRef.prototype.template)
    const newSubView = new classRef({ el})

    if (!view._views[ classInstanceRef ]) {
      view._views[ classInstanceRef ] = newSubView
    } else if (Array.isArray(view._views[ classInstanceRef ])) {
      view._views[ classInstanceRef ].push(newSubView)
    } else {
      view._views[ classInstanceRef ] = [ view._views[ classInstanceRef ], newSubView ]
    }

    view.addChild(newSubView)

    const id = uniqueId()
    newSubView.naaw_id = id
    el.setAttribute(`data-${ViewAutoBinder.APP_ID_DATA_ATTR}`, id)
    ViewAutoBinder.allViews.push({ id, view: newSubView })

    return newSubView
  },

  _filterEls(el) {
    return !el.hasAttribute(`data-${ViewAutoBinder.APP_ID_DATA_ATTR}`)
  }
}

export default ViewAutoBinder
