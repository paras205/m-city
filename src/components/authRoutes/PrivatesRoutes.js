import React from 'react'
import { Route, Redirect } from 'react-router-dom';

export default function PrivatesRoutes({ user, component: Component, ...rest }) {
    return <Route {...rest} component={(props) => (
        user ?
            <Component {...props} user={user} />
            :
            <Redirect to="sign_in" />
    )
    } />
}
