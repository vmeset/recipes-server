const ApiError = require('../error/ApiError')
const tokenService = require('../services/tokenService.js')

module.exports = function(req, res, next) {
  try {
    const authHead = req.headers.authorization
    if(!authHead) {
      return next(ApiError.unauthorized())  
    }

    const accessToken = authHead.split(' ')[1]
    if(!accessToken) {
      return next(ApiError.unauthorized())
    }

    const data = tokenService.validateAccessToken(accessToken)
    if(!data) {
      return next(ApiError.unauthorized())
    }

    req.user = data
    next()
  } catch (e) {
    return next(ApiError.unauthorized())
  }
}