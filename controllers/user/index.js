const register = require('./register')
const login = require('./login')
const deleteAccount = require('./deleteAccount')
const editAccount = require('./editAccount')
const getUserFighters = require('./getUserFighters')
const emailConfirmation = require('./emailConfirmation')
const authGoogle = require('./authGoogle')
const completeGoogleAuth = require('./completeGoogleAuth')
const resetPassword = require('./resetPassword')
const forgotPassword = require('./forgotPassword')

module.exports = {
  register,
  login,
  deleteAccount,
  editAccount,
  getUserFighters,
  emailConfirmation,
  authGoogle,
  completeGoogleAuth,
  resetPassword,
  forgotPassword,
}
