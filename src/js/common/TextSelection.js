class TextSelection {

  constructor (el, cb) {
    this.updateSelection = this.updateSelection.bind(this, cb)

    this.el = el

    this.minLength = 3

    this.listen()
  }

  listen () {
    this.el.addEventListener('mouseup', this.updateSelection, false)
  }

  stopListening () {
    this.el.removeEventListener('mouseup', this.updateSelection)
  }

  updateSelection (cb) {
    window.clearTimeout(this.timeoutId)

    this.timeoutId = window.setTimeout(() => {
      this.selectedRange = this.save()

      if (!this.selectedRange || this.selectedRange.collapsed) {
        cb(null)
        return
      }

      const selectedString = this.formatString(this.selectedRange.toString())

      if (!selectedString || selectedString.length < this.minLength) {
        cb(null)
        return
      }

      // stops selection bounds including next paragraph
      // by excluding the last rect

      const rects = this.selectedRange.getClientRects()

      const { endOffset } = this.selectedRange

      const rectOffset = endOffset === 0 && rects.length > 1 ? 2 : 1

      const rect = rects[rects.length - rectOffset]

      cb(selectedString, rect)
    }, 50)
  }

  save () {
    if (window.getSelection) {
      const selection = window.getSelection()

      if (selection.getRangeAt && selection.rangeCount) {
        return selection.getRangeAt(0)
      }

      return null
    }

    if (document.selection && document.selection.createRange) {
      return document.selection.createRange()
    }

    return null
  }

  restore (range) {
    if (!range) {
      return
    }

    if (window.getSelection) {
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    } else if (document.selection && range.select) {
      range.select()
    }
  }

  formatString (str) {
    if (!str) {
      return ''
    }

    return str.replace(/\s+/g, ' ').trim()
  }

  destroy () {
    this.stopListening() // @TODO update for Ampersand
  }
}

export default TextSelection
