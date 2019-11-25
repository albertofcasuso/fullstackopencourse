const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {type:Number,default:0}
})

blogSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
mongoose.model('Blog', blogSchema)

module.exports = mongoose.model('Blog', blogSchema)