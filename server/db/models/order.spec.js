const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe.only('Order Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  // order will always be created with the default values
  it('has fields purchased, totalProducts, and totalPrice, with default values of false, 0, and 0, respectively', async () => {
    const newOrder = await Order.create()
    expect(newOrder.purchased).to.equal(false)
    expect(newOrder.totalProducts).to.equal(0)
    expect(newOrder.totalPrice).to.equal(0)
  })
})
