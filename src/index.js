import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const PORT = 5000

const app = express()

app.use(express.json())
app.use(cors())

app.listen(PORT, () => console.log(`server started at ${PORT}`))