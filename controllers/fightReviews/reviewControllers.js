const Reviews = require('../../models/fightReviews')
const { validateReviews } = require('../../middleware/validateReviews')

async function addReview(req, res) {
  const { errors, valid } = validateReviews(req.body)
  if (!valid) return res.status(400).json(errors)
  const { userId, fightId, divisionId, review, rating } = req.body
  try {
    const queriedreview = await Reviews.findOne({ userId, fightId })
    if (queriedreview) {
      return res.status(404).json({ message: 'Already reviewed this fight' })
    }
    const newReview = new Reviews({
      userId,
      fightId,
      divisionId,
      review,
      rating,
    })
    newReview.save().then((review) => {
      return res.status(201).json(review)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function getReviews(req, res) {
  try {
    const reviews = await Reviews.find({})
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found' })
    }
    return res.status(200).json(reviews)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getSingleReview(req, res) {
  try {
    const review = await Reviews.findById(req.params.review_id)
    if (!review) {
      return res.status(404).json({ message: 'Review with id doesnt exist' })
    }
    return res.status(200).json(review)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function editReview(req, res) {
  const { errors, valid } = validateReviews(req.body)
  if (!valid) return res.status(400).json(errors)
  const reviewId = req.params.review_id
  const newReviewDetails = {
    userId: req.body.userId,
    fightId: req.body.fightId,
    divisionId: req.body.divisionId,
    review: req.body.review,
    rating: req.body.rating,
  }
  try {
    const review = await Reviews.findById({ _id: reviewId })
    if (!review) {
      return res.status(404).json({ message: 'no review found' })
    }
    const updatedReview = await Reviews.findOneAndUpdate(
      { _id: reviewId },
      { $set: newReviewDetails },
      { new: true }
    )
    return res.status(200).json(updatedReview)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function deleteReview(req, res) {
  const reviewId = req.params.review_id

  try {
    const review = await Reviews.findOne({ _id: reviewId })
    if (!review) {
      return res
        .status(404)
        .json({ message: 'No review associated with this id' })
    }
    await Reviews.deleteOne({ _id: reviewId })
    return res.status(200).json({ message: 'review deleted' })
  } catch {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = {
  addReview,
  getReviews,
  getSingleReview,
  editReview,
  deleteReview,
}
