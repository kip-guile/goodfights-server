const User = require('../../models/users')
const jwt = require('jsonwebtoken')

exports.completeGoogleAuth = async (req, res) => {
  try {
    const { token } = req.params
    const decodedToken = jwt.decode(token)
    const userId = decodedToken.subject
    const user = await User.findOne({ _id: userId })
    res.status(200).json({
      message: `Welcome. You're logged in!`,
      data: { token, user: user },
    })
  } catch (error) {
    res.status(401).json({ message: `Failed to complete authorization` })
  }
}
