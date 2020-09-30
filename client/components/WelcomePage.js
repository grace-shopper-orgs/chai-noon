import React from 'react'
import {Link} from 'react-router-dom'
import Footer from './Footer'

export default function WelcomePage() {
  return (
    <div>
      <header className="hero">
        <div className="banner">
          <h4 className="banner-text">Be your best at work or rest</h4>
          <Link to="/products">
            <button type="button" className="banner-btn">
              Shop Products
            </button>
          </Link>
        </div>
      </header>
      <div className="container">
        <div className="section-title">
          <h4>About Us</h4>
        </div>
        <br />
        <h5 className="about-text">
          "We believe that the key to reaching your full potential lies in
          feeling your best."
        </h5>
        <p>
          At Chai Noon, we accomplish that by providing high-quality teas that
          deliver on taste, and provide an immersive experience. Whether you
          have a presentation you need to ace, need a little pick-me-up, or just
          want to explore our world through tea, we have a blend that suits your
          needs.
        </p>
        <p>Draw your kettle, and pinky up!</p>
        <p>It's Chai Noon.</p>
      </div>
      <div className="container-feature">
        <h4>Featured Products</h4>
        <div className="card-wrap">
          <div className="card-box">
            <div>
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
                  <Link to="/products/74" className="highlighted-link">
                    <p>View Product</p>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="card">
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
            <div>
              <div className="card">
                <div className="card-img">
                  <img
                    src="https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/06/01/Pictures/_c1c7c70a-657d-11e8-b4a9-2154dcd09999.jpg"
                    className="card-img-top"
                    alt=""
                  />
                </div>
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
        </div>
      </div>
      <Footer />
    </div>
  )
}
