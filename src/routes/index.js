const express = require('express')
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'
const userRouter = require('./userRouter')
// const userRouter = require('./userRouter')

const router = new express.Router()

router.use('/user', userRouter)

module.exports = router