const mongoose = require('mongoose')

const averageFightRatingSchema = mongoose.Schema({
  fightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fight',
    required: true,
  },
  averageRating: { type: Number },
  numberOfRatings: { type: Number },
})

const averageFightRating = mongoose.model(
  'averageFightRating',
  averageFightRatingSchema
)
module.exports = averageFightRating
