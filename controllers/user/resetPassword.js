const Users = require('../../models/users')
const jwt = require('jsonwebtoken')
const { welcomeText } = require('../../helpers/constants')
const emailTemplate = require('../../templates/resetPassword')
const sendEmail = require('../../helpers/sendEmail')

async function resetPassword(req, res) {
  //   const { errors, valid } = validateLoginData(req.body)
  //   if (!valid) return res.status(400).json(errors)
  const { email } = req.body

  try {
    const user = await Users.findOne({ email })

    if (user) {
      const token = jwt.sign({ _id: user.id }, process.env.RESET_PASSWORD_KEY, {
        expiresIn: '20m',
      })
      return user.updateOne({ resetLink: token }, function (err, success) {
        if (err) {
          return res.status(400).json({ error: 'reset password link error' })
        } else {
          sendEmail(welcomeText, email, emailTemplate(user.username, token))
          return res.status(200).json({ message: 'email sent' })
        }
      })
    } else {
      return res
        .status(400)
        .json({ error: 'User with this email doesnt exist' })
    }
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = resetPassword
