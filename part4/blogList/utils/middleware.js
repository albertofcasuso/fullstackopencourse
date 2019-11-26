const errorHandler = (error,request,response,next)=>{
  //Error 400 si falla la validación
  if (error.name === 'ValidationError'){
    return response.status(400).json({error:error.message})
  }
  next(error)
}

module.exports = {errorHandler}