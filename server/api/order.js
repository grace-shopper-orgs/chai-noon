const router = require('express').Router()
const {Product, Order} = require('../db/models')
//not sure why, but there was an error when I tried to import ORderProducts like the other models
const OrderProducts = require('../db/models/OrderProducts')

//will also need to add logic for removing items from cart - should that go into a different route? delete?
router.put('/:id', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.params.id)
    let productId = req.body.id
    let product = await Product.findByPk(productId)

    const [orderProduct, created] = await OrderProducts.findOrCreate({
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
    //may have to change this to eager load products?
  } catch (err) {
    next(err)
  }
})

module.exports = router
