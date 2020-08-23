const Fight = require('../../models/fights')
const Fighters = require('../../models/fighters')

async function getSingleFight(req, res) {
  try {
    let arr = []
    const fightersArr = await Fight.findById(
      req.params.fight_id,
      'fighters'
    ).lean()
    if (!fightersArr) {
      return res.status(404).json({ message: 'Fight with id doesnt exist' })
    }
    fightersArr.fighters.forEach((fighterId) => {
      arr.push(fighterId.toString())
    })
    const fightersRes = await Fighters.find().where('_id').in(arr).exec()
    if (!fightersRes)
      return res.status(500).json({ message: 'error retrieving fighters' })
    return res.status(200).json(fightersRes)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = getSingleFight
