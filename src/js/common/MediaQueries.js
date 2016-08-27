const MediaQueries = {

  // Breakpoints
  DESKTOP: 'desktop breakpoint',
  TABLETPORTRAIT: 'tabletportrait breakpoint',
  TABLETLANDSCAPE: 'tabletlandscape breakpoint',
  DEFAULT: 'default breakpoint',

  JS_EL: null,
  EL_CLASSNAME: 'js-mediaqueries',

  setup() {
    MediaQueries.JS_EL = document.createElement('div')
    MediaQueries.JS_EL.className = MediaQueries.EL_CLASSNAME
    document.body.appendChild(MediaQueries.JS_EL)

    MediaQueries.CASCADE = [
      MediaQueries.DESKTOP,
      MediaQueries.TABLETLANDSCAPE,
      MediaQueries.TABLETPORTRAIT,
      MediaQueries.DEFAULT
    ]
  },

  getDeviceState() {
    const re = /('|")/

    let value = window.getComputedStyle(MediaQueries.JS_EL).getPropertyValue('font-family')
    if (re.test(value.charAt(0)) && re.test(value.charAt(value.length - 1))) {
      value = value.substr(1, value.length - 2)
    }

    return value
  },

  isLargerThanBreakpoint(breakpoint) {
    const currentState = MediaQueries.getDeviceState()

    const currentStateIndex = MediaQueries.CASCADE.indexOf(currentState)
    const breakpointIndex = MediaQueries.CASCADE.indexOf(breakpoint)

    return currentStateIndex <= breakpointIndex
  },

  isSmallerThanBreakpoint(breakpoint) {
    const currentState = MediaQueries.getDeviceState()

    const currentStateIndex = MediaQueries.CASCADE.indexOf(currentState)
    const breakpointIndex = MediaQueries.CASCADE.indexOf(breakpoint)

    return currentStateIndex > breakpointIndex
  }

}

export default MediaQueries
