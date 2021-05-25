import React, { useEffect, useState } from 'react'
import './Home.css';
import News from './News/News';
import instance from '../../axios-orders';
import Footer from '../../component/Navigation/Footer/Footer';
import { Link } from 'react-router-dom';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import { useAuth } from '../../component/Authentication/AuthContext/AuthContext';
import ProgressBar from '../../component/ProgressBar/ProgressBar';


function Home() {
    const { currentUser } = useAuth();
    const [profile, setProfile] = useState([]);
    const [foundCurrentUser, setCurrentUser] = useState('');
    const [followingData, setFollowingData] = useState([]);
    console.log(profile);
    console.log(followingData);

    const grabUserProfile = async () => {
        await instance.get(`/users/${currentUser.uid}.json`)
            .then(res => {
                const results = [];
                results.push({
                    ...res.data
                })
                setProfile(results);
                setCurrentUser('logged in');
            })
            .catch(err => console.log(err));
    }


    const grabFollowingData = async () => {
        if (profile) {
            if (profile.length > 0) {
                console.log(profile[0].profile);
                const results = Object.values(profile[0].profile);
                const following = Object.values(results[0].following);
                console.log(following);
                console.log(following.length);
                let data = [];
                for (let i = 0; i < following.length; i++) {
                    await instance.get(`/users/${following[i].id}.json`)
                        .then(res => {
                            console.log(res);
                            data.push({ ...res.data })
                            console.log(data);
                        })
                        .catch(err => console.log(err));
                }
                if (data.length > 0) {
                    setFollowingData(data);
                }
            }
        }
    }




    useEffect((foundCurrentUser) => {
        grabUserProfile();
        if (profile) {
            grabFollowingData()
        }

    }, [foundCurrentUser])

    let followerBlogs = [];
    let followingUsers = '';
    let followingPosts = [];
    if (followingData) {
        if (followingData.length > 0) {
            followingData.map((user) => {
                console.log(user);
                console.log(user.profile);
                if (user.blogs) {
                    // console.log(user.blogs)
                    followerBlogs.push(user.blogs)
                    console.log(followerBlogs[0]);
                    console.log(Object.keys(followerBlogs[0]));
                    console.log(Object.values(followerBlogs[0]));
                    const followers = Object.keys(followerBlogs[0]);
                    const results = Object.values(followerBlogs[0])
                    const author = Object.values(user.profile)
                    console.log(author);
                    console.log(results);

                    followingPosts = results.map(doc => {
                        console.log(doc.content);
                        const values = Object.values(doc.content);
                        const images = Object.values(doc.images);
                        console.log(values);
                        return (
                            <div key={values[0].id} className='blogs'>
                                <h2>{values[0].title}</h2>
                                <p>Author: {author[0].name}</p>
                                <div className='image'>
                                    <img src={images[0].imageUrl} />
                                </div>
                                <p>{values[0].content}</p>
                            </div>
                        )
                    })
                }
                console.log(followingPosts);
                console.log(followerBlogs);

            })

        }
    }

    return (
        <div className='home'>
            <div className='logo'>
                {/* <img src={img} alt={"logo that says - adventures with chu"} /> */}
                <div className='brief'>
                    <h1>Welcome to Adventures with Chu</h1>
                    <h3>Start blogging and share with everyone.</h3>
                    {/* Your post might just be someone's next adventure!</h3> */}
                </div>
            </div>

            <main className='containers welcome'>

                <div className='intro'>
                    <div className='featured'>
                        <h3 className="featuredH3">Recent Posts from your followers</h3>
                        <div className='featuredBlogs'>
                            {followingPosts}
                        </div>
                        {/* <picture>
                                <img src={img2} alt={"adventures with chu"} />
                            </picture> */}
                    </div >
                    <div className='underline'>
                        <div className='shadow'></div>
                    </div>
                    {/* <div className='description'>
                            <h3>Having troubles thinking of what to blog?</h3>
                            <p>No worries! Come browse other blogs for inspirations.</p>
                            <picture>
                                <img src={img3} alt={"picture of 3 people and the world"} />
                            </picture>
                        </div> */}
                </div>
                <div className='logo2'>
                    <div className='brief2'>
                        <h1>Come check other blogs!</h1>
                        <button><Link to='/browse'>Browse</Link></button>
                    </div>
                </div>
                <div className='underline'>
                    <div className='shadow'></div>
                </div>
                <div className="new">
                    <h3>What's Happening Around the World</h3>
                    <News />
                </div>
            </main >

            <Footer />
        </div >
    )
}

export default Home
