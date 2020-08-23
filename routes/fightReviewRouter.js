const router = require('express').Router()
const {
  addReview,
  editReview,
  getSingleReview,
  getReviews,
  deleteReview,
  getFightReviews,
} = require('../controllers/fightReviews/index')
const { addRating } = require('../controllers/averageRating')
const verifyToken = require('../middleware/verifyToken')

// @route GET /api/reviews/
// @desc Get all reviews
// @access Private
router.get('/', verifyToken, getReviews)

// @route GET /api/reviews/fight_id
// @desc Get reviews related to a fight
// @access Private
router.get('/:fight_id', verifyToken, getFightReviews)

// @route POST /api/reviews/fight_id
// @desc Add a Review
// @access Private
router.post('/:fight_id', verifyToken, addReview, addRating)

// @route PUT /api/reviews/:review_id
// @desc Edit a review's details
// @access Private
router.put('/:review_id', verifyToken, editReview)

// @route GET /api/reviews/:review_id
// @desc Get a single review
// @access Private
router.get('/:review_id', verifyToken, getSingleReview)

// @route DELETE /api/reviews/:review_id
// @desc Delete a single review
// @access Private
router.delete('/:review_id', verifyToken, deleteReview)

module.exports = router
