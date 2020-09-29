const router = require('express').Router()
const {Product, Order, OrderProducts, User} = require('../db/models')
const {isAdminMiddleware, isSelfOrAdmin} = require('./gatekeeping')

// get ALL orders
router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    let orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// NEED IS USER MW - order id
// get order by order id
router.get('/:id', isSelfOrAdmin, async (req, res, next) => {
  try {
    // eager load the order's products
    let order = await Order.findByPk(req.params.id, {include: Product})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// update the count of a product in the order to a new count specified by user
router.put('/update', isSelfOrAdmin, async (req, res, next) => {
  try {
    let {product, order, count} = req.body
    count = Number(count)

    // find the association between order and product
    const association = await OrderProducts.findOne({
      where: {
        productId: product.id,
        orderId: order.id
      }
    })

    const previousCount = association.count

    // if the new count is 0, delete the item from the order, or remove the assocation between product and order. else, update the product count in the association to reflect the new count
    if (count === 0) {
      await association.destroy()
    } else {
      await association.update({count: count})
    }

    const orderModel = await Order.findByPk(order.id)

    // find the difference between the previous count and the new count

    const countDifference = count - previousCount

    // find the new total price of the order by multiplying the count difference by the product price, and adding that to the initial total price of the order
    let newPrice = countDifference * product.price + orderModel.totalPrice

    //update the order with the new total price and the new total quantity of products
    await orderModel.update({
      totalPrice: newPrice,
      totalProducts: orderModel.totalProducts + countDifference
    })

    // eager load the order with its products
    const updatedOrderWithProducts = await Order.findByPk(order.id, {
      include: Product
    })

    res.json(updatedOrderWithProducts)
  } catch (err) {
    next(err)
  }
})

// add a product to an order
router.put('/:id', isSelfOrAdmin, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    const productId = req.body.id

    // count === quantity of product to add to the order

    let count = req.body.count || 1

    const product = await Product.findByPk(productId)

    // find or create association between order and product
    const [orderProduct] = await OrderProducts.findOrCreate({
      where: {
        orderId: req.params.id,
        productId: productId
      }
    })

    // update association, add count to the previous count
    await orderProduct.update({
      count: orderProduct.count + count
    })

    // update the total qty of products in the order and the total price
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
