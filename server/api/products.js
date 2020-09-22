const router = require('express').Router()
const {Product, Cart} = require('../db/models')

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
