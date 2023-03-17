const userModel = require('../models/userModel')
const UserService = require('../services/userService')
const fs = require('fs')

class UserController {
  async register (req, res, next) {
    try {
      const {username, password, email} = req.body
      const avatar = {
        data: req.file.filename,
        contentType: 'image/png'
      }
      const data = await UserService.register(username, password, email, avatar)
      res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(data)
    } catch (e) {
      console.log(e)
    }
  }
  async getAll (req, res, next) {
    try {
      const users = await userModel.find()
      res.json(users)
    } catch (e) {
      console.log(e)
    }
  }
  async login (req, res, next) {
    try {

    } catch (e) {

    }
  }
  async logout (req, res, next) {
    try {

    } catch (e) {
      
    }
  }
  async refresh (req, res, next) {
    try {

    } catch (e) {
      
    }
  }
  async activate (req, res, next) {
    try {

    } catch (e) {
      
    }
  }
}

module.exports = new UserController()