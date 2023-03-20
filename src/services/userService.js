const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService.js')
const UserDto = require('../dto/userDto')
const ApiError = require('../error/ApiError')

class UserService {
  async register(username, password, email, avatar) {

    const candidate = await userModel.findOne({email})
    if(candidate) {
      throw ApiError.badRequest(`${email} уже занят другим пользователем`)
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
    
    await mailService.sendActivationLink(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)
    
    const userDto = new UserDto(newUser)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    
    return {...tokens, user: userDto}
  }

  async activate(activationLink) {
    const user = await userModel.findOne({activationLink})
    if(!user) {
      throw ApiError.badRequest('Некорректная ссылка активации')
    }
    user.isActivated = true
    await user.save()
  }

  async login(email, password) {
    const user = await userModel.findOne({email})
    if(!user) {
      throw ApiError.badRequest(`Пользователя с такой почтой не зарегистрировано`)
    }

    const isPasswEqual = await bcrypt.compare(password, user.password)
    if(!isPasswEqual) {
      throw ApiError.badRequest('Неверный логин или пароль')
    }

    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }
}

module.exports = new UserService()