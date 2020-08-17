const Fighter = require('../../models/fighters')

async function getSingleFighters(req, res) {
  try {
    const fighters = await Fighter.findById(req.params.fighter_id)
    if (!fighters) {
      return res.status(404).json({ message: 'Fighter with id doesnt exist' })
    }
    return res.status(200).json(fighters)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = getSingleFighters
