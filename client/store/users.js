import axios from 'axios'

//----------- action types ------------//
export const SET_USERS = 'SET_USERS'

//----------- action creators -----------//
export const setUsers = users => {
  return {
    type: SET_USERS,
    users: users
  }
}

//---------- thunk creators ----------//
export const fetchUsers = () => async dispatch => {
  try {
    const response = await axios.get('/api/users')
    const users = response.data
    dispatch(setUsers(users))
  } catch (err) {
    console.log(err)
  }
}

//----------- initial state ----------//
const users = []

//---------- reducer ----------//
export default function usersReducer(state = users, action) {
  switch (action.type) {
    case SET_USERS:
      return [...action.users]
    default:
      return state
  }
}
