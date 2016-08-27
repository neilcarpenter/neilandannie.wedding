import uniqueId from 'lodash.uniqueid'
import Promise from 'native-promise-only'

const youtube = {
  API_LOADED: false,
  _activePromise: null,

  create (config={}, targetNode) {
    const promise = new Promise((resolve, reject) => {
      youtube._activePromise = { resolve, reject }

      targetNode.id = `yt_player_${uniqueId()}`

      if (!youtube.API_LOADED) {
        window.onYouTubeIframeAPIReady = youtube._firstLoadComplete.bind(null, config, targetNode)
        youtube._loadAPI()
      } else {
        youtube._createPlayer(config, targetNode)
      }
    })

    return promise
  },

  play (player) {
    if (player.playVideo && typeof player.playVideo === 'function') player.playVideo()
  },

  pause (player) {
    if (player.pauseVideo && typeof player.pauseVideo === 'function') player.pauseVideo()
  },

  destroy (player) {
    player.destroy()
  },

  _loadAPI () {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'

    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  },

  _firstLoadComplete (config={}, targetNode) {
    youtube.API_LOADED = true
    youtube._createPlayer(config, targetNode)
  },

  _createPlayer (config={}, targetNode) {
    new YT.Player(targetNode.id, {
      videoId: config.video_id,
      playerVars: {
        color: 'white',
        theme: 'dark',
        showinfo: 0,
        rel: 0
      },
      events: {
        onReady: (event) => youtube._activePromise.resolve(event.target)
      }
    })
  }

}

export default youtube
