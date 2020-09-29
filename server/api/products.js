const router = require('express').Router()
const {Product} = require('../db/models')
const {isAdminMiddleware} = require('./gatekeeping')

//route to serve up all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//route search by ID
router.get('/:id', async (req, res, next) => {
  let product
  try {
    product = await Product.findByPk(req.params.id)
  } catch (err) {
    next(err)
  }
  res.json(product)
})

//route to add a new product
router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const reqChanges = {
      name: req.body.name,
      price: Math.round(req.body.price * 100),
      description: req.body.description,
      numOfItems: req.body.numOfItems
    }
    const product = await Product.create(reqChanges)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

//route to update an existing product
router.put('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    const updatedProduct = await product.update(req.body)
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

// route to remove product
router.delete('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
