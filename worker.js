process.env.IN_DOCKER_CONTAINER = require('./src/detectDocker')()

const SCWorker = require('socketcluster/scworker')
const express = require('express')
const serveStatic = require('serve-static')
const healthChecker = require('sc-framework-health-check')
const fs = require('fs-extra')
const path = require('path')

const { setupAPI } = require('./src/api')
const browserClientDist = 'jamir-browser-client-dist'
const indexHtml = fs.readFileSync(path.resolve(__dirname, browserClientDist, 'index.html'), 'utf8')

class Worker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid)
    const environment = this.options.environment

    const app = express()

    const httpServer = this.httpServer
    const scServer = this.scServer

    if (environment === 'dev') {
      // Log every HTTP request.
      // See https://github.com/expressjs/morgan for other available formats.
      const morgan = require('morgan')
      app.use(morgan('dev'))
    }

    const definedRoutes = [
      '/',
      '/auth',
      '/address-programs',
      '/check-reports',
      '/view-reports',
      '/exported-reports',
      '/user-management',
      '/settings',
    ]

    app.get(definedRoutes, (req, res, next) => {
      res.writeHead(200)
      res.end(indexHtml)
    })

    app.use(serveStatic(path.resolve(__dirname, browserClientDist)))

    // Listen for HTTP GET "/health-check".
    healthChecker.attach(this, app)

    httpServer.on('request', app)
    setupAPI(scServer)
  }
}

new Worker()
