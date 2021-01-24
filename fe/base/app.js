const path = require('path')
const express = require('express')

const app = new express()

app.use(express.static(path.join(__dirname, './view/dev')))

app.listen(7000, () => {
  console.log('server is running')
})