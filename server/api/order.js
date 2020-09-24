const router = require('express').Router()
const {Product, Order, OrderProducts} = require('../db/models')

//get ALL orders
router.get('/', async (req, res, next) => {
  try {
    let orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// get order by order id
router.get('/:id', async (req, res, next) => {
  try {
    let order = await Order.findByPk(
      req.params.id,
      {include: Product},
      {include: OrderProducts}
    )
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
    const product = await Product.findByPk(productId)
    const [orderProduct] = await OrderProducts.findOrCreate({
      where: {
        orderId: req.params.id,
        productId: productId
      }
    })

    await orderProduct.update({
      count: orderProduct.count + 1
    })

    await order.update({
      totalProducts: order.totalProducts + 1,
      totalPrice: order.totalPrice + product.price
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
