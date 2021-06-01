import React, { useEffect, useState } from 'react'
import './Home.css';
import News from './News/News';
import instance from '../../axios-orders';
import Footer from '../../component/Navigation/Footer/Footer';
import { Link, useHistory } from 'react-router-dom';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import { useAuth } from '../../component/Authentication/AuthContext/AuthContext';
import ProgressBar from '../../component/ProgressBar/ProgressBar';
import img1 from '../../assets/images/default-profile-picture1.jpg'
import Featured from './Featured/Featured';

function Home() {
    const { currentUser } = useAuth();
    const [profile, setProfile] = useState([]);
    const [foundCurrentUser, setCurrentUser] = useState('');
    const [followingData, setFollowingData] = useState([]);
    const { history } = useHistory();

    // console.log(profile);
    // console.log(followingData);

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
            let object = Object.keys(profile);
            // console.log(object)
            // console.log(object.length)
            if (object.length > 0) {
                // console.log(profile[0].profile);
                const results = Object.values(profile[0].profile);
                const following = Object.values(results[0].following);
                // console.log(following);
                // console.log(following.length);
                let data = [];
                for (let i = 0; i < following.length; i++) {
                    await instance.get(`/users/${following[i].id}.json`)
                        .then(res => {
                            // console.log(res);
                            data.push({ ...res.data, id: following[i].id })
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




    useEffect((foundCurrentUser) => {
        window.scrollTo(0, 0)

        if (!currentUser) {
            // console.log('not logged in')
        }
        if (currentUser) {
            grabUserProfile();
        }
        if (profile) {
            grabFollowingData()
        }

    }, [foundCurrentUser])


    const id = (e) => {
        console.log(e)
    }

    let displayFollowers = <div></div>;
    let followerBlogs = [];
    let followingUsers = (
        <div>

        </div>);
    let followingPosts = <div></div>;
    let finalResults = <div></div>

    // console.log(followingData);

    const totalUsers = [];
    const totalBlogs = [];
    if (followingData) {
        // console.log(followingData);
        // console.log(followingData.length);
        if (followingData.length > 0) {
            followingData.map(doc => {
                // console.log(doc);
                // console.log(doc.blogs);
                const blogObj = Object.keys(doc.blogs);
                // console.log(blogObj);
                // const blogContent = Object.values(doc.blogs);
                const blogContent = []
                // console.log(blogObj.length);

                for (let i = 0; i < blogObj.length; i++) {
                    // console.log(doc.blogs[blogObj[i]]);
                    blogContent.push({
                        id: blogObj[i],
                        content: doc.blogs[blogObj[i]].content,
                        images: doc.blogs[blogObj[i]].images
                    })
                }

                // console.log(blogContent)

                const id = doc.id
                // console.log(blogs)
                // console.log(profile)
                const profileValues = Object.values(doc.profile);
                // console.log(id);
                totalUsers.push({
                    blogs: blogContent,
                    profileName: profileValues[0].name,
                    profilePic: profileValues[0].images,
                    id
                })

            })
            // console.log(totalUsers);
            totalUsers.map(user => {
                // console.log(user);
                // console.log(user.blogs);
                user.blogs.forEach(doc => {
                    // console.log(doc);
                    totalBlogs.unshift({
                        content: doc.content,
                        images: doc.images,
                        blogId: doc.id,
                        userId: user.id,
                        profileName: user.profileName,
                        profilePic: user.profilePic
                    });
                })
            })
            // console.log(totalBlogs);
            displayFollowers = totalBlogs.map(blog => {
                // console.log(blog);
                const alpha = blog.profileName;
                const blogObj = Object.keys(blog.content)
                // console.log(blogObj[0]);
                let link = `${blog.userId}/blogs/${blog.blogId}`;
                const blogContent = Object.values(blog.content)
                // console.log(blogContent);

                let images = <div></div>;
                if (blog.images) {
                    const imgContent = Object.values(blog.images)
                    // console.log(imgContent);
                    images = (
                        <div className='image'>
                            <img src={imgContent[0].imageUrl} />
                        </div>)
                }
                // default profile picture if none
                let profilePic = <img src={img1} />
                if (blog.profilePic) {
                    const profileImg = Object.values(blog.profilePic)
                    profilePic = <img src={profileImg[0].imageUrl} />
                }

                return (
                    <div key={blogObj[0]} className='blogs'>
                        <div className='following'>
                            <div className='profilePic'>
                                {profilePic}
                            </div>
                            <div className='profileContent'>
                                <h2>{blog.profileName}</h2>
                                <p>{blogContent[0].date}</p>
                            </div>
                        </div>
                        <h4>{blogContent[0].title}</h4>
                        {images}
                        <Link to={link}><button>Read Blog</button></Link>
                    </div>
                )
            }
            )

        }
    }


    let loggedIn = (<div></div>)
    if (currentUser) {
        // console.log("someone logged in")
        if (followingData.length > 0) {
            followingUsers = (
                <div className='featured'>
                    <h3 className="featuredH3">Recent Posts</h3>
                    <div className='featuredBlogs'>
                        {displayFollowers}
                    </div>
                </div >
            )
        }
        if (followingData.length < 1) {
            loggedIn = (
                <div className='logo'>
                    <div className='brief'>
                        <h1>Welcome to Adventures with Chu</h1>
                        <h3>Start blogging and share with everyone.</h3>
                    </div>
                </div>
            )
        }
    }
    if (!currentUser) {
        // console.log("not logged in")
        loggedIn = (
            <div className='logo'>
                <div className='brief'>
                    <h1>Welcome to Adventures with Chu</h1>
                    <h3>Start blogging and share with everyone.</h3>
                </div>
            </div>
        )
    }

    return (
        <div className='home'>
            {/* <div className='logo'>
                <div className='brief'>
                    <h1>Welcome to Adventures with Chu</h1>
                    <h3>Start blogging and share with everyone.</h3>
                </div>
            </div> */}
            {loggedIn}

            {/* <Featured /> */}

            <main className='containers welcome'>

                <div className='intro'>
                    {followingUsers}


                    <div className='underline'>
                        <div className='shadow'></div>
                    </div>

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
