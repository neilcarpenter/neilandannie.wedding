import appConfig from '../config/app'
import pagesConfig from '../config/pages'

import home from './home'
import about from './about'

const base = appConfig.BASE_ROUTES.PAGES
const version = ':version([0-9]{1,})?'
const { PAGES } = pagesConfig

function rootRedirect (req, res) {
  const route = `/${base}/${PAGES.HOME.route}`
  return res.redirect(301, route)
}

export default function (app) {
  app.get(`/`, rootRedirect)
  app.get(`/${base}?/?`, rootRedirect)
  app.get(`/${base}/${PAGES.HOME.route}/:version?`, home)
  app.get(`/${base}/${PAGES.ABOUT.route}/:version?`, about)
}
export { rootRedirect }
