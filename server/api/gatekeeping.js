const {Order, User} = require('../db/models')

// middleware to make sure user isAdmin and a user
const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  // check if there is a current user in the session and check if that user is an admin
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const err = new Error('Sorry, you do not have access to this page')
    // err.status(401)
    res.send(err.message).status(401)
    next(err)
    res.redirect('/') // if not, rediect them to homepage
  }
}

// middleware to make sure a user, such as delete profile
const isSelfOrAdmin = async (req, res, next) => {
  console.log(req.baseUrl, 'URL')

  let userId

  if (req.baseUrl.includes('orders')) {
    let orderId = req.params.id || req.body.order.id
    let order = await Order.findByPk(orderId)
    userId = order.userId
  } else {
    userId = req.params.id
  }
  console.log(req.user.id, 'ID')
  // if user is authenticated in session check
  if ((req.user && req.user.id == userId) || req.user.isAdmin) {
    console.log('IN NEXT')
    next()
  } else {
    const err = new Error('Sorry, you do not have access to this page')
    res.send(err.message).status(401)
    next(err)
    res.redirect('/') // if not, rediect them to homepage
  }
}

module.exports = {
  isAdminMiddleware,
  isSelfOrAdmin
}
