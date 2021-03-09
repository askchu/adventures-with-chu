import React, { useRef, useState } from 'react'
import img from '../../../assets/images/logo3.png';
import { useAuth } from '../AuthContext/AuthContext';
import Error from '../Error/Error';

export default function ForgotPw() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function submitHandler(e) {
        e.preventDefault();
        try {
            setMessage('')
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox/junk for further instructions');
        } catch (e) {
            setError(`Failed to reset password, ${e}`);
        }
        setLoading(false);
    }

    return (
        <div className='container'>

            <div className='signUp'>
                <figure>
                    <img src={img} alt={"adventures with chu"} />
                </figure>
                {error && <Error message={error} />}
                {message && <Error message={message} />}
                <form onSubmit={submitHandler}>
                    <div className='input-form'>
                        <label>Email Address</label>
                        <input type='email' required ref={emailRef} />
                    </div>


                    <button disabled={loading} type='submit' className='button'
                    // onClick={submitHandler}
                    >Reset Password
                    </button>
                </form>
                <div className='login'>
                    <p>Have an account?
                        <a href='/sign-in'>Login</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
