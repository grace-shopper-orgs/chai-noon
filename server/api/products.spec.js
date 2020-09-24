/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const product = {
      name: 'Black tea',
      imageUrl:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fluzianne.com%2Frecipes%2Fhot-honey-apple-tea%2F&psig=AOvVaw2eBxFqJc03N3a4xoKEBVFD&ust=1600879143793000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiQ99yZ_esCFQAAAAAdAAAAABAZ',
      numOfItems: 10,
      price: 8834,
      description: 'Test description'
    }
    beforeEach(() => {
      return Product.create(product)
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Black tea')
    })
  }) // end describe('/api/products')
  describe('/api/products/:id', () => {
    const product = {
      name: 'Black tea',
      imageUrl:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fluzianne.com%2Frecipes%2Fhot-honey-apple-tea%2F&psig=AOvVaw2eBxFqJc03N3a4xoKEBVFD&ust=1600879143793000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiQ99yZ_esCFQAAAAAdAAAAABAZ',
      numOfItems: 10,
      price: 8834,
      description: 'Test description'
    }
    const greenTea = {
      name: 'Green tea',
      imageUrl:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/green-tea-1574c69.jpg?quality=90&resize=960,872',
      numOfItems: 15,
      price: 3234,
      description: 'This is green tea'
    }
    beforeEach(async () => {
      await Product.create(product)
      await Product.create(greenTea)
    })

    it('GET /api/products/:id returns the details of one product', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Black tea')
    })
    it('GET /api/products/:id will show different results for different ids', async () => {
      const res = await request(app)
        .get('/api/products/2')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Green tea')
    })
    it('returns Not Found if the id given is invalid', async () => {
      const res = await request(app).get('/api/products/253')
      expect(res.status).to.equal(404)
      expect(res.text).to.be.equal('Not Found')
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
