const userModel = require('../models/userModel')

class UserController {
  async register (req, res, next) {
    try {
      const {username, password} = req.body
      const user = await userModel.findOne({username})
      if(user) {
        return res.json('user already exists')
      }
      res.json(user)
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