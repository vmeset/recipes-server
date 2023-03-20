const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_KEY, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_KEY, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY)
      return data
    } catch(e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_KEY)
      return data
    } catch(e) {
      return null
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

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({refreshToken})
    return tokenData
  }

  async refreshToken(refreshToken) {

  }

  async findToken(refreshToken) {
    const data = await tokenModel.findOne({refreshToken})
    return data
  }
}

module.exports = new TokenService()