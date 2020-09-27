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
    let order = await Order.findByPk(
      req.params.id,
      {include: Product},
      {include: Order}
    )
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
  } catch (error) {
    next(error)
  }
})
//using query parameters here when fetching from axios
router.put('/update', async (req, res, next) => {
  try {
    let {product, order, count} = req.body
    count = Number(count)

    const association = await OrderProducts.findOne({
      where: {
        productId: product.id,
        orderId: order.id
      }
    })
    const previousCount = association.count
    if (previousCount === count) {
      return res.json(association)
    }
    await association.update({count: count})
    const productModel = await Product.findByPk(product.id)
    const orderModel = await Order.findByPk(order.id)

    const countDifference = count - previousCount
    if (countDifference > 0) {
      let newTotal =
        countDifference * productModel.price + orderModel.totalPrice
      await orderModel.update({
        totalPrice: newTotal,
        totalProducts: orderModel.totalProducts + countDifference
      })
    }
    if (countDifference < 0) {
      let newTotal =
        orderModel.totalPrice - Math.abs(countDifference) * productModel.price
      await orderModel.update({
        totalPrice: newTotal,
        totalProducts: orderModel.totalProducts + countDifference
      })
    }

    const updatedOrderWithProducts = await Order.findByPk(order.id, {
      include: Product
    })

    res.json(updatedOrderWithProducts)
  } catch (err) {
    next(err)
  }
})

// adding to order
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
    await order
      .update({
        totalProducts: order.totalProducts + count,
        totalPrice: order.totalPrice + product.price * count
      })
      .then(() => res.json(order))
      .catch(err => {
        throw err
      })
  } catch (err) {
    next(err)
  }
})

module.exports = router
