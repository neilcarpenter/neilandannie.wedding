import appConfig from '../config/app'

import home from './home'
import about from './about'
import rsvp from './rsvp'
import rsvpEvening from './rsvp_evening'

const version = ':version([0-9]{1,})?'

export default function (app) {
  app.get(`/rsvp/evening/:version?`, rsvpEvening)
  app.get(`/rsvp/:version?`, rsvp)
  app.get(`/about/:version?`, about)
  app.get(`/:version?`, home)
}
