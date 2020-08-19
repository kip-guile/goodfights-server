const Fighter = require('../../models/fighters')
const { validateNewFighter } = require('../../middleware/validateFighter')

async function editFighter(req, res) {
  const { errors, valid } = validateNewFighter(req.body)
  if (!valid) return res.status(400).json(errors)
  const fighterId = req.params.fighter_id
  const newFighterDetails = {
    name: req.body.name,
    nickname: req.body.nickname,
    avatar: req.body.avatar,
    rating: req.body.rating,
    division: req.body.division,
  }
  try {
    const fighter = await Fighter.findById({ _id: fighterId })
    if (!fighter) {
      return res.status(404).json({ message: 'no fighter found' })
    }
    const updatedFighter = await Fighter.findOneAndUpdate(
      { _id: fighterId },
      { $set: newFighterDetails },
      { new: true }
    )
    return res.status(200).json({ message: 'user updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = editFighter
