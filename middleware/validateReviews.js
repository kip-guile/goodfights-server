const { isEmpty, isArrayEmpty } = require('../helpers/isEmpty')

exports.validateReviews = (data) => {
  const errors = {}
  let { userId, fightId, divisionId, review } = data
  userId = userId || ''
  fightId = fightId || ''
  divisionId = divisionId || ''
  review = review || ''

  if (isEmpty(userId)) userId.title = 'UserId is required'
  if (isEmpty(fightId)) fightId.description = 'fightId is required'
  if (isEmpty(divisionId)) divisionId.division = 'divisionId is required'
  if (isArrayEmpty(review)) review.fighters = 'Review cant be empty'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
}
