const Fighter = require('../../models/fighters')

async function deleteFighter(req, res) {
  const fighterId = req.params.fighter_id

  try {
    const user = await Fighter.findOne({ _id: fighterId })
    if (!user) {
      return res
        .status(404)
        .json({ message: 'No fighter associated with this id' })
    }
    await Fighter.deleteOne({ _id: fighterId })
    return res.status(200).json({ message: 'fighter deleted' })
  } catch {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = deleteFighter
