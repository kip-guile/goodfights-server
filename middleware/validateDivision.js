const { isEmpty } = require('../helpers/isEmpty')

exports.validateDivision = (data) => {
  const errors = {}
  let { name } = data

  if (isEmpty(name)) errors.name = 'Division name is required'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
}
