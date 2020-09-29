import React from 'react'
import {Link} from 'react-router-dom'
import Footer from './Footer'

export default function WelcomePage() {
  return (
    <div>
      <header className="hero">
        <div className="banner">
          <h1 className="banner-title">Chai Noon</h1>
          <h4 className="banner-text">Be your best at work or rest</h4>
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
          We believe that the key to reaching your full potential lies in
          feeling your best.
        </p>
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
      <div className="card-wrap">
        <div className="card-box">
          <div className="card">
            <img src="" className="card-img-top" alt="" />

            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
          <div className="card">
            <img src="" className="card-img-top" alt="" />

            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
          <div className="card">
            <img src="" className="card-img-top" alt="" />

            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
          <div className="card">
            <img src="" className="card-img-top" alt="" />

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
      <Footer />
    </div>
  )
}
