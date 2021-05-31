import React, { useEffect, useState } from 'react';
import instance from '../../../axios-orders';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import Modal from '../../Blogging/ImageGrid/Modal/Modal';
import Profile from '../Profile';
import { motion } from 'framer-motion';
import Footer from '../../Navigation/Footer/Footer';
import { Link } from 'react-router-dom';
import img1 from '../../../assets/images/img1.jpg';

export default function ProfileGallery() {
    const { currentUser } = useAuth();
    const [userProfile, setUserProfile] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [foundCurrentUser, setCurrentUser] = useState('');
    const [selectedImg, setSelectedImg] = useState(null);
    const [followingData, setFollowingData] = useState([]);
    const [followers, setFollowers] = useState(false)

    const grabFollowingData = async () => {
        if (userProfile) {
            let object = Object.keys(userProfile);
            // console.log(object)
            // console.log(object.length)
            if (object.length > 0) {
                // console.log(userProfile[0].userProfile);
                const profileObj = Object.keys(userProfile[0].profile);
                const results = Object.values(userProfile[0].profile);
                console.log(results);
                const followingId = Object.keys(results[0].followers);
                const following = Object.values(results[0].followers);
                // console.log(following);
                // console.log(following.length);
                let data = [];
                for (let i = 0; i < following.length; i++) {
                    await instance.get(`/users/${following[i].id}.json`)
                        .then(res => {
                            console.log(res);
                            data.push({ ...res.data, userId: following[i].id, userObjectId: followingId[i], profileObjectValue: profileObj[0] })
                            // console.log(data);
                        })
                        .catch(err => console.log(err));
                }
                if (data.length > 0) {
                    setFollowingData(data);
                }
            }
        }
    }

    const grabUserProfile = async () => {
        await instance.get(`/users/${currentUser.uid}.json`)
            .then(res => {
                console.log(res);
                const results = [];
                results.push({
                    ...res.data
                })
                setUserProfile(results);
                setCurrentUser('logged in');
                setFollowers(false);
            })
            .catch(err => console.log(err));
    }

    const unfollowUser = async (currentUser, followingUser, followingUserObjectId, currentUserProfileObjectValue) => {
        console.log(currentUser);
        console.log(followingUser);
        console.log(followingUserObjectId);
        await instance.delete(`https://auth-production-90d68-default-rtdb.firebaseio.com/users/${currentUser}/profile/${currentUserProfileObjectValue}/following/${followingUserObjectId}.json`)
            .then(response => {
                console.log(response);
                setFollowers(true);
            })
            .catch(err => console.log(err));

        console.log(userProfile[0].profile);
        const followingStats = Object.values(userProfile[0].profile);
        const followingValues = Object.values(followingStats[0].following);
        console.log(followingValues);
        console.log(followingValues.length);


        // await instance.delete(`https://auth-production-90d68-default-rtdb.firebaseio.com/users/${user.id}/profile/${userObjectKey[0]}/followers.json`, loggedUser)
        //     .then(response => {
        //         console.log(response);
        //         setFollowing('changed');
        //     })
        //     .catch(err => console.log(err));
    }

    useEffect(async () => {
        window.scrollTo(0, 0)

        grabUserProfile();
        if (userProfile) {
            grabFollowingData()
        }
    }, [foundCurrentUser, followers])

    console.log(followingData);
    console.log(userProfile);

    let displayUsers = <div></div>




    if (followingData) {

        if (followingData.length > 0) {
            displayUsers = followingData.map(doc => {
                console.log(currentUser.uid)
                console.log(doc);
                console.log(doc.id);
                const profileObj = Object.keys(doc.profile);
                console.log(profileObj[0])
                const profileValues = Object.values(doc.profile);
                console.log(profileValues[0]);
                console.log(profileValues[0].following);

                let profilePic = <img src={img1} />
                if (profileValues[0].images) {
                    const imgValue = Object.values(profileValues[0].images);
                    profilePic = <img src={imgValue[0].imageUrl} />

                    return (
                        <div className='followingUsers'>
                            <div className='following'>
                                <div className='profilePic'>
                                    {profilePic}
                                </div>
                                <div className='profileName'>
                                    <h2>{profileValues[0].name}</h2>
                                    {/* <h2>{blog.profileName}</h2>
                                <p>{blogContent[0].date}</p> */}
                                </div>
                                {/* <button onClick={() => unfollowUser(currentUser.uid, doc.userId, doc.userObjectId, doc.profileObjectValue)}>Unfollow</button> */}
                            </div>

                        </div>
                    )
                }
                if (!profileValues[0].images) {
                    return (
                        <div className='followingUsers'>
                            <div className='following'>
                                <div className='profilePic'>
                                    {profilePic}
                                </div>
                                <div className='profileName'>
                                    <h2>{profileValues[0].name}</h2>
                                </div>
                                {/* <button onClick={() => unfollowUser(currentUser.uid, doc.userId, doc.userObjectId, doc.profileObjectValue)}>Unfollow</button> */}
                            </div>
                        </div>
                    )
                }


            })
        }
    }

    return (
        <div className='home'>

            <div className='profile'>
                <Profile />
                <div className='followers'>
                    <h1>Followers</h1>
                    {displayUsers}
                </div>
            </div>
            <Footer />
        </div>

    )
}