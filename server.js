const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// import { mwAuth } from './utils/middlewares/authenticate'
const mwAuth = require('./utils/middlewares/authenticate')

app.prepare()
  .then(() => {
    const server = express()
    // const faviconOptions = {
    //   root: __dirname + '/static/'
    // };

    // server.get('/favicon.ico', (req, res) => (
    //   res.status(200).sendFile('favicon.ico', faviconOptions)
    // ));
    server.get('*', (req, res) => {
      return handle(req, res)
    })


    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })