const router = require('express').Router()
const {
  addDivision,
  getDivisions,
  editDivision,
} = require('../controllers/division/index')
const verifyToken = require('../middleware/verifyToken')

// @route POST /api/divisions/
// @desc Add a division
// @access Private
router.post('/', verifyToken, addDivision)

// @route GET /api/divisions/
// @desc Get all divisions
// @access Private
router.get('/', verifyToken, getDivisions)

// @route PUT /api/divisions/:division_id
// @desc Edit a division's details
// @access Private
router.put('/:division_id', verifyToken, editDivision)

module.exports = router
