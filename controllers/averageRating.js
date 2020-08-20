const AverageRating = require('../models/averageRating')

async function addRating(newRating, fightId) {
  try {
    const avgRating = await AverageRating.findOne({ fightId: fightId })
    if (!avgRating) {
      const report = new AverageRating({
        fightId: fightId,
        averageRating: newRating,
        numberOfRatings: 1,
      })
      report.save().then((avg) => {
        return { average: avg }
      })
    } else {
      const newAverage =
        (avgRating.averageRating * avgRating.numberOfRatings + newRating) /
        (avgRating.numberOfRatings + 1)
      const newNumberOfRatings = avgRating.numberOfRatings + 1

      const report = await AverageRating.updateOne(
        { fightId: fightId },
        {
          $set: {
            averageRating: newAverage,
            numberOfRatings: newNumberOfRatings,
          },
        }
      )
      return res.json({ average: report.averageRating })
    }
  } catch (err) {
    return { message: err.message }
  }
}

module.exports = addRating
