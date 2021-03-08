import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../AuthContext/AuthContext';

export default function PrivateRoutes({ component: Component, ...rest }) {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to='/sign-in' />
            }}
        ></Route>
    )
}
