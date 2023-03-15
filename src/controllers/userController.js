const UserModel = require('../models/Users.js')

class UserController {
  async register (req, res, next) {
    try {
      const {username, password} = req.body
      const user = await UserModel.findOne({username})
      res.json(user)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new UserController()