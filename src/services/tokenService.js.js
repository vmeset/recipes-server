const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel')

class TokenService {
  async generateTokens(payload) {
    const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_KEY, {expiresIn: '30m'})
    const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_KEY, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken (userId, refreshToken) {
    const tokenData = await tokenModel.findOne({userId})
    if(tokenData) {
       tokenData.refreshToken = refreshToken
       return tokenData.save()
    }
    const token = await tokenModel.create({user: userId, refreshToken})
    return token
  }
}

module.exports = new TokenService()