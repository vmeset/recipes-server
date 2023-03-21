const userModel = require('../models/userModel')
const userService = require('../services/userService')
const {validationResult} = require('express-validator')
const ApiError = require('../error/ApiError')

class UserController {
  async register (req, res, next) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return next(ApiError.badRequest('Неверно введены данные для регистрации', errors.array()))
      }
      const {password, email} = req.body
      const avatar = {
        data: req.file.filename,
        contentType: 'image/png'
      }
      const data = await userService.register(password, email, avatar)
      res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(data)
    } catch (e) {
      next(e)
    }
  }
  async fetchAll (req, res, next) {
    try {
      const users = await userService.fetchAll()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }
  async login (req, res, next) {
    try {
      const {email, password} = req.body
      const data = await userService.login(email, password)
      res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(data)
    } catch (e) {
      next(e)
    }
  }
  async logout (req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }
  async refresh (req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const data = await userService.refresh(refreshToken)
      res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(data)
    } catch (e) {
      next(e)
    }
  }
  async activate (req, res, next) {
    try {
      const link = req.params.link
      await userService.activate(link)
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()