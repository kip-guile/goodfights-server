const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  let token
  if (req.headers.authorization) {
    token = req.headers.authorization
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: err.message, general: 'Invalid token' })
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    return res.status(403).json({ error: 'Unauthorized, no token provided' })
  }
}

module.exports = verifyToken
