const mongoose = require('mongoose')

const fighterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  nickname: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  rating: {
    type: Number,
  },
  division: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Division',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
})

const Fighter = mongoose.model('fighter', fighterSchema)
module.exports = Fighter
