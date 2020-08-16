const Users = require('../../models/users')
const bcrypt = require('bcryptjs')
const generateToken = require('../../helpers/generateToken')
const { validateSignUpData } = require('../../middleware/validateUserData')

const register = (req, res) => {
  const { errors, valid } = validateSignUpData(req.body)
  if (!valid) return res.status(400).json(errors)
  const { email, password, username } = req.body
  //check if user exists
  Users.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({
        message: 'User already exists',
      })
    const newUser = new Users({
      email,
      password,
      username,
    })

    //Hash password
    const hash = bcrypt.hashSync(newUser.password, 10)
    newUser.password = hash
    newUser
      .save()
      .then((user) => {
        const token = generateToken(user)
        return res.status(201).json({
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
          token,
        })
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message })
      })
  })
}

module.exports = register
