const User = require('../../models/users')
const { validateEditUserData } = require('../../middleware/validateUserData')

async function editUser(req, res) {
  const { errors, valid } = validateEditUserData(req.body)
  if (!valid) return res.status(400).json(errors)
  const { subject } = req.decodedToken
  let { admin, bio, location, website, fighters } = req.body
  admin = admin || false
  bio = bio || ''
  location = location || ''
  website = website || ''
  fighters = fighters || []
  const newUserDetails = {
    name: req.body.name,
    username: req.body.username,
    avatar: req.body.avatar,
    rating: req.body.rating,
    division: req.body.division,
    admin: admin,
    bio: bio,
    location: location,
    fighters: fighters,
  }
  try {
    const user = await User.findById({ _id: subject })
    if (!user) {
      return res.status(404).json({ message: 'no user found' })
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: subject },
      { $set: newUserDetails },
      { new: true }
    )
    return res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = editUser
