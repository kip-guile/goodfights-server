const Users = require('../../models/users')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

function forgotPassword(req, res) {
  const { resetLink, newPass } = req.body

  if (resetLink) {
    jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function (
      error,
      decodedData
    ) {
      if (error) {
        return res.status(401).json({ error: 'Incorrect token or expired' })
      }
      Users.findOne({ resetLink }, (err, user) => {
        if (err || !user) {
          return res
            .status(400)
            .json({ error: 'User with this token doesnt exist' })
        }
        const hash = bcrypt.hashSync(newPass, 10)
        const obj = {
          password: hash,
          resetLink: '',
        }
        user = _.extend(user, obj)
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({ error: 'reset password error' })
          } else {
            return res.status(200).json({ message: 'password changed' })
          }
        })
      })
    })
  } else {
    return res.status(400).json({ error: 'Auth error' })
  }
}

module.exports = forgotPassword
