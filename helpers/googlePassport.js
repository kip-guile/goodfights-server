require('dotenv').config()
const User = require('../models/users')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { reduceUserDetails } = require('../middleware/validateUserData')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      const googleEmail = profile.emails[0].value
      const encryptedId = bcrypt.hashSync(profile.id, 10)
      User.findOne({ email: googleEmail })
        .then((user) => {
          if (user) {
            done(null, user)
          } else {
            const newUser = new User({
              email: googleEmail,
              password: encryptedId,
              username: profile.displayName,
              admin: false,
              confirmed: true,
            })
            newUser
              .save()
              .then((user) => {
                done(null, user)
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          return res.status(500).json(err.message)
        })
    }
  )
)

module.exports = { Passport: passport }
