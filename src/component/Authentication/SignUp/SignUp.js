import React, { useRef, useState } from 'react'
import img from '../../../assets/images/logo3.png';
import './SignUp.css';
import { useAuth } from '../AuthContext/AuthContext';
import Error from '../Error/Error';
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {

    const nameRef = useRef();
    const emailRef = useRef();
    // const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmedRef = useRef();
    const { register, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function submitHandler(e) {
        e.preventDefault();
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
        if (passwordRef.current.value !== passwordConfirmedRef.current.value) {
            return setError('Passwords do not match');
        }
        try {
            setError('');
            setLoading(true);
            await register(emailRef.current.value, passwordRef.current.value)
            console.log('Account created...')
            history.push("/profile-blogs");
        } catch (e) {
            setError(`Failed to create an account, ${e}`);
        }
        setLoading(false);
    }


    return (
        <div className='container'>

            <div className='signUp'>
                <figure>
                    <img src={img} alt={"adventures with chu"} />
                </figure>
                <h1>Register</h1>
                {/* {JSON.stringify(currentUser.email)} */}
                {/* {JSON.stringify(currentUser.email)} */}
                {/* {currentUser && currentUser.email} */}
                {/* {currentUser.email} */}
                {error && <Error message={error} />}
                <form onSubmit={submitHandler}>
                    <div className='input-form'>
                        <label>Full Name:</label>
                        <input type='text' required ref={nameRef} />
                    </div>
                    <div className='input-form'>
                        <label>Email Address</label>
                        <input type='email' required ref={emailRef} />
                    </div>
                    {/* <div className='input-form'>
                        <label>Username:</label>
                        <input type='text' required ref={usernameRef} autoComplete='off' />
                    </div> */}
                    <div className='input-form'>
                        <label>Password</label>
                        <input type='password' required ref={passwordRef} minLength="6" autoComplete='off' />
                    </div>
                    <div className='input-form'>
                        <label>Confirm Password</label>
                        <input type='password' required ref={passwordConfirmedRef} minLength="6" autoComplete='off' />
                    </div>

                    <button disabled={loading} type='submit' className='button'
                    // onClick={this.newPostHandler}
                    >Sign Up
                    </button>
                </form>
                <div className='login'>
                    <p>Have an account? <span><a href='/sign-in'>Log in</a></span></p>
                </div>
            </div>
        </div>
    )
}
