import React from 'react'
import {Switch, Route} from 'react-router-dom'

export default function LoginSignUp_Form() {
  return (
    <div>
      {isLoggedIn && (
        <Switch>
          {/* Routes placed here are only available after logging in */}
          <Route path="/home" component={UserHome} />
        </Switch>
      )}
      {/* Displays our Login component as a fallback */}
      <Route component={Login} />
    </div>
  )
}
