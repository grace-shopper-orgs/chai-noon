import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'
import Footer from './Footer'

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
   
    if (!this.props.user.isAdmin)
      return (
        <div className="section-title">
          Sorry, you do not have access to this page
        </div>
      )

    const {users} = this.props

    return (
      <div>
        <div className="section-title">
          <br />
          <br />
          <h2>Users in the Database</h2>
          <hr />
          <br />
        </div>
        <div className="user-inline">
          {!users.length
            ? 'No Users'
            : users.map(user => {
                return (
                  <div key={user.id}>
                    <p>User ID: {user.id}</p>
                    <p>Email: {user.email}</p>
                  </div>
                )
              })}
        </div>
        <Footer />
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.users,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => {
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
