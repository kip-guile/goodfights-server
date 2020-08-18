const Fight = require('../../models/fights')
const { validateFight } = require('../../middleware/validateFight')

async function editFight(req, res) {
  const { errors, valid } = validateFight(req.body)
  if (!valid) return res.status(400).json(errors)
  const fightId = req.params.fight_id
  const newFightDetails = {
    title: req.body.title,
    description: req.body.description,
    avatar: req.body.avatar,
    rating: req.body.rating,
    division: req.body.division,
    title_fight: req.body.title_fight,
    fighters: req.body.fighters,
  }
  try {
    const fight = await Fight.findById({ _id: fightId })
    if (!fight) {
      return res.status(404).json({ message: 'no fight with id found' })
    }
    const updatedFight = await Fight.findOneAndUpdate(
      { _id: fightId },
      { $set: newFightDetails },
      { new: true }
    )
    return res.status(200).json(updatedFight)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = editFight
