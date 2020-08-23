const router = require('express').Router()
const {
  addFight,
  getFights,
  getSingleFight,
  editFight,
  deleteFight,
  getFightFighters,
} = require('../controllers/fight/index')
const { getHighestRatedFights } = require('../controllers/averageRating')
const verifyToken = require('../middleware/verifyToken')

// @route POST /api/fights/
// @desc Add a fight
// @access Private
router.post('/', verifyToken, addFight)

// @route GET /api/fights/
// @desc Get all fights
// @access Private
router.get('/', verifyToken, getFights)

// @route GET /api/fights/fighters
// @desc Get fighters of a fight
// @access Private
router.get('/fighters/:fight_id', verifyToken, getFightFighters)

// @route GET /api/fights/highestrated
// @desc Get highest rated fights (limit 10)
// @access Private
router.get('/highestrated', verifyToken, getHighestRatedFights)

// @route PUT /api/fights/:fight_id
// @desc Edit a fight's details
// @access Private
router.put('/:fight_id', verifyToken, editFight)

// @route GET /api/fights/:fight_id
// @desc Get a single fight
// @access Private
router.get('/:fight_id', verifyToken, getSingleFight)

// @route DELETE /api/fights/:fight_id
// @desc Delete a single fight
// @access Private
router.delete('/:fight_id', verifyToken, deleteFight)

module.exports = router
