const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {type:String,minlength:5,required:true},
  author: {type:String,minlength:5,required:true},
  url: {type:String, required:true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {type:Number,default:0},
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment'
  }]
})

blogSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)