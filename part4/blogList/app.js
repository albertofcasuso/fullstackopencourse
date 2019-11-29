const express = require('express')
const app = express()
const router = require('./controllers/routeControl')
const usersRouter = require('./controllers/usersRouter')
const middleware = require('./utils/middleware')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')


mongoose.connect(config.MONGODB_URI,{useNewUrlParser:true}).then(response=>{
  console.log('Connected to MONGODB')
}).catch(error=>{
  console.log('Error connecting to MONGODB')
})
app.use(cors())
app.use(bodyParser.json())

//Cargar el enrutador POST GET de los blogs
app.use('/api/blogs',router)
//Carga el enrutador POST GET de los usuarios
app.use('/api/users',usersRouter)
app.use(middleware.errorHandler)

module.exports = app