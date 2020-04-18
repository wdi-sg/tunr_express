const express = require('express')
const register = require('@react-ssr/express/register')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const { artistRoute, songRoute } = require('./routes/index')
const { handle404, handle500} = require('./controllers/errors')

dotenv.config()

const app = express()
const PORT = 3000
const APP_ROOT = '/'

const run = async () => {

  await register(app)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(methodOverride('_method'))

  app.use(APP_ROOT, artistRoute)
  app.use(APP_ROOT, songRoute)

  app.use(handle404)
  app.use(handle500)

  app.listen(PORT, _ => console.log(`listening on port ${PORT}`))

}

run().catch(console.error)
