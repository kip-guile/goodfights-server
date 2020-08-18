const router = require('express').Router()
const userController = require('../controllers/user/index')
const verifyToken = require('../middleware/verifyToken')

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

module.exports = router
