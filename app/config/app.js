import dotenv from 'dotenv'
import path from 'path'

dotenv.load({ path: path.join(__dirname, '../../.env') })

const configuration = {}

configuration.PRODUCTION = process.env.NODE_ENV === 'production'
configuration.ENABLE_CLUSTERING = false

configuration.DATA_CACHE_TIMEOUT = configuration.PRODUCTION ? ((1000 * 60) * 5) : 0

configuration.express = {
  port: process.env.PORT || 3000,
  ip: '127.0.0.1'
}

configuration.BASE_ROUTES = {
  PAGES: 'pages',
  PREVIEW: 'preview'
}

configuration.hostName = process.env.HOST_NAME || `http://${configuration.express.ip}:${configuration.express.port}`
configuration.apiHost = process.env.API_HOST
configuration.homePath = 'home'

configuration.localesAvailable = [
  'en'
]

export default configuration
