const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: { type: String, required: true },
  bio: { type: String, required: false },
  location: { type: String, required: false },
  username: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
})

const User = mongoose.model('user', userSchema)
module.exports = User
