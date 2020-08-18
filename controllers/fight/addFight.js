const Fight = require('../../models/fights')
const { validateFight } = require('../../middleware/validateFight')

async function addFight(req, res) {
  const { errors, valid } = validateFight(req.body)
  if (!valid) return res.status(400).json(errors)
  const {
    title,
    description,
    avatar,
    rating,
    title_fight,
    division,
    fighters,
  } = req.body
  try {
    const fight = await Fight.findOne({ title })
    if (fight) {
      return res.status(404).json({ message: 'Fight already exists' })
    }
    const newFight = new Fight({
      title,
      description,
      avatar,
      rating,
      title_fight,
      division,
      fighters,
    })
    newFight.save().then((fight) => {
      return res.status(201).json(fight)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = addFight
