import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {users} = this.props
    return (
      <div>
        <ul>
          {!users.length
            ? 'No Users'
            : users.map(user => {
                return (
                  <div key={user.id}>
                    <li>User ID: {user.id}</li>
                    <li>Email: {user.email}</li>
                  </div>
                )
              })}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.users
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
