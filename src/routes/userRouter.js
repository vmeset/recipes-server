const Router = require('express')
const UserController = require('../controllers/userController')
const imgMiddleware = require('../middleware/imgMiddleware')

const router = new Router()

router.post('/register', imgMiddleware.single('avatar'), UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/fetch', UserController.getAll)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)

module.exports = router