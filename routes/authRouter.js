const router = require('express').Router()
const userController = require('../controllers/user/index')
const verifyToken = require('../middleware/verifyToken')
const googlePassport = require('../helpers/googlePassport')
const { completeGoogleAuth } = require('../controllers/user/completeGoogleAuth')

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', userController.register)

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', userController.login)

// @route POST api/auth/delete
// @desc Delete user account, also deletes all user reviews
// @access Public
router.delete('/account', verifyToken, userController.deleteAccount)

// @route POST api/auth/confirmation/:token
// @desc Confirm user email
// @access Public
router.get('/confirmation/:token', userController.emailConfirmation)

// @route GET api/auth/google
// @desc Authorize with google
// @access Public
router.get(
  '/google',
  googlePassport.Passport.authenticate('google', {
    scope: ['openid email profile'],
  })
)

// @route GET api/auth/callback
// @desc save user data or login with google auth
// @access Public
router.get(
  '/google/callback',
  googlePassport.Passport.authenticate('google', {
    failureRedirect: `http://localhost:3000/`,
  }),
  userController.authGoogle
)

// @route POST api/auth/google/:token
// @desc complete google auth
// @access Public
router.post('/google/:token', completeGoogleAuth)

module.exports = router
