import React from 'react'
import {connect} from 'react-redux'

import AllProductsUsers from './AllProductsUsers'
import AllProductsAdmin from './AllProductsAdmin'

export class AllProducts extends React.Component {
  render() {
    const {user} = this.props

    return (
      <div>{user.isAdmin ? <AllProductsAdmin /> : <AllProductsUsers />}</div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(AllProducts)
