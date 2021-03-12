// import React, { Component } from 'react'
// import './SignIn.css';
// import img from '../../../assets/images/logo3.png';

// class SignIn extends Component {
//     constructor(props) {
//         super();
//         this.state = {
//             password: '',
//             emailAddress: '',
//             posts: [],
//             // submitted: false
//         }
//         console.log('constructor');
//     }


//     render() {
//         return (
//             <div className='container'>

//                 <div className='signIn'>
//                     <figure>
//                         <img src={img} alt={"adventures with chu"} />
//                     </figure>

//                     {/* <div className='input'>
//                         <label>First Name:</label>
//                         <input type='text' value={this.state.firstName} onChange={(event) => this.setState({ firstName: event.target.value })} />
//                     </div>
//                     <div className='input'>
//                         <label>Last Name:</label>
//                         <input type='text' value={this.state.lastName} onChange={(event) => this.setState({ lastName: event.target.value })} />
//                     </div> */}
//                     <div className='input'>
//                         <label>Email Address</label>
//                         <input type='email' value={this.state.emailAddress} onChange={(event) => this.setState({ emailAddress: event.target.value })} />
//                     </div>
//                     {/* <div className='input'>
//                         <label>Username:</label>
//                         <input type='text' value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
//                     </div> */}
//                     <div className='input'>
//                         <label>Password</label>
//                         <input type='password' value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
//                     </div>

//                     <button className='button'
//                     // onClick={this.newPostHandler}
//                     >Log In
//                     </button>
//                     <div className='register'>
//                         <p>Don't have an account? <span><a href='/sign-up'>Sign Up</a></span></p>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default SignIn

import React, { useRef, useState } from 'react'
import img from '../../../assets/images/logo3.png';
import './SignIn.css';
import { useAuth } from '../AuthContext/AuthContext';
import Error from '../Error/Error';
import { Link, useHistory } from 'react-router-dom';

export default function SignIn() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function submitHandler(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/profile-blogs");
            console.log('Account logged in...')
        } catch (e) {
            setError(`Failed to sign in, ${e}`);
        }
        setLoading(false);
    }


    return (
        <div className='container'>

            <div className='signUp'>
                <figure>
                    <img src={img} alt={"adventures with chu"} />
                </figure>
                {/* {JSON.stringify(currentUser.email)} */}
                {/* {JSON.stringify(currentUser.email)} */}
                {/* {currentUser && currentUser.email} */}
                {/* {currentUser.email} */}
                {error && <Error message={error} />}
                <form onSubmit={submitHandler}>
                    {/* <div className='input-form'>
                        <label>Full Name:</label>
                        <input type='text' required ref={nameRef} />
                    </div> */}
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
                    {/* <div className='input-form'>
                        <label>Confirm Password</label>
                        <input type='password' required ref={passwordConfirmedRef} minLength="6" autoComplete='off' />
                    </div> */}

                    <button disabled={loading} type='submit' className='button'
                    // onClick={this.newPostHandler}
                    >Log In
                    </button>
                </form>
                <div className='login'>
                    <p>Don't have an account? <span>
                        <a href='/sign-up'>Sign Up</a>
                    </span></p>
                </div>
                <div className='login'>
                    <p>Forgot password? <span>
                        <a href='/forgot-password'>Reset Password</a>
                    </span></p>
                </div>
            </div>
        </div>
    )
}
