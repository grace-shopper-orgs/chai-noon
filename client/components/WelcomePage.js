import React from 'react'
import {Link} from 'react-router-dom'
import Footer from './Footer'

export default function WelcomePage() {
  return (
    <div>
      <header className="hero">
        <div className="banner">
          <h1 className="banner-title">Tea Shop</h1>
          <Link to="/products">
            <button type="button" className="banner-btn">
              Shop Products
            </button>
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
      {/* <div className="container"> */}
      <div className="container-feature">
        <h4>Featured Products</h4>
        <div className="card-wrap">
          <div className="row row-cols-1 row-cols-md-3">
            <div className="col mb-4">
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2018/01/03/06/08/tee-3057645_960_720.jpg"
                  className="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">Story of Eden</h5>
                  <p className="card-text">
                    This soothing aromatic blend is crafted with minty, calm,
                    and slightly sweet botanicals. Restoring balance in the
                    digestive system with each and every sip.
                  </p>
                  <Link to="/products/73" className="highlighted-link">
                    <p>View Product</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col mb-4">
              <div className="card h-100">
                <img
                  src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/weight-loss-tea-1572293635.jpg?crop=0.716xw:1.00xh;0.111xw,0&resize=640:*"
                  className="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">Jasmine Pearls Tea</h5>
                  <p className="card-text">
                    Aromatic organic jasmine blossoms are used for scenting the
                    most tender organic green tea leaves and buds then
                    hand-rolled into small pearls to create this organic jasmine
                    pearl tea. This restorative tea is exquisite in flavor and
                    aroma and yields a clear, light green hue with a delicate
                    finish.
                  </p>
                  <Link to="/products/46" className="highlighted-link">
                    <p>View Product</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col mb-4">
              <div className="card h-100">
                <img
                  src="https://static.toiimg.com/photo/67394858.cms"
                  className="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">Blue Ocean</h5>
                  <p className="card-text">
                    Organic green tea infused with tropical flavors of
                    pineapple, mango, and papaya offering a sweet and refreshing
                    cup of tea. This pineapple green tea is filled with bright
                    and fruity notes in each cup.
                  </p>
                  <Link to="/products/52" className="highlighted-link">
                    <p>View Product</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </div>
  )
}
