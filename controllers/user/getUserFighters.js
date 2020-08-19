const User = require('../../models/users')
const Fighter = require('../../models/fighters')
const { isArrayEmpty } = require('../../helpers/isEmpty')

async function getUserFighters(req, res) {
  const { subject } = req.decodedToken

  try {
    const user = await User.findById(subject, 'fighters').lean()
    if (!user) {
      return res
        .status(404)
        .json({ message: 'No user associated with this account' })
    }
    const fighters = user.fighters
    if (isArrayEmpty(fighters)) {
      return res.status(404).json({ message: 'user has no fighters' })
    }
    const fighterRes = await Fighter.find().where('_id').in(fighters).exec()
    if (!fighterRes) {
      return res.status(500).json({ message: 'error retrieving fighters' })
    }
    return res.status(200).json(fighterRes)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = getUserFighters
