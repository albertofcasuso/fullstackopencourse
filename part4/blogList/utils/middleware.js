const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const getTokenFrom = (request,response,next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    request.token = authorization.substring(7)
    next()
  }else{
    next()
  }
}

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

module.exports = {errorHandler,getTokenFrom,requestLogger}