/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe.only('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/users/', () => {
    beforeEach(async () => {
      let admin = await User.create({
        email: 'Admin@email.com',
        password: '9999',
        isAdmin: true,
        firstName: 'Admin',
        lastName: 'Admin'
      })
    })
    it('route return 401 if not an admin', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(401)
    })

    it('admin can access route, which returns an array of users', async () => {
      let agent = request.agent(app)
      await agent
        .post('/auth/login')
        .send({email: 'Admin@email.com', password: '9999'})

      const res = await agent.get('/api/users').expect(200)
      expect(res.body).to.be.an('array')
      console.log('this is body', res.body)
      expect(res.body[0].email).to.be.equal('Admin@email.com')
    })
  })

  describe('GET /api/users/:id', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      User.create({
        email: codysEmail,
        firstName: 'Cody',
        lastName: 'Dog'
      })
      User.create({
        email: 'test@testing.com',
        firstName: 'Robin',
        lastName: 'Default'
      })
      User.create({
        email: 'Admin@email.com',
        password: '9999',
        isAdmin: true,
        firstName: 'Admin',
        lastName: 'Admin'
      })
    })

    it('GET /api/users/:id returns individual user data', async () => {
      let agent = request.agent(app)
      await agent
        .post('/auth/login')
        .send({email: 'Admin@email.com', password: '9999'})

      const res = await agent.get('/api/users/1').expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })

    it('GET /api/users/:id will show different results for different ids', async () => {
      let agent = request.agent(app)
      await agent
        .post('/auth/login')
        .send({email: 'Admin@email.com', password: '9999'})

      const res = await agent.get('/api/users/2').expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal('test@testing.com')
    })
  })
}) // end of file
