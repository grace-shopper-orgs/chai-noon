import React from 'react'
import {Link} from 'react-router-dom'
import Footer from './Footer'

export default function ThankYouPage() {
  return (
    <div>
      <div className="container">
        <h2>THANK YOU</h2>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 130.2 130.2"
        >
          <circle className="path-circle" cx="65.1" cy="65.1" r="62.1" />
          <polyline
            className="path-check"
            points="100.2,40.2 51.5,88.8 29.8,67.5 "
          />
        </svg>
        <h5>Thank you for shopping with us. </h5>
        <h5>
          Your confirmation is sent to your email along with a special offer :)
        </h5>
        <div>
          <Link to="/home" className="back-link">
            <p>Go back to homepage</p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
