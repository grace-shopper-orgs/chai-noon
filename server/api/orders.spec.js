const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const User = require('../db/models/user')
const app = require('../index')
const Order = db.model('order')

describe.only('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders', () => {
    beforeEach(async () => {
      await Order.create()
      await Order.create()
      let admin = await User.create({
        email: 'admin@email.com',
        password: '9999',
        isAdmin: true,
        firstName: 'Admin',
        lastName: 'User'
      })
    })

    it('route returns 401 if not an admin', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(401)
    })

    it('admin can access route, which returns an array of all orders in database', async () => {
      let agent = request.agent(app)

      await agent
        .post('/auth/login')
        .send({email: 'admin@email.com', password: '9999'})

      const res = await agent.get('/api/orders').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0]).to.have.property('purchased')
      expect(res.body[0]).to.have.property('totalProducts')
      expect(res.body[0]).to.have.property('totalPrice')
    })
  })

  describe('/api/orders/:id', () => {
    beforeEach(async () => {
      let order1 = await Order.create()
      let order2 = await Order.create()
      let user1 = await User.create({
        email: 'user@email.com',
        password: '12345',
        isAdmin: false,
        firstName: 'Normal',
        lastName: 'User 1'
      })

      await user1.addOrder(order1)

      let user2 = await User.create({
        email: 'user2@email.com',
        password: '54321',
        isAdmin: false,
        firstName: 'Normal',
        lastName: 'User 2'
      })

      await user2.addOrder(order2)

      let admin = await User.create({
        email: 'admin@email.com',
        password: '9999',
        isAdmin: true,
        firstName: 'Admin',
        lastName: 'User'
      })
    })

    it('route returns 401 if current user id does not match the order user id', async () => {
      let agent = request.agent(app)

      await agent
        .post('/auth/login')
        .send({email: 'user@email.com', password: '12345'})

      const res = await agent.get('/api/orders/2').expect(401)
    })

    it('user can access their own order by user id', async () => {
      let agent = request.agent(app)

      await agent
        .post('/auth/login')
        .send({email: 'user2@email.com', password: '54321'})

      const res = await agent.get('/api/orders/2').expect(200)
      expect(res.body).to.have.property('purchased')
      expect(res.body).to.have.property('totalProducts')
      expect(res.body).to.have.property('totalPrice')
      expect(res.body.products).to.be.an('array')
    })

    it('admin can access route', async () => {
      let agent = request.agent(app)

      await agent
        .post('/auth/login')
        .send({email: 'admin@email.com', password: '9999'})

      const res = await agent.get('/api/orders/1').expect(200)
      expect(res.body).to.have.property('purchased')
      expect(res.body).to.have.property('totalProducts')
      expect(res.body).to.have.property('totalPrice')
      expect(res.body.products).to.be.an('array')
    })
  })
})
