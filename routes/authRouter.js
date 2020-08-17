const router = require('express').Router()
const userController = require('../controllers/user/index')

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', userController.register)

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', userController.login)

module.exports = router
