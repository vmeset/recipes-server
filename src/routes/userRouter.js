const Router = require('express')
const {body} = require('express-validator')
const userController = require('../controllers/userController')
const imgMiddleware = require('../middleware/imgMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/register', 
imgMiddleware.single('avatar'),
  body('email').isEmail(),
  body('password').isLength({min: 4, max: 16}),
  userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/fetch', authMiddleware, userController.fetchAll)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

module.exports = router