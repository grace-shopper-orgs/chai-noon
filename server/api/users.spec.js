/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        firstName: 'Cody',
        lastName: 'Dog'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
  describe('/api/users/:id', () => {
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
    })

    it('GET /api/users/:id returns individual user data', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })
    it('GET /api/users/:id will show different results for different ids', async () => {
      const res = await request(app)
        .get('/api/users/2')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.firstName).to.be.equal('Robin')
    })
    it('returns Not Found if the id given is invalid', async () => {
      const res = await request(app).get('/api/users/253')
      expect(res.status).to.equal(404)
      expect(res.text).to.be.equal('Not Found')
    })
  }) // end describe('/api/users/:id')
}) // end describe('User routes')
