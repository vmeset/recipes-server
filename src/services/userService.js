const userModel = require('../models/userModel')
// import jwt from 'jsonwebtoken'
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService.js')

class UserService {
  async register(email, password, username) {
    const candidate = await userModel.findOne({email})
    if(candidate) {
      throw new Error(`${email} уже занят другим пользователем`)
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const activationLink = uuid.v4()
    const newUser = await userModel.create({
      username,
      password: hashPassword,
      email,
      avatar: {
        data: req.file.filename,
        contentType: 'image/png'
      },
      activationLink
    })
    await mailService.sendActivationLink(email, activationLink)
    const tokens = tokenService.generateTokens({email, password})
  }
}

module.exports = new UserService()