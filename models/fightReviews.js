const mongoose = require('mongoose')

const fightReviewSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fight',
    required: true,
  },
  divisionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Division',
    required: true,
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

fightReviewSchema.index({ fight: 1, user: 1 }, { unique: true })

const FighterReview = mongoose.model('fightReview', fightReviewSchema)
module.exports = FighterReview
