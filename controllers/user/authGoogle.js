const generateToken = require('../../helpers/generateToken')

async function authGoogle(req, res) {
  try {
    const { user } = req._passport.session
    const token = await generateToken(user)
    res.status(200).redirect(`${process.env.CLIENT_URL}/auth/${token}`)
  } catch (error) {
    res.status(401).json({
      message: `Error authenticating via google ${error.message}`,
    })
  }
}

module.exports = authGoogle
