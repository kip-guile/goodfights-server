const Fighter = require('../../models/fighters')
const { validateNewFighter } = require('../../middleware/validateFighter')

async function createFighter(req, res) {
  const { errors, valid } = validateNewFighter(req.body)
  if (!valid) return res.status(400).json(errors)
  const { name, nickname, avatar, rating, division } = req.body
  try {
    const fighter = await Fighter.findOne({ name })
    if (fighter) {
      return res.status(404).json({ message: 'Fighter already exists' })
    }
    const newFighter = new Fighter({
      name,
      nickname,
      avatar,
      rating,
      division,
    })
    newFighter.save().then((fighter) => {
      return res.status(201).json(fighter)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = createFighter
