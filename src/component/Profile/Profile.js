import React, { useState } from 'react';
import './Profile.css';
import { useAuth } from '../../component/Authentication/AuthContext/AuthContext';
import img2 from '../../assets/images/img2.jpg';
import cloud from '../../assets/images/clouds.jpg';
import { useHistory, Link } from 'react-router-dom';
import firebase, { storage } from '../../firebase';
import Blog from '../../containers/Blog/Blog';

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

    // console.log(currentUser);

    let display = (
        <h1>(Profile Name)</h1>
    )
    if (currentUser.displayName) {
        display = (
            <h1>{currentUser.displayName}</h1>
        )
    }

    return (
        <div className='containers'>
            <div className='profile-page'>

                <div className='profilePic'>
                    {/* <img src={cloud} /> */}
                    <picture className='profile-pic'>
                        <img src={img2} />
                    </picture>
                </div>
                <div className='user-details'>
                    <div className='display'>
                        {display}
                        <h2>Toronto, ON</h2>
                    </div>
                    <div className='count'>
                        <p>Posts: 0</p>
                        <p className='followers'>Followers: 99</p>
                        <p className='following'>Following: 124</p>
                    </div>
                </div>
                <div className='links'>
                    <button><Link to='/edit-profile'>Edit Profile</Link></button>
                    <button><Link to='/' onClick={handleLogout}>Log out</Link></button>
                </div>
            </div>
            <div className='underline2'>
                <div className='shadow2'></div>
            </div>
            <main>
                <div className='userContent'>
                    <div className='tags'>
                        <p>
                            <Link to='profile-blogs'><i class="fas fa-scroll"></i>Blogs</Link>
                        </p>
                        <p>
                            <Link to='profile-gallery'><i class="far fa-image"></i>Gallery</Link>
                        </p>
                        <p>
                            <Link to='profile-saved'><i class="far fa-bookmark"></i>Saved</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}