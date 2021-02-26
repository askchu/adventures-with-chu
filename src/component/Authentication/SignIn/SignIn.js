import React, { Component } from 'react'
import './SignIn.css';
import img from '../../../assets/images/logo3.png';

class SignIn extends Component {
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

                <div className='signIn'>
                    <figure>
                        <img src={img} alt={"adventures with chu"} />
                    </figure>

                    {/* <div className='input'>
                        <label>First Name:</label>
                        <input type='text' value={this.state.firstName} onChange={(event) => this.setState({ firstName: event.target.value })} />
                    </div>
                    <div className='input'>
                        <label>Last Name:</label>
                        <input type='text' value={this.state.lastName} onChange={(event) => this.setState({ lastName: event.target.value })} />
                    </div> */}
                    <div className='input'>
                        <label>Email Address</label>
                        <input type='email' value={this.state.emailAddress} onChange={(event) => this.setState({ emailAddress: event.target.value })} />
                    </div>
                    {/* <div className='input'>
                        <label>Username:</label>
                        <input type='text' value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                    </div> */}
                    <div className='input'>
                        <label>Password</label>
                        <input type='password' value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                    </div>

                    <button id='signInButton'
                    // onClick={this.newPostHandler}
                    >Log In
                    </button>
                    <div className='register'>
                        <p>Don't have an account? <span><a href='/sign-up'>Sign Up</a></span></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn
