const router = require('express').Router()
const {
  addFight,
  getFights,
  getSingleFight,
  editFight,
} = require('../controllers/fight/index')
const verifyToken = require('../middleware/verifyToken')

// @route POST /api/fights/
// @desc Add a fight
// @access Private
router.post('/', verifyToken, addFight)

// @route GET /api/fights/
// @desc Get all fights
// @access Private
router.get('/', verifyToken, getFights)

// @route PUT /api/fights/:fight_id
// @desc Edit a fight's details
// @access Private
router.put('/:fight_id', verifyToken, editFight)

// @route GET /api/fights/:fight_id
// @desc Get a single fight
// @access Private
router.get('/:fight_id', verifyToken, getSingleFight)

module.exports = router
