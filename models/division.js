const mongoose = require('mongoose')

const divisionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

const Division = mongoose.model('division', divisionSchema)
model.exports = Division
