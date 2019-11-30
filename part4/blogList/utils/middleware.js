const errorHandler = (error,request,response,next)=>{
  //Error 400 si falla la validación
  if (error.name === 'ValidationError'){
    return response.status(400).json({error:error.message})
  }else
  if(error.name==='JsonWebTokenError'){
    return response.status(401).json({error:'invalid token'})
  }
  next(error)
}

const getTokenFrom = (request,response,next) => {
  //console.log('I am the getTokenFrom middleware')
  //console.log(request.get('authorization'))
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    request.token = authorization.substring(7)
    next()
  }
  return null
}

module.exports = {errorHandler,getTokenFrom}