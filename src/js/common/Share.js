/* global Modernizr */

function openWin (url, w, h) {
  const left = (window.screen.availWidth - w) >> 1
  const top = (window.screen.availHeight - h) >> 1

  window.open(url, '', `top=${top},left=${left},width=${w},height=${h},location=no,menubar=no`)
}

const Share = {
  CONFIG_DATA_ATTR: 'share-config',

  email(config = { url: '', title: '', description: '' }, getUrl = false) {
    const url = encodeURIComponent(config.url)
    const subject = config.title ? encodeURIComponent(config.title) : ''
    const bodyTop = config.description ? `${encodeURIComponent(config.description)}%0D%0A%0D%0A` : ''
    const shareUrl = `mailto:?subject=${subject}&body=${bodyTop}${url}`

    if (getUrl) return shareUrl

    window.location = shareUrl
  },

  googleplus(config = { url: '' }, getUrl = false) {
    const url = encodeURIComponent(config.url)
    const shareUrl = `https://plus.google.com/share?url=${url}`

    if (getUrl) return shareUrl

    openWin(shareUrl, 505, 385)
  },

  facebook(config = { url: '', title: '' }, getUrl = false) {
    const url = encodeURIComponent(config.url)
    const descr = encodeURIComponent(config.title)
    const shareUrl = `http://www.facebook.com/share.php?u=${url}&t=${descr}`

    if (getUrl) return shareUrl

    openWin(shareUrl, 600, 300)
  },

  twitter(config = { url: '', title: '' }, getUrl = false) {
    const url = encodeURIComponent(config.url)
    const descr = encodeURIComponent(config.title)
    const shareUrl = `http://twitter.com/intent/tweet/?text=${descr}&url=${url}`

    if (getUrl) return shareUrl

    openWin(shareUrl, 600, 300)
  },

  reddit(config = { url: '', title: '' }, getUrl = false) {
    const url = encodeURIComponent(config.url)
    const descr = encodeURIComponent(config.title)
    const shareUrl = `http://www.reddit.com/submit?url=${url}&title=${descr}`

    if (getUrl) return shareUrl

    openWin(shareUrl, 900, 600)
  },

  linkedin(config = { url: '', title: '', summary: '', source: 'neilandannie.wedding', }, getUrl = false) {
    const url = encodeURIComponent(config.url)
    const title = encodeURIComponent(config.title)
    const summary = encodeURIComponent(config.summary)
    const source = encodeURIComponent(config.source)
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}&source=${source}`

    if (getUrl) return shareUrl

    openWin(shareUrl, 900, 600)
  },

  // http://stackoverflow.com/a/19126326
  sms(config = { url: '', title: '' }, getUrl = false) {
    const url = encodeURIComponent(config.url)
    const descr = config.title ? `${encodeURIComponent(config.title)}%0D%0A%0D%0A` : ''
    const delimiter = Modernizr.ios ? '&' : '?'
    const shareUrl = `sms:${delimiter}body=${descr}${url}`

    if (getUrl) return shareUrl

    window.location.href = shareUrl
  },

  // http://stackoverflow.com/a/21452346
  whatsapp(config = { url: '', title: '' }, getUrl = false) {
    const url = encodeURIComponent(config.url)
    const descr = config.title ? `${encodeURIComponent(config.title)}%0D%0A%0D%0A` : ''
    const shareUrl = `whatsapp://send?text=${descr}${url}`

    if (getUrl) return shareUrl

    window.location.href = shareUrl
  },

  // http://stackoverflow.com/a/11212220
  // pinterest(config = { url: '', title: '', media: '' }) {
  //   const url = encodeURIComponent(config.url)
  //   const descr = encodeURIComponent(config.title)
  //   const media = encodeURIComponent(config.media) // @TODO - add media here

  //   openWin(`http://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${descr}`, 750, 550)
  // },

  // http://spigotdesign.com/text-only-stumbleupon-stumble-link/
  // stumbleupon(config = { url: '', title: '', media: '' }) {
  //   const url = encodeURIComponent(config.url)
  //   const descr = encodeURIComponent(config.title)

  //   openWin(`http://www.stumbleupon.com/submit?url=${url}&title=${descr}`, 750, 550)
  // },

  // tumblr(config = { url: '', title: '' }) {
  //   const url = encodeURIComponent(config.url)
  //   const descr = encodeURIComponent(config.title)

  //   openWin(`http://www.tumblr.com/share/link?url=${url}&name=${descr}`, 540, 370)
  // }
}

export default Share
