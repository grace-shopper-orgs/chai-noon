const router = require('express').Router()
const {User} = require('../db/models')
const {isAdminMiddleware} = require('./gatekeeping')

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
