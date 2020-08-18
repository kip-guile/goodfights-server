const { isEmpty, isArrayEmpty } = require('../helpers/isEmpty')

exports.validateFight = (data) => {
  const errors = {}
  let { title, description, division, fighters } = data
  title = title || ''
  description = description || ''
  division = division || ''
  fighters = fighters || []

  if (isEmpty(title)) errors.title = 'Fight name is required'
  if (isEmpty(description)) errors.description = 'Fight description is required'
  if (isEmpty(division)) errors.division = 'Fight division is required'
  if (isArrayEmpty(fighters)) errors.fighters = 'Fighters are required'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
}
