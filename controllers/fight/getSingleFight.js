const Fight = require('../../models/fights')

async function getSingleFight(req, res) {
  try {
    const fight = await Fight.findById(req.params.fight_id)
    if (!fight) {
      return res.status(404).json({ message: 'Fight with id doesnt exist' })
    }
    return res.status(200).json(fight)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = getSingleFight
