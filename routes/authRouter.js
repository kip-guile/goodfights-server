const router = require('express').Router()
const userController = require('../controllers/user/index')

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', userController.register)

module.exports = router
