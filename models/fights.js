const mongoose = require('mongoose')

const fightSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fighters: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fighter',
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
})

const Fight = mongoose.model('fight', fightSchema)
module.exports = Fight
