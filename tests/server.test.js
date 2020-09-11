const request = require('supertest')
const server = require('../api/server')
const mongoose = require('mongoose')

describe('index route', () => {
  it('it runs', async (done) => {
    const res = await request(server).get('/')
    expect(res.body).toEqual({ message: 'API is up 🚀' })
    expect(res.status).toBe(200)
    done()
  })
  it('it returns URL cannot be found', async () => {
    const res = await request(server).get('/server/auth')
    expect(res.body).toEqual({ message: 'This URL can not be found' })
    expect(res.status).toBe(404)
  })
})

afterAll(async () => {
  try {
    await mongoose.connection.collections.users.drop()
    await mongoose.disconnect()
  } catch (error) {
    console.error(error.name, error.message)
  }
})
