const Users = require('../../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/users')

async function login(req, res) {
  let token = req.params.token
  try {
    const { subject } = jwt.verify(token, process.env.EMAIL_SECRET, null)
    const user = await Users.findById({ _id: subject })
    if (!user) {
      return res.status(404).json({ message: 'no user found' })
    }
    const update = await User.findOneAndUpdate(
      { _id: subject },
      { confirmed: true },
      { new: true }
    )
    return res.status(201).json({ message: 'confirmed' })
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = login
