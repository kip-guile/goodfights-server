const AverageRating = require('../models/averageRating')
const Fight = require('../models/fights')

async function addRating(req, res) {
  try {
    const avgRating = await AverageRating.findOne({ fightId: req.fightId })
    if (!avgRating) {
      const report = new AverageRating({
        fightId: req.fightId,
        averageRating: req.rating,
        numberOfRatings: 1,
      })
      report.save().then((avg) => {
        return res
          .status(201)
          .json({ average: avg.averageRating, review: req.review })
      })
    } else {
      const newAverage =
        (avgRating.averageRating * avgRating.numberOfRatings + req.rating) /
        (avgRating.numberOfRatings + 1)
      const newNumberOfRatings = avgRating.numberOfRatings + 1

      const report = await AverageRating.updateOne(
        { fightId: req.fightId },
        {
          $set: {
            averageRating: newAverage,
            numberOfRatings: newNumberOfRatings,
          },
        }
      )
      return res.status(201).json({ avg: newAverage, review: req.review })
    }
  } catch (err) {
    return { message: err.message }
  }
}

async function getHighestRatedFights(req, res) {
  let arr = []
  try {
    const fights = await AverageRating.find()
      .lean()
      .sort({ averageRating: 'desc' })
      .limit(10)
    fights.forEach((item) => {
      arr.push(item.fightId.toString())
    })
    if (arr.length === 0) {
      return res.status(404).json({ message: 'No fights found' })
    }
    const fightArray = await Fight.find().where('_id').in(arr).exec()
    if (!fightArray)
      return res
        .status(500)
        .json({ message: 'error retrieving highest rated fights' })
    return res.status(200).json(fightArray)
  } catch (err) {
    return { message: err.message }
  }
}

module.exports = { addRating, getHighestRatedFights }
