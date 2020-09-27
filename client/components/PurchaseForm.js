import React from 'react'
import Footer from './footer'
/**
 * COMPONENT
 */
export const PurchaseForm = props => {
  const product = props.product
  return (
    <div>
      <form onSubmit={evt => props.onSubmit(evt, product)} name={product}>
        <div>
          <div>
            <label htmlFor="Quantity">
              <small>Quantity</small>
            </label>
            <input
              name="quantity"
              type="number"
              min={1}
              defaultValue={1}
              max={10}
            />
          </div>
          <div>
            <button className="btn btn-outline-secondary" type="submit">
              Add to Cart
            </button>
          </div>
        </div>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
      </form>
      <Footer />
    </div>
  )
}
