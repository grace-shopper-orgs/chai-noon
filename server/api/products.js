const router = require('express').Router()
const {Product, Cart} = require('../db/models')

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
  try {
    // Eager load all carts this product is associated with
    const product = await Product.findByPk(req.params.id, {include: Cart})
    if (!product) {
      return res.sendStatus(404)
    }
    res.json(product)
  } catch (err) {
    next(err)
  }
})
module.exports = router
