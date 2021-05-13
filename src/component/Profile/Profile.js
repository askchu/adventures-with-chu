import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useAuth } from '../../component/Authentication/AuthContext/AuthContext';
import img2 from '../../assets/images/img2.jpg';
import cloud from '../../assets/images/clouds.jpg';
import { useHistory, Link } from 'react-router-dom';
import firebase, { storage } from '../../firebase';
import Blog from '../../containers/Blog/Blog';
import Add from '../Blogging/Add/Add';
import instance from '../../axios-orders';

export default function Profile() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const { history } = useHistory();
    const [blogData, setBlogData] = useState([]);
    const [profile, setProfile] = useState([]);
    async function handleLogout() {
        setError('');
        try {
            await logout()
            // history.pushState('/sign-in')
            history.push('/');
        } catch {
            setError('Failed to log out')
        }
    }

    // console.log(currentUser.uid);

    let display = (
        <h1>(Profile Name)</h1>
    )
    let location = (
        <h2>(Location)</h2>
    )
    if (profile.length > 0) {
        if (profile[0].name) {
            display = (
                <h1>{profile[0].name}</h1>
            )
        }
        if (profile[0].location) {
            location = (
                <h2>{profile[0].location}</h2>
            )
        }

    }

    console.log(profile);

    useEffect(async () => {
        await instance.get(`users/${currentUser.uid}/blogs.json`)
            .then(response => {
                console.log(response.data)
                const results = [];
                for (let key in response.data) {
                    results.push({
                        ...response.data[key],
                        id: key,
                        // name: response.data.name
                    })
                }
                console.log(results);
                setBlogData(results);
            }).catch(err => console.log(err));

        await instance.get(`users/${currentUser.uid}/profile.json`)
            .then(response => {
                console.log(response.data)
                const results = [];
                for (let key in response.data) {
                    results.unshift({
                        ...response.data[key],
                        id: key,
                    })
                }
                setProfile(results);
            })
            .catch(err => console.log(err));

    }, [])

    let profilePic = img2;

    if (profile) {
        if (profile.length > 0) {
            if (profile[0].images) {
                const imageValue = Object.values(profile[0].images)
                // console.log(imageValue);
                profilePic = imageValue[0].imageUrl;
            }
        }
    }
    // console.log(profilePic)

    let postLength = ''
    if (blogData) {
        postLength = blogData.length;
    }

    return (
        <div className='containers'>
            <div className='profile-page'>

                <div className='profilePic'>
                    {/* <img src={cloud} /> */}
                    <picture className='profile-pic'>
                        <img src={profilePic} />
                    </picture>
                </div>
                {/* <div className='newPost'>
                    <button>New Post <i class="fas fa-plus"></i></button>
                </div> */}
                <div className='user-details'>
                    <div className='display'>
                        {display}
                        {location}
                    </div>
                    <div className='count'>
                        <p>Posts: {postLength}</p>
                        <p className='followers'>Followers: 0</p>
                        <p className='following'>Following: 0</p>
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
                            <Link to='profile-blogs'><i className="fas fa-scroll"></i>Blogs</Link>
                        </p>
                        <p>
                            <Link to='profile-gallery'><i className="far fa-image"></i>Gallery</Link>
                        </p>
                        <p>
                            <Link to='profile-saved'><i className="far fa-bookmark"></i>Saved</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}