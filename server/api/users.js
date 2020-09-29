const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
const {isAdminMiddleware, isSelfOrAdmin} = require('./gatekeeping')

module.exports = router

router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'email', 'firstName', 'lastName']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/order/checkout/:id', isSelfOrAdmin, async (req, res, next) => {
  try {
    // find current order
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        purchased: false
      }
    })

    // update order to purchased
    await order.update({purchased: true})

    // create new empty order and assign it to the user
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

// get a user's current active order
router.get('/order/:id', isSelfOrAdmin, async (req, res, next) => {
  try {
    // find an order that is associated with the user and is the current order (not purchased)
    // eager load the order's products
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
