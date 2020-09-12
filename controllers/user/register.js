const Users = require('../../models/users')
const bcrypt = require('bcryptjs')
const generateToken = require('../../helpers/generateToken')
const { validateSignUpData } = require('../../middleware/validateUserData')
const sendEmail = require('../../helpers/sendEmail')
const { welcomeText } = require('../../helpers/constants')
const confirmEmail = require('../../templates/confirmEmail')

const register = (req, res) => {
  const { errors, valid } = validateSignUpData(req.body)
  if (!valid) return res.status(400).json(errors)
  const { email, password, username, admin } = req.body
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
      admin,
    })

    //Hash password
    const hash = bcrypt.hashSync(newUser.password, 10)
    newUser.password = hash
    newUser
      .save()
      .then((user) => {
        const token = generateToken(user)
        const emailToken = generateToken(user, process.env.EMAIL_SECRET)
        sendEmail(welcomeText, email, confirmEmail(username, emailToken), null)
        return res.status(201).json({
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            admin: user.admin,
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
