const User = require('../../models/users')
const FightReviews = require('../../models/fightReviews')

async function deleteAccount(req, res) {
  const { sub } = req.decodedToken

  try {
    const user = await User.findOne({ _id: sub })
    if (!user) {
      return res
        .status(404)
        .json({ message: 'No user associated with this account' })
    }
    const fightReviews = await FightReviews.findOne({ userId: sub })
    if (fightReviews) {
      await FightReviews.deleteMany({ userId: sub })
    }
    await User.deleteOne({ _id: sub })
    return res.status(200).json({ message: 'user account deleted' })
  } catch {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = deleteAccount
