const Fights = require('../../models/fights')

async function getFights(req, res) {
  try {
    const fights = await Fights.find({})
    if (fights.length === 0) {
      return res.status(404).json({ message: 'No fights found' })
    }
    return res.status(200).json(fights)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = getFights
