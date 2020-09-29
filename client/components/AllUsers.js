import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {me} from '../store/user'
import {fetchUsers} from '../store/users'
import Footer from './Footer'

export class AllUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    this.props.getUsers()
    this.props.getMe()
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.user !== nextProps.user) {
      this.setState({loading: false})
      return true
    }
    if (this.state.loading !== nextState.loading) {
      return true
    }
    return false
  }
  render() {
    if (this.state.loading) {
      return <div className="container">🍵 Fetching a kettle.... 🍵</div>
    } else if (this.props.user.name === null)
      return (
        <div>
          <Redirect to="/" />
        </div>
      )
    else if (!this.props.user.isAdmin)
      return (
        <div className="section-title">
          Sorry, you do not have access to this page
        </div>
      )
    else {
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
                    <div className="user" key={user.id}>
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
    },
    getMe: () => {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
