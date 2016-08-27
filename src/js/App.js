import assignIn from 'lodash.assignin'

import AppView from 'views/AppView'
import AppRouter from 'router/AppRouter'
import AppModel from 'models/AppModel'
import UrlHelper from 'common/UrlHelper'

import Channel from 'common/Channel'
import Constants from 'common/Constants'

class App {

  start () {
    console.log('App:start()')

    const appView = AppView.getInstance()
    const appRouter = AppRouter.getInstance()
    const appModel = AppModel.getInstance(JSON.parse(appView.el.dataset.appModel))

    UrlHelper.setup()

    assignIn(window, {
      appView,
      appRouter,
      appModel,
      Constants,
      Channel
    })

    appRouter.start()
  }
}

export default App
