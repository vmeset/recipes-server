require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/index')
const cookieParser = require('cookie-parser')
const path = require('path')

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, '../uploads')))

async function startApp() {
  try {
      await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
      app.listen(PORT, () => console.log(`port ${PORT}`))
  } catch (e) {
      console.log(e)
  }
}

startApp()