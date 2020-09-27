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
      <div className="container">
        <h4>About Us</h4>
        <br />
        <p>
          This is a longer card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.This is a
          longer card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer.This is a
          longer card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer.This is a
          longer card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer.
        </p>
      </div>
      <div className="card-wrap">
        <div className="row row-cols-1 row-cols-md-3">
          <div className="col mb-4">
            <div className="card">
              <img src="" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card h-100">
              <img src="" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card h-100">
              <img src="" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card h-100">
              <img src="" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>© 2020 Chai Noon Tea. All Rights Reserved.</p>
      </div>
      <div className="margin" />
    </div>
  )
}
