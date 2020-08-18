const Fight = require('../../models/fights')

async function deleteFight(req, res) {
  const fightId = req.params.fight_id

  try {
    const fight = await Fight.findOne({ _id: fightId })
    if (!fight) {
      return res
        .status(404)
        .json({ message: 'No fight associated with this id' })
    }
    await Fight.deleteOne({ _id: fightId })
    return res.status(200).json({ message: 'fight deleted' })
  } catch {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = deleteFight
