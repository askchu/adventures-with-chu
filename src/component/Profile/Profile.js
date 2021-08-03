import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useAuth } from '../../component/Authentication/AuthContext/AuthContext';
import img2 from '../../assets/images/default-profile-picture1.jpg';
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
    const [profile, setProfile] = useState('');
    const [profileStats, setProfileStats] = useState(false);

    const [postLength, setPostLength] = useState('');

    async function handleLogout() {
        setError('');
        try {
            await logout()
            // history.pushState('/sign-in')
            window.location.reload();

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
    // console.log(profile);

    const addProfile = async () => {
        const profile = {
            images: '',
            location: '',
            name: '',
            following: '',
            followers: ''
        }
        await instance.post(`users/${currentUser.uid}/profile.json`, profile)
            .then(response => {
                // console.log(response.data)
            })
            .catch(err => console.log(err));
    }


    useEffect(async () => {

        await instance.get(`users/${currentUser.uid}/blogs.json`)
            .then(response => {
                // console.log(response.data)
                const results = [];
                for (let key in response.data) {
                    results.push({
                        ...response.data[key],
                        id: key,
                        // name: response.data.name
                    })
                }
                // console.log(results.length);
                setPostLength(results.length);
                setBlogData(results);
            }).catch(err => console.log(err));

        await instance.get(`users/${currentUser.uid}/profile.json`)
            .then(response => {
                // console.log(response.data)
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

        // console.log(profile);
        // console.log(profile[0])



    }, [postLength]);



    let profilePic = img2;
    let followingCount = 0;
    let followersCount = 0;

    if (profile) {
        if (profile.length > 0) {
            if (profile[0].images) {
                const imageValue = Object.values(profile[0].images)
                // console.log(imageValue);
                profilePic = imageValue[0].imageUrl;
            }
            if (profile[0].following) {
                const following = Object.keys(profile[0].following);
                followingCount = following.length;
            }
            if (profile[0].followers) {
                const followers = Object.keys(profile[0].followers);
                followersCount = followers.length;
            }
        }

    }
    // console.log(profilePic)
    // console.log(followingCount);

    // console.log(blogData);


    // if (blogData) {
    //     postLength = blogData.length;
    // }



    return (
        <div className='containers'>
            <div className='profile-page'>

                <div className='profilePic'>
                    <picture className='profile-pic'>
                        <img src={profilePic} />
                    </picture>
                </div>

                <div className='user-details'>
                    <div className='display'>
                        {display}
                        {location}
                    </div>
                    <div className='count'>
                        <Link to='/profile-blogs'>
                            <p>Posts: {postLength}</p>
                        </Link>
                        <Link to='/profile-followers'><p className='followers'>Followers: {followersCount}</p></Link>
                        <Link to='/profile-following'><p className='following'>Following: {followingCount}</p></Link>
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

        </div>
    )
}