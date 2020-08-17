const router = require('express').Router()
const fightController = require('../controllers/fight/index')
const authenticateMiddleware = require('../middleware/verifyToken')

router.post('/')
