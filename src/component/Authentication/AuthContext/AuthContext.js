import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../../../firebase.js';


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);


    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }


    function register(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateProfile(email, password) {
        return currentUser.updateProfile({
            // displayName: name,
            // photoURL: photoName,
            email: email,
            password: password
        }).then(res => {
            // console.log('update successful')
        })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe
    }, []);



    const value = {
        currentUser,
        register,
        login,
        logout,
        resetPassword,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
