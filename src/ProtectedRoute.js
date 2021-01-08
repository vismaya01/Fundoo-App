import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isAuthenticated = () => {
    let authendicated = false
    if (localStorage.getItem('userToken') !== null) {
        authendicated = true;
    }
    else {
        authendicated = false;
    }
    return authendicated
}

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (isAuthenticated()) {
                    return <Component {...props} />
                }
                else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}