import React, { useRef, useState } from 'react'
import img from '../../../assets/images/logo3.png';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
// import Error from '../../Authentication/Error/Error';
import { Link, useHistory } from "react-router-dom";
import instance from '../../../axios-orders';
import Error from '../../Authentication/Error/Error';
import firebase, { storage } from '../../../firebase';
// import firebase from '../../../firebase';

export default function UpdateProfile() {

    const nameRef = useRef();
    const imageRef = useRef();
    const emailRef = useRef();
    // const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmedRef = useRef();
    const { currentUser, updateProfile } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const history = useHistory();

    async function submitHandler(e) {
        e.preventDefault();
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
        console.log(image);
        if (passwordRef.current.value !== passwordConfirmedRef.current.value) {
            return setError('Passwords do not match');
        }
        try {
            setError('');
            setLoading(true);

            const storage = firebase.storage().ref(`${currentUser.uid}/profilePic/${image.name}`)
            const uploadPic = storage.put(image);
            uploadPic.on(firebase.storage.TaskEvent.STATE_CHANGED,
                () => {
                    let downloadURL = uploadPic.snapshot.downloadURL
                    console.log('Picture has been uploaded');
                })
            await updateProfile(nameRef.current.value, image.name, emailRef.current.value, passwordRef.current.value)

            console.log('Account updated...')
            history.push("/profile");
        } catch (e) {
            setError(`Failed to update account, ${e}`);
        }
        setLoading(false);
    }


    const handleChange = (e) => {
        const types = ['image/png', 'image/jpeg'];
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setImage(selected);
            setError('');
        } else {
            setImage(null);
            setError('Please select an image file (png or jpeg)');
        }
    }

    // console.log('image: ', image);
    // console.log(currentUser.uid);

    return (
        <div className='container'>

            <div className='signUp'>
                <figure>
                    <img src={img} alt={"adventures with chu"} />
                </figure>
                <h1>Update Profile</h1>
                {/* {JSON.stringify(currentUser.email)} */}
                {/* {JSON.stringify(currentUser.email)} */}
                {/* {currentUser && currentUser.email} */}
                {/* {currentUser.email} */}
                {error && <Error message={error} />}
                <form onSubmit={submitHandler}>
                    <div className='input-form'>
                        <label>Profile Name:</label>
                        <input type='text' ref={nameRef} />
                    </div>
                    <div className='input-form'>
                        <label>Profile Picture:</label>
                        <input type='file' accept="image/png, image/jpeg" onChange={handleChange} ref={imageRef} />
                        {image && <div>{image.name}</div>}
                    </div>

                    <div className='input-form'>
                        <label>Email Address</label>
                        <input type='email' ref={emailRef} defaultValue={currentUser.email} />
                    </div>
                    {/* <div className='input-form'>
                        <label>Username:</label>
                        <input type='text' required ref={usernameRef} autoComplete='off' />
                    </div> */}
                    <div className='input-form'>
                        <label>Password</label>
                        <input type='password' ref={passwordRef} minLength="6" autoComplete='off' placeholder="Leave blank to keep original" />
                    </div>
                    <div className='input-form'>
                        <label>Confirm New Password</label>
                        <input type='password' ref={passwordConfirmedRef} minLength="6" autoComplete='off' placeholder="Leave blank to keep original" />
                    </div>

                    <button disabled={loading} type='submit' className='button'
                    // onClick={this.newPostHandler}
                    >Update Profile
                    </button>
                </form>
                <div className='login'>
                    <p><span><a href='/profile'>Cancel</a></span></p>
                </div>
            </div>
        </div>
    )
}
