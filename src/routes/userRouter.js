const Router = require('express')
const UserController = require('../controllers/userController')
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'

const router = new Router()

router.post('register', UserController.register)

module.exports = router