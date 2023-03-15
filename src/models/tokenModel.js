const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  refreshToken: {type: String, required: true}
})

module.exports = mongoose.model('tokenModel', TokenSchema)