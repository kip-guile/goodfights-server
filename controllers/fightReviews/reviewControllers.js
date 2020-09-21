const Reviews = require('../../models/fightReviews')
const Fight = require('../../models/fights')
const Users = require('../../models/users')
const { validateReviews } = require('../../middleware/validateReviews')

async function addReview(req, res, next) {
  const { errors, valid } = validateReviews(req.body)
  if (!valid) return res.status(400).json(errors)
  const { subject } = req.decodedToken
  const fightId = req.params.fight_id
  const userId = subject
  const { divisionId, review, rating } = req.body
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
      req.review = review
      req.rating = rating
      req.fightId = fightId
      next()
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function getReviews(req, res) {
  try {
    let arr = []
    let fightarr = []
    let userarr = []
    const reviews = await Reviews.find({}).lean()
    const fights = await Fight.find({}).lean()
    const users = await Users.find({}).lean()
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found' })
    }
    fights.forEach((fight) => {
      fightarr.push(fight)
    })
    users.forEach((user) => {
      userarr.push(user)
    })
    reviews.forEach((review) => {
      let temp = review
      temp.reviewer = userarr.filter(
        (user) => user._id.toString() === temp.userId.toString()
      )

      temp.fight = fightarr.filter(
        (fight) => fight._id.toString() === temp.fightId.toString()
      )
      arr.push(temp)
    })
    let output = []
    arr.forEach((review) => {
      let construct = {
        id: review._id,
        reviewer_name: review.reviewer[0].username,
        fightId: review.fightId,
        description: review.review,
        rating: review.rating,
        posted_at: review.created_at,
        fight_title: review.fight[0].title,
        fight_avatar: review.fight[0].avatar,
        fight_desc: review.fight[0].description,
        fight_rating: review.fight[0].rating,
      }
      output.push(construct)
    })
    return res.status(200).json(output)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getFightReviews(req, res) {
  try {
    const reviews = await Reviews.find().where({ fightId: req.params.fight_id })
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found' })
    }
    return res.status(200).json(reviews)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getUserReviews(req, res) {
  const { subject } = req.decodedToken
  try {
    const reviews = await Reviews.find({ userId: subject })
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found' })
    }
    return res.status(200).json(reviews)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getHighestRatedUserReviews(req, res) {
  const { subject } = req.decodedToken
  try {
    const reviews = await Reviews.find({ userId: subject })
      .sort({ rating: 'desc' })
      .limit(5)
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
  getUserReviews,
  getHighestRatedUserReviews,
  getFightReviews,
}
