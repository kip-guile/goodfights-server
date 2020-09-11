const request = require('supertest')
const server = require('../../api/server')
const User = require('../../models/users')
const { JsonWebTokenError } = require('jsonwebtoken')
const { italics } = require('../../config/keys')

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

beforeEach(() => {
  jest.setTimeout(10000)
})

describe('registerUser', () => {
  it('expects 400 response if no user register data', async () => {
    const res = await request(server).post('/api/auth/register')
    expect(res.status).toBe(500)
  })
  it('expects user already exists error message', async () => {
    await User.create({
      email: 'harry@dresden.com',
      password: '123456',
      username: 'harrydresden',
      admin: true,
    })
    const res = await request(server).post('/api/auth/register').send({
      email: 'harry@dresden.com',
      password: '123456',
      username: 'harrydresden',
      confirmPassword: '123456',
      admin: true,
    })
    expect(res.body).toEqual({ message: 'User already exists' })
  })
  it('expects Password field is required error message', async () => {
    const res = await request(server).post('/api/auth/register').send({
      email: 'harry@dresden.com',
      username: 'harrydresden',
      password: '',
      confirmPassword: '',
      admin: true,
    })
    expect(res.status).toBe(400)
    expect(res.body).toEqual({
      password: 'Password must have up to six characters',
    })
  })
  it('expects Password length is not less than 6', async () => {
    const res = await request(server).post('/api/auth/register').send({
      email: 'harry@dresden.com',
      password: '126',
      confirmPassword: '126',
      username: 'harrydresden',
      admin: true,
    })
    expect(res.status).toBe(400)
    expect(res.body).toEqual({
      password: 'Password must have up to six characters',
    })
  })
  it('expects email is invalid error message ', async () => {
    const res = await request(server).post('/api/auth/register').send({
      email: 'harry',
      password: '12345678',
      confirmPassword: '12345678',
      username: 'harrydresden',
      admin: true,
    })
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ email: 'Please enter a valid email' })
  })
  it('checks if user has been created successfully with a token being returned', async () => {
    const res = await request(server).post('/api/auth/register').send({
      email: 'lara@raith.com',
      confirmPassword: '123456',
      password: '123456',
      username: 'lararaith',
      admin: true,
    })

    const { token } = res.body
    expect(res.status).toBe(201)
    expect(token).toBeDefined()
  })
})
