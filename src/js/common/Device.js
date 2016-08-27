/* global Modernizr */

// http://stackoverflow.com/a/14223920
function iOSVersion () {
  const v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
  return [ parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10) ]
}

// http://stackoverflow.com/a/4900484
function chromeVersion () {
  const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)
  return raw ? parseInt(raw[2], 10) : false
}

const Device = {
  ua: window.navigator.userAgent.toLowerCase(),
  tests: {
    // UA sniffing
    'ios': () => {
      return (/ipad|iphone|ipod/).test(Device.ua) && !window.MSStream
    },
    'iphone': () => {
      return (/iphone/).test(Device.ua) && !window.MSStream
    },
    'android': () => {
      return Device.ua.indexOf('android') > -1
    },
    'ios-or-android': () => {
      return (/iphone/).test(Device.ua) && !window.MSStream || Device.ua.indexOf('android') > -1
    },
    'safari': () => {
      return Device.ua.indexOf('safari') > -1 && Device.ua.indexOf('chrome') === -1
    },
    'firefox': () => {
      return Device.ua.indexOf('firefox') > -1
    },
    'chrome': () => {
      return (/chrome/).test(Device.ua) && (/Google Inc/).test(navigator.vendor)
    },
    'chrome_ios': () => {
      return Device.ua.match('crios') // http://stackoverflow.com/a/13808053
    },
    'windows': () => {
      return Device.ua.indexOf('windows') > -1 && Device.ua.indexOf('windows phone') < 0
    },
    'osx': () => {
      return navigator.platform.toLowerCase().indexOf('mac') > -1
    },

    // general features
    'xhr2': () => {
      return 'FormData' in window
    },

    'webkit-text-stroke': () => {
      const h1 = document.createElement('h1')
      return !(!('webkitTextStroke' in h1.style) && !('textStroke' in h1.style))
    },

    'naaw_scroll_transition': () => {
      return Modernizr.csstransitions && Modernizr.csstransforms3d
    },

    // Copa-specific functionality
    'naaw_page_transitions': () => {
      return Modernizr.history && Modernizr.csstransitions
    },

    'mix_blend_mode': () => {
      // Old iOS / chrome have patchy support for mix-blend-mode,
      // so we exclude them from the support list here.

      if (Modernizr.ios && iOSVersion()[0] < 9) {
        return false
      }

      if (Modernizr.chrome && chromeVersion() < 47) {
        return false
      }

      return Modernizr.testProp('mixBlendMode')
    },

    'font_smoothing': () => {
      return Modernizr.ios || Modernizr.osx || Modernizr.android
    }

  },

  setup() {
    for (let key in Device.tests) {
      Modernizr.addTest(key, Device.tests[key])
    }
  }
}

export default Device
