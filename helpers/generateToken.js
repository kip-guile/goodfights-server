const jwt = require('jsonwebtoken')
const generateToken = (user) => {
  const payload = {
    subject: user.id,
    email: user.email,
    username: user.username,
    admin: user.admin,
  }
  const options = {
    expiresIn: '1d',
  }
  const result = jwt.sign(payload, process.env.JWT_SECRET, options)
  return result
}

module.exports = generateToken
