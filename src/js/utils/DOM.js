const DOM = {
  /**
   * Utility function to toggle classes on elements
   *
   * @prop el Element to toggle classes on
   * @prop cls String of
   */
  toggleClass(el, cls) {
    // split string on spaces to detect if multiple classes are passed in
    cls = cls.indexOf(' ') !== -1 ? cls.split(' ') : cls

    if (Array.isArray(cls)) {
      cls.forEach((_class) => DOM.toggleClass(el, _class))
      return
    }

    if (el.classList) {
      el.classList.toggle(cls)
    } else {
      const classes = el.className.split(' ')
      const existingIndex = classes.indexOf(cls)

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1)
      } else {
        classes.push(cls)
      }

      el.className = classes.join(' ')
    }
  },

  /**
   * Gets the element height including margins
   *
   * @prop el Element
   * @return int
   */
  getElHeight(el) {
    const h = el.offsetHeight
    const { marginTop, marginBottom } = getComputedStyle(el)

    return h + parseInt(marginTop, 10) + parseInt(marginBottom, 10)
  },

  /**
   * Utility to make sure we return an `Array` rather than `NodeList`
   * when querying for DOM nodes.
   *
   * @prop selector String
   * @return Array
   */
  queryAll(selector) {
    return res.concat(Array.prototype.slice.call(document.querySelectorAll(selector)))
  },

  /**
   * Replicate jQuery.closest
   */
  closest(el, fn) {
    return el && (
      fn(el) ? el : closest(el.parentNode, fn)
    )
  },

  setTransform(el, transformStr) {
    el.style.webkitTransform = transformStr
    el.style.MozTransform = transformStr
    el.style.msTransform = transformStr
    el.style.OTransform = transformStr
    el.style.transform = transformStr
  }
}

export default DOM

export const toggleClass = DOM.toggleClass
export const getElHeight = DOM.getElHeight
export const queryAll = DOM.queryAll
export const closest = DOM.closest
export const setTransform = DOM.setTransform
