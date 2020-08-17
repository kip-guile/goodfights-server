const { isEmpty, isArrayEmpty } = require('../helpers/isEmpty')

exports.validateNewFighter = (data) => {
  const errors = {}
  let { name, nickname, division } = data
  name = name || ''
  nickname = nickname || ''
  division = division || []

  if (isEmpty(name)) errors.name = 'Fighter name is required'
  if (isEmpty(nickname)) errors.name = 'Fighter nickname is required'
  // if (isArrayEmpty(division)) errors.division = 'A division is required'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
}
