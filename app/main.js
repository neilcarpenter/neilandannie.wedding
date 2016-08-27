import cluster from 'cluster'
import os from 'os'
import app from './server'
import appConfig from './config/app'

const workers = {}
const count = os.cpus().length

function spawn () {
  const worker = cluster.fork()
  workers[ worker.pid ] = worker
  return worker
}

if (cluster.isMaster && process.env.NODE_ENV === 'production' && appConfig.ENABLE_CLUSTERING) {
  for (let i = 0; i < count; i++) {
    spawn()
  }

  cluster.on('death', (worker) => {

    console.log('worker %s died. spawning a new process...', worker.pid)
    delete workers[ worker.pid ]
    spawn()
  })
} else {
  const host = appConfig.express.ip
  const port = appConfig.express.port

  app.listen(port, host, (error) => {

    if (error) {
      console.error('Unable to listen for connections', error)
      process.exit(10)
    }

    console.log('Static app listening at http://%s:%s', host, port)
  })
}
