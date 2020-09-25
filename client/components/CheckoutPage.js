import React, {Component} from 'react'

export default class CheckoutPage extends Component {
  render() {
    return (
      <div>
        <section className="products">
          <div className="section-title">
            <h2>Products</h2>
          </div>
          <div className="products-center">
            <article className="product">
              <div className="img-container">
                <img
                  src="../public/heroPhoto.jpg"
                  alt="product"
                  className="product-img"
                />
                <button className="bag-btn" data-id="1">
                  <i className="fas fa-shopping=cart" />
                  add to cart
                </button>
              </div>
              <h3>tea</h3>
              <h4>$16</h4>
            </article>
          </div>
        </section>
      </div>
    )
  }
}
