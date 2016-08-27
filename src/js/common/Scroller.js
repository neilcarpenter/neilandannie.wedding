/* global TweenLite, Power3 */

const Scroller = {
  defaults: {
    offset: 0,
    minTime: 0.1,
    maxTime: 0.6
  },

  MAX_DIST: 500,

  scrollTo(settings, cb) {
    const offset = settings.offset || Scroller.defaults.offset
    const maxTime = settings.maxTime || Scroller.defaults.maxTime
    const minTime = settings.minTime || Scroller.defaults.minTime
    const target = (typeof settings.target === 'number' ? settings.target : settings.target.offset().top) + offset

    let distToGo = window.scrollY - target
    distToGo = (distToGo < 0) ? distToGo * -1 : distToGo

    let time

    if (distToGo === 0) {
      time = 0
    } else if (distToGo > Scroller.MAX_DIST) {
      time = maxTime + minTime
    } else {
      time = ((distToGo / Scroller.MAX_DIST) * maxTime) + minTime
    }

    // console.log(`+++Scroller, distance to go: ${distToGo}, time to take it: ${time}`)

    TweenLite.to(window, time, {
      scrollTo: {
        x: 0,
        y: target,
        autoKill: false
      },
      ease: Power3.easeInOut,
      delay: settings.delay || 0,
      onComplete: () => {
        if (cb && typeof cb === 'function') {
          cb()
        }
      }
    })
  }

}

export default Scroller
