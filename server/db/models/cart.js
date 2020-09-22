const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  //
  status: {
    //not sure what we're doing here with status
    type: Sequelize.STRING
  },
  totalProducts: {
    type: Sequelize.VIRTUAL,
    async get() {
      let productCount = await this.countProducts()
      return productCount
    },
    set() {
      throw new Error('Do not try to set the `totalProducts` value!')
    }
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    async get() {
      let products = await this.getProducts()
      let price = 0
      for (let i = 0; i < products.length; i++) {
        price += products[i].price
      }
      return price
    },
    set() {
      throw new Error('Do not try to set the `totalProducts` value!')
    }
  }
})

module.exports = Cart
