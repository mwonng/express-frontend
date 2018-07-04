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
    // server.use('/',(req, res, next) => {
    //   // var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.header['x-access-token']
    //   // var test = window.localStorage.getItem('token')
    //   // res.setHeader('express-frontend-token', test)
    //   console.log("im middleware")
    //   next()
    // })

    // middleware for authentication
    // server.post('/admin', mwAuth)
    // server.post('/admin', (req, res, next) => {
    //   var token = (req.body && req.body.authorization) || (req.query && req.query.authorization) || req.headers.authorization
    //   console.log("header is:", req.headers.authorization)
    //   // res.send({result: "response"})
    //   next()
    // })
    // server.all('/admin', mwAuth)

    server.get('*', (req, res) => {
      return handle(req, res)
    })


    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })