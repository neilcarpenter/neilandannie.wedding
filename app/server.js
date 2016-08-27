import express from 'express'
import compress from 'compression'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import { renderFile } from 'ejs'

const app = express()

app.set('views', __dirname)
app.engine('html', renderFile)
app.set('view engine', 'html')
app.use(compress())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

;[
  './pages/routes'
].forEach((routePath) => {
  require(routePath).default(app)
})

app.use(express.static(path.join(__dirname, '/build')))

export default app
