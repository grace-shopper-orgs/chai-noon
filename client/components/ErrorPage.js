import React from 'react'
import {Link} from 'react-router-dom'

export const ErrorPage = props => {
  return (
    <div>
      {props.error.status === 500 ? (
        <div>
          <div className="error-`status">500 - Server Error</div>
          <div>
            <div className="error-description">
              We're sorry for the inconvenience! We'll get to work on this issue
              right away.
            </div>
            `
            <div className="link-button">
              <Link to="/">Home</Link>
            </div>
            <div className="link-button">
              <Link to="/products">Return to All Products</Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="error-description">
            The product you're looking for is not available. Sorry for the
            inconvenience!
          </div>
          <div className="link-button">
            <Link to="/">Home</Link>
          </div>
          <div className="link-button">
            <Link to="/products">Return to All Products</Link>
          </div>
        </div>
      )}
    </div>
  )
}
