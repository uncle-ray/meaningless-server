const path = require('path')
const express = require('express')
const compression = require('compression')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const viewPath = process.env.VIEWS_PATH || 'views/dev'

const app = new express()

app.use(cookieParser())

app.use(compression())

app.set('view engine', 'html')

app.set('views', path.join(__dirname, viewPath))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(logger('dev'))

app.use(bodyParser.json({
  limit: 10 * 1024 * 1024 * 8
}))

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(path.join(__dirname, './view/dev')))

app.listen(7000, () => {
  console.log('server is running')
})