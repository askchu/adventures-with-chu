import React, { Component } from 'react'
import { AuthProvider } from './AuthContext/AuthContext'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'

class Authenetication extends Component {
    render() {
        return (
            <AuthProvider>
                <SignUp />
            </AuthProvider>
        )
    }
}

export default Authenetication
