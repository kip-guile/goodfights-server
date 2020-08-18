const Division = require('../../models/division')
const { validateDivision } = require('../../middleware/validateDivision')

async function addDivision(req, res) {
  const { errors, valid } = validateDivision(req.body)
  if (!valid) return res.status(400).json(errors)
  const { name } = req.body
  try {
    const division = await Division.findOne({ name })
    if (division) {
      return res.status(404).json({ message: 'Division already exists' })
    }
    const newDivision = new Division({
      name,
    })
    newDivision.save().then((division) => {
      return res.status(201).json(division)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function getDivisions(req, res) {
  try {
    const divisions = await Division.find({})
    if (divisions.length === 0) {
      return res.status(404).json({ message: 'No divisions found' })
    }
    return res.status(200).json(divisions)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function editDivision(req, res) {
  const { errors, valid } = validateDivision(req.body)
  if (!valid) return res.status(400).json(errors)
  const divisionId = req.params.division_id
  const newDivisionDetails = {
    name: req.body.name,
  }
  try {
    const division = await Division.findById({ _id: divisionId })
    if (!division) {
      return res.status(404).json({ message: 'no division found' })
    }
    const updatedDivision = await Division.findOneAndUpdate(
      { _id: divisionId },
      { $set: newDivisionDetails },
      { new: true }
    )
    return res.status(200).json(updatedDivision)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { addDivision, getDivisions, editDivision }
