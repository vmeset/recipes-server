const Router = require('express')
const UserController = require('../controllers/userController')
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'

const router = new Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/fetch', UserController.getAll)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)

module.exports = router