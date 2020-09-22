const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product Model', () => {
  let product
  before(() => db.sync({force: true}))
  beforeEach(() => {
    product = {
      name: 'Black tea',
      imageUrl:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fluzianne.com%2Frecipes%2Fhot-honey-apple-tea%2F&psig=AOvVaw2eBxFqJc03N3a4xoKEBVFD&ust=1600879143793000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiQ99yZ_esCFQAAAAAdAAAAABAZ',
      numOfItems: 10,
      price: 88.34
    }
  })
  afterEach(() => db.sync({force: true}))

  it('has fields name, description, price, imageUrl, numOfItems', async () => {
    product.notARealAttribute = 'does not compute'
    const savedProduct = await Product.create(product)
    expect(savedProduct.name).to.equal('Black tea')
    expect(savedProduct.imageUrl).to.equal(
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fluzianne.com%2Frecipes%2Fhot-honey-apple-tea%2F&psig=AOvVaw2eBxFqJc03N3a4xoKEBVFD&ust=1600879143793000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiQ99yZ_esCFQAAAAAdAAAAABAZ'
    )
    expect(savedProduct.numOfItems).to.equal(10)
    expect(savedProduct.price).to.equal(88.34)
    expect(savedProduct.notARealAttribute).to.equal(undefined)
  })
  // Created testSpeck to validate that the name is not Null or empty

  it('name cannot be null', async () => {
    const blankProduct = Product.build()
    try {
      await blankProduct.validate()
      throw Error('validation should have failed without name')
    } catch (err) {
      expect(err.message).to.contain('name cannot be null')
    }
  })

  it('name cannot be empty', async () => {
    const emptyNameProduct = Product.build({name: ''})
    try {
      await emptyNameProduct.validate()
      throw Error('validation should have failed with empty name')
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on name failed')
    }
  })

  it('price cannot be empty', async () => {
    const emptyPriceProduct = Product.build({price: ''})
    try {
      await emptyPriceProduct.validate()
      throw Error('validation should have failed with empty price')
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on price failed')
    }
  })
})
