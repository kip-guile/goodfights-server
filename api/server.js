require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoURI = require('../config/keys')
const mongoose = require('mongoose')

const authRouter = require('../routes/authRouter')
const fighterRouter = require('../routes/fighterRouter')
const divisionRouter = require('../routes/divisionRouter')
const fightRouter = require('../routes/fightRouter')
const fightReviewRouter = require('../routes/fightReviewRouter')

const server = express()
server.use(helmet())
server.use(logger)
server.use(express.json())
server.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
)

server.use('/api/auth', authRouter)
server.use('/api/fighters', fighterRouter)
server.use('/api/divisions', divisionRouter)
server.use('/api/fights', fightRouter)
server.use('/api/reviews', fightReviewRouter)

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB plugged in just fine ...'))
  .catch((err) => console.log(err))

server.get('/', (req, res) => {
  return res.status(200).json({ message: 'API is up 🚀' })
})

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`)
  next()
}

server.all('*', (req, res) => {
  res.status(404).json({ message: 'This URL can not be found' })
})

module.exports = server
