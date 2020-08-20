const AverageRating = require('../models/averageRating')

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

module.exports = addRating
