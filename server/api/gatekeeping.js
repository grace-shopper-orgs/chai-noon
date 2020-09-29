const {Order} = require('../db/models')

// middleware to check if user is an admin
const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  // check if there is a current user in the session and check if that user is an admin
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const err = new Error('You do not have access to this page')
    res.status(401).send(err.message)
  }
}

// middleware to check if the current user is acutally the current user, or an admin
const isSelfOrAdmin = async (req, res, next) => {
  let userId

  // if we are in the /orders routes, we will have access to the order id in either req.params or req.body. we can then obtain necessary user id from that order
  if (req.baseUrl.includes('orders')) {
    let orderId = req.params.id || req.body.order.id
    let order = await Order.findByPk(orderId)
    userId = order.userId
  } else {
    // if we are in the /users routes, we will know the user id directly from req.params
    userId = Number(req.params.id)
  }

  // check if there is a current user in the session and check if that user is either the correct user or an admin
  if ((req.user && req.user.id === userId) || req.user.isAdmin) {
    next()
  } else {
    const err = new Error('You do not have access to this page')
    res.status(401).send(err.message)
  }
}

module.exports = {
  isAdminMiddleware,
  isSelfOrAdmin
}
