const Fighter = require('../../models/fighters')

async function getFighters(req, res) {
  try {
    const fighters = await Fighter.find({})
    if (fighters.length === 0) {
      return res.status(404).json({ message: 'No fighters found' })
    }
    return res.status(200).json(fighters)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = getFighters
