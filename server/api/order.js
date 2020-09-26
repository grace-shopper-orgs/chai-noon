const router = require('express').Router()
const {Product, Order, OrderProducts, User} = require('../db/models')

//get ALL orders
router.get('/', async (req, res, next) => {
  try {
    let orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//get user's current active order by userId
router.get('/user/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        purchased: false
      },
      include: {
        model: Product
      }
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// get order by order id
router.get('/:id', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.params.id, {include: Product})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//mark order by user as purchased
router.put('/user/:id/ordered', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        purchased: false
      }
    })
    order.purchased = true
    await order.save()
    const newOrder = await Order.create()
    let user = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    await user.addOrder(newOrder)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//
//will also need to add logic for removing items from cart - should that go into a different route? delete?
router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    const productId = req.body.id
    let count = req.body.count
    if (!count) count = 1
    const product = await Product.findByPk(productId)
    const [orderProduct] = await OrderProducts.findOrCreate({
      where: {
        orderId: req.params.id,
        productId: productId
      }
    })

    await orderProduct.update({
      count: orderProduct.count + count
    })

    await order.update({
      totalProducts: order.totalProducts + count,
      totalPrice: order.totalPrice + product.price * count
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
