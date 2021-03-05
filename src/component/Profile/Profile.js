import React, { useState } from 'react';
import './Profile.css';
import { useAuth } from '../../component/Authentication/AuthContext/AuthContext';
import img2 from '../../assets/images/img2.jpg';
import cloud from '../../assets/images/clouds.jpg';

export default function Profile() {
    const [error, setError] = useState('');
    const { currentUser } = useAuth();


    return (
        <div>
            <div className='profile-page'>
                <picture className='profile-backPic'>
                    <img src={cloud} />
                </picture>
                <picture className='profile-pic'>
                    <img src={img2} />
                </picture>
                <div className='user-details'>
                    <h1>Profile (Name) </h1>
                    <p className='email'><strong>Email: </strong>{currentUser.email}</p>
                    <a className='profile-update' href='/update-profile'>Update Profile</a>
                    <button className='logOut'>Log out</button>
                </div>
            </div>
        </div>
    )
}