const request = require('supertest')
const server = require('../../api/server')
const User = require('../../models/users')

async function clearDb() {
  await User.deleteMany({})
}

beforeAll(async () => {
  try {
    await clearDb()
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('loginSeller', () => {
  it('expects Password field is required error message', async () => {
    const res = await request(server).post('/api/auth/login').send({
      email: 'harry@dresden.com',
      password: '',
    })
    expect(res.status).toBe(400)
    expect(res.body).toEqual({
      password: 'Password must have up to six characters',
    })
  })
  it('expects Password length is not less than 6', async () => {
    const res = await request(server).post('/api/auth/login').send({
      email: 'harry@dresden.com',
      password: '123456',
    })
    expect(res.status).toBe(403)
    expect(res.body).toEqual({
      general: 'Wrong credentials, try again',
    })
  })
  it('expects email is invalid error message ', async () => {
    const res = await request(server).post('/api/auth/login').send({
      email: 'ha.com',
      password: '123456',
    })
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ email: 'Email must be valid' })
  })
  it('checks if user has been logged in successfully with a token being returned', async () => {
    await request(server).post('/api/auth/register').send({
      email: 'harry@dresden.com',
      username: 'harrydresden',
      password: '123456',
      confirmPassword: '123456',
      admin: true,
    })
    const res = await request(server).post('/api/auth/login').send({
      email: 'harry@dresden.com',
      password: '123456',
    })

    const { token } = res.body
    expect(res.status).toBe(200)
    expect(token).toBeDefined()
  })
})
