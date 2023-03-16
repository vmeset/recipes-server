const userModel = require('../models/userModel')
const fs = require('fs')

class UserController {
  async register (req, res, next) {
    try {
      const {username, password, email} = req.body
      const newUser = new userModel({
        username,
        password,
        avatar: {
          data: req.file.filename,
          contentType: 'image/png'
        }
      })
      console.log('test')
      // console.log(newUser)
      newUser.save()
      // const newUser = await userModel.create({username, password, email
        // avatar: {
        //   data: req.file.filename,
        //   contentType: 'image/png'
        // }
      // })

      // return res.json(newUser)
      
      res.json(newUser)

      // const user = await userModel.findOne({username})
      // if(user) {
      //   return res.json('user already exists')
      // }
      // res.json(user)
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