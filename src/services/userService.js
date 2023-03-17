const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService.js')
const UserDto = require('../dto/userDto')

class UserService {
  async register(username, password, email, avatar) {

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
      avatar,
      activationLink
    })
    
    await mailService.sendActivationLink(email, activationLink)
    
    const userDto = new UserDto(newUser)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    
    return {...tokens, user: userDto}
  }
}

module.exports = new UserService()