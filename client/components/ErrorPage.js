import React from 'react'
import {Link} from 'react-router-dom'
import Footer from './Footer'

export const ErrorPage = props => {
  return (
    <div className="container">
      {props.error.status === 500 ? (
        <div>
          <div className="error-status">500 - Server Error</div>
          <div>
            <div className="section-title">
              <h2>
                We're sorry for the inconvenience! We'll get to work on this
                issue right away.
              </h2>
            </div>
            <Link to="/" className="highlighted-link">
              <p>Home</p>
            </Link>{' '}
            checkout
            <Link to="/products" className="highlighted-link">
              <p>Return to All Products</p>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="section-title">
            <h2>
              The product you're looking for is not available. Sorry for the
              inconvenience!
            </h2>
          </div>
          <Link to="/" className="highlighted-link">
            <p>Home</p>
          </Link>
          <Link to="/products" className="highlighted-link">
            <p>Return to All Products</p>
          </Link>
        </div>
      )}
      <Footer />
    </div>
  )
}
