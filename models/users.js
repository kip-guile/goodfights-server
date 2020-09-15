const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  confirmed: { type: Boolean, default: false },
  admin: { type: Boolean, required: true, default: false },
  password: { type: String, required: true },
  bio: { type: String, required: false },
  location: { type: String, required: false },
  username: { type: String, required: true },
  website: { type: String, required: false },
  resetLink: {
    data: String,
    default: '',
  },
  fighters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fighter',
    },
  ],
  created_at: { type: Date, default: Date.now },
})

const User = mongoose.model('user', userSchema)
module.exports = User
