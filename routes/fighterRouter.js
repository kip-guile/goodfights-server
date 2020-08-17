const router = require('express').Router()
const {
  createFighter,
  getFighters,
  getSingleFighter,
  editFighter,
} = require('../controllers/fighter/index')
const verifyToken = require('../middleware/verifyToken')

// @route POST /api/fighters/
// @desc Add a fighter
// @access Private
router.post('/', verifyToken, createFighter)

// @route GET /api/fighters/
// @desc Get all fighters
// @access Private
router.get('/', verifyToken, getFighters)

// @route PUT /api/fighters/:fighter_id
// @desc Edit a fighter's details
// @access Private
router.put('/:fighter_id', verifyToken, editFighter)

// @route GET /api/fighters/:fighter_id
// @desc Get a single fighter
// @access Private
router.get('/:fighter_id', verifyToken, getSingleFighter)

module.exports = router
