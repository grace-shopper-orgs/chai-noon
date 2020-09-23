const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('OrderProducts', {
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = OrderProducts
