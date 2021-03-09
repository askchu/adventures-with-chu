import React, { useState } from 'react';
import './Profile.css';
import { useAuth } from '../../component/Authentication/AuthContext/AuthContext';
import img2 from '../../assets/images/img2.jpg';
import cloud from '../../assets/images/clouds.jpg';
import { useHistory } from 'react-router-dom';

export default function Profile() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const { history } = useHistory();

    async function handleLogout() {
        setError('');
        try {
            await logout()
            history.pushState('/sign-in')
        } catch {
            setError('Failed to log out')
        }
    }

    console.log(currentUser);

    let display = (
        <h1>(Profile Name)</h1>
    )
    if (currentUser.displayName) {
        display = (
            <h1>{currentUser.displayName}</h1>
        )
    }

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
                    {display}
                    <p className='email'><strong>Email: </strong>{currentUser.email}</p>
                    <a className='profile-update' href='/update-profile'>Update Profile</a>
                    <button className='logOut' onClick={handleLogout}>Log out</button>
                </div>
            </div>
        </div>
    )
}