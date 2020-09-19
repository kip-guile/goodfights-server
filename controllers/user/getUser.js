const Users = require('../../models/users')

async function getUser(req, res) {
  const id = req.decodedToken.subject

  try {
    const user = await Users.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'User with id doesnt exist' })
    }
    return res.status(200).json({
      id: user.id,
      email: user.email,
      username: user.username,
      admin: user.admin,
    })
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = getUser
