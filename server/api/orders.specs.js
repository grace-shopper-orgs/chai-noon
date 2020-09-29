const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe.only('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})
