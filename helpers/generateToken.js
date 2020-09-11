const jwt = require('jsonwebtoken')
const generateToken = (user, secret = process.env.JWT_SECRET) => {
  const payload = {
    subject: user.id,
    email: user.email,
    username: user.username,
    admin: user.admin,
  }
  const options = {
    expiresIn: '1d',
  }
  const result = jwt.sign(payload, secret, options)
  return result
}

module.exports = generateToken
