import React from 'react'
import { Route, Redirect } from 'react-router-dom';
export default function PublicRoutes({
    user, component: Component, ...rest
}) {
    return <Route {...rest} component={(props) => (
        rest.restricted ?
            (user ?
                <Redirect to="/dashboard" />
                :
                <Component {...props} user={user} />
            )
            :
            <Component {...props} user={user} />
    )} />
}
