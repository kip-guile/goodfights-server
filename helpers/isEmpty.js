const isEmpty = (string) => {
  if (string.trim() === '') return true
  else return false
}

const isArrayEmpty = (arr) => {
  if (arr.length <= 0) return true
  return false
}

module.exports = { isEmpty, isArrayEmpty }
