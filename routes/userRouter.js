const router = require('express').Router()
const {
  getUserReviews,
  getHighestRatedUserReviews,
} = require('../controllers/fightReviews/index')
const verifyToken = require('../middleware/verifyToken')
const { editAccount, getUserFighters } = require('../controllers/user/index')

// @route PUT /api/users/
// @desc Edit user details
// @access Private
router.put('/', verifyToken, editAccount)

// @route GET /api/users/reviews/
// @desc Get all reviews by a user
// @access Private
router.get('/reviews', verifyToken, getUserReviews)

// @route GET /api/reviews/
// @desc Get all reviews
// @access Private
router.get('/reviews/highestrated', verifyToken, getHighestRatedUserReviews)

// @route GET /api/users/fighters/
// @desc Get user's fav fighters
// @access Private
router.get('/fighters', verifyToken, getUserFighters)

module.exports = router
