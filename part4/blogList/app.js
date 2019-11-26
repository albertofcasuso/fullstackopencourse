const express = require('express')
const app = express()
const router = require('./controllers/routeControl')
const middleware = require('./utils/middleware')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')


mongoose.connect(config.MONGODB_URI,{useNewUrlParser:true}).then(response=>{
  console.log('Connected to MONGODB'+ response)
}).catch(error=>{
  console.log('Error connecting to MONGODB'+ error)
})
app.use(cors())
app.use(bodyParser.json())

//Cargar el enrutador POST GET y demás
app.use('/api/blogs',router)
app.use(middleware.errorHandler)

module.exports = app