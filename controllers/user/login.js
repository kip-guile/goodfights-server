const Users = require('../../models/users')
const bcrypt = require('bcryptjs')
const generateToken = require('../../helpers/generateToken')
const { validateLoginData } = require('../../middleware/validateUserData')

async function login(req, res) {
  const { errors, valid } = validateLoginData(req.body)
  if (!valid) return res.status(400).json(errors)
  const { email, password } = req.body

  try {
    const user = await Users.findOne({ email })
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          admin: user.admin,
        },
        token,
      })
    } else {
      return res.status(403).json({ general: 'Wrong credentials, try again' })
    }
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = login
