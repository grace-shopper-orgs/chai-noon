import React from 'react'
import {Link} from 'react-router-dom'

export default function WelcomePage() {
  return (
    <div>
      <header className="hero">
        <div className="banner">
          <h1 className="banner-title">Tea Shop</h1>
          <Link to="/products">
            <button className="banner-btn">Shop Products</button>
          </Link>
        </div>
      </header>
    </div>
  )
}
