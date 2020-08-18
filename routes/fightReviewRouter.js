const router = require('express').Router()
const {
  addReview,
  editReview,
  getSingleReview,
  getReviews,
  deleteReview,
} = require('../controllers/fightReviews/index')
const verifyToken = require('../middleware/verifyToken')

// @route POST /api/reviews/
// @desc Add a Review
// @access Private
router.post('/', verifyToken, addReview)

// @route GET /api/reviews/
// @desc Get all reviews
// @access Private
router.get('/', verifyToken, getReviews)

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
