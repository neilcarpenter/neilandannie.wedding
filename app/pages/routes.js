import fs from 'fs'

const version = ':version([0-9]{1,})?'

function getHandlers () {
  return fs
    .readdirSync(__dirname)
    .filter(name => fs.statSync(`${__dirname}/${name}`).isDirectory())
    .map(dir => {
      const route = dir === 'home' ? '' : `${dir.replace(/_/g, '/')}/`
      const callback = require(`./${dir}`).default
      return { route, callback }
    })
    .sort((handlerA, handlerB) => {
      const handlerALen = handlerA.route.split('/').length
      const handlerBLen = handlerB.route.split('/').length
      if (handlerALen === handlerBLen) {
        return 0
      } else {
        return (handlerALen < handlerBLen) ? 1 : -1
      }
    })
}

export default function (app) {
  const handlers = getHandlers()
  handlers.forEach(handler => {
    app.get(`/${handler.route}${version}`, handler.callback)
  })
}
