import React, { Component } from 'react'
import './SignUp.css';
import img from '../../../assets/images/logo3.png';

class SignUp extends Component {
    constructor(props) {
        super();
        this.state = {
            password: '',
            emailAddress: '',
            posts: [],
            // submitted: false
        }
        console.log('constructor');
    }


    render() {
        return (
            <div className='container'>

                <div className='signUp'>
                    <figure>
                        <img src={img} alt={"adventures with chu"} />
                    </figure>

                    <form>
                        <div className='input-form'>
                            <label>Full Name:</label>
                            <input type='text' value={this.state.lastName} onChange={(event) => this.setState({ lastName: event.target.value })} />
                        </div>
                        <div className='input-form'>
                            <label>Email Address</label>
                            <input type='email' value={this.state.emailAddress} onChange={(event) => this.setState({ emailAddress: event.target.value })} />
                        </div>
                        <div className='input-form'>
                            <label>Username:</label>
                            <input type='text' value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                        </div>
                        <div className='input-form'>
                            <label>Password</label>
                            <input type='password' value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                        </div>

                        <button id='signInButton'
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
}

export default SignUp
