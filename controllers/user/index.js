const register = require('./register')
const login = require('./login')
const deleteAccount = require('./deleteAccount')
const editAccount = require('./editAccount')
const getUserFighters = require('./getUserFighters')
const emailConfirmation = require('./emailConfirmation')

module.exports = {
  register,
  login,
  deleteAccount,
  editAccount,
  getUserFighters,
  emailConfirmation,
}
