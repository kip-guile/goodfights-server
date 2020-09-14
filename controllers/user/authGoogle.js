const generateToken = require('../../helpers/generateToken')

exports.authGoogle = async (req, res) => {
  try {
    const { user } = req._passport.session
    const token = await generateToken(user)
    res.status(200).redirect(`http://localhost:5000/${token}`)
  } catch (error) {
    res.status(401).json({
      message: `Error authenticating via google ${error.message}`,
    })
  }
}
