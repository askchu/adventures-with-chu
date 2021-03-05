// import React, { Component } from 'react'
// import './SignUp.css';
// import img from '../../../assets/images/logo3.png';
// import { useAuth } from '../AuthContext/AuthContext';

// class SignUp extends Component {
//     constructor(props) {
//         super();
//         this.state = {
//             fullName: '',
//             username: '',
//             password: '',
//             emailAddress: '',
//             posts: [],
//         }
//         const nameRef = React.createRef();
//         const emailRef = React.createRef();
//         const usernameRef = React.createRef();
//         const passwordRef = React.createRef();
// const signup = useAuth();
//         console.log('constructor');
//     }


//     submitHandler() {
//         e.preventDefault();

//         signup(this.emailRef.current.value, this.passwordRef.current.value)
//     }

//     render() {


//         return (
//             <div className='container'>

//                 <div className='signUp'>
//                     <figure>
//                         <img src={img} alt={"adventures with chu"} />
//                     </figure>

//                     <form>
//                         <div className='input-form'>
//                             <label>Full Name:</label>
//                             <input type='text' value={this.state.fullName} onChange={(event) => this.setState({ fullName: event.target.value })} required ref={this.nameRef} />
//                         </div>
//                         <div className='input-form'>
//                             <label>Email Address</label>
//                             <input type='email' value={this.state.emailAddress} onChange={(event) => this.setState({ emailAddress: event.target.value })} required ref={this.emailRef} />
//                         </div>
//                         <div className='input-form'>
//                             <label>Username:</label>
//                             <input type='text' value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} required ref={this.usernameRef} />
//                         </div>
//                         <div className='input-form'>
//                             <label>Password</label>
//                             <input type='password' value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} required ref={this.passwordRef} />
//                         </div>

//                         <button type='submit' className='button'
//                         >Sign Up
//                     </button>
//                     </form>
//                     <div className='login'>
//                         <p>Have an account? <span><a href='/sign-in'>Log in</a></span></p>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default SignUp


import React, { useRef, useState } from 'react'
import img from '../../../assets/images/logo3.png';
import './SignUp.css';
import { useAuth } from '../AuthContext/AuthContext';
import Error from '../Error/Error';

export default function SignUp() {

    const nameRef = useRef();
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmedRef = useRef();
    const { register } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
                {/* {JSON.stringify.currentUser} */}
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
                    <div className='input-form'>
                        <label>Username:</label>
                        <input type='text' required ref={usernameRef} />
                    </div>
                    <div className='input-form'>
                        <label>Password</label>
                        <input type='password' required ref={passwordRef} />
                    </div>
                    <div className='input-form'>
                        <label>Confirm Password</label>
                        <input type='password' required ref={passwordConfirmedRef} minLength="6" />
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
