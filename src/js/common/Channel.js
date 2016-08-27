import assignIn from 'lodash.assign'
import Events from 'ampersand-events'

const Emitter = Events.createEmitter()

// cut, paste, trim from Backbone.Radio
// (https://github.com/marionettejs/backbone.radio/blob/master/src/backbone.radio.js)
const ChannelMethods = {

  request(name) {
    if (this._requests && this._requests[name]) {
      var handler = this._requests[name]
      return handler.callback.call(handler.context)
    }
  },

  reply(name, callback, context) {
    this._requests || (this._requests = {})

    this._requests[name] = {
      callback,
      context: context || this
    }

    return this
  },

  stopReplying(name, callback, context) {
    if (!name && !callback && !context) {
      delete this._requests
    } else {
      delete this._requests[name]
    }

    return this;
  }

}

const Channel = assignIn(Emitter, ChannelMethods)

export default Channel
