import React, { useEffect, useState } from 'react'
import './Home.css';
import News from './News/News';
import instance from '../../axios-orders';
import Footer from '../../component/Navigation/Footer/Footer';
import { Link, useHistory } from 'react-router-dom';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import { useAuth } from '../../component/Authentication/AuthContext/AuthContext';
import ProgressBar from '../../component/ProgressBar/ProgressBar';


function Home() {
    const { currentUser } = useAuth();
    const [profile, setProfile] = useState([]);
    const [foundCurrentUser, setCurrentUser] = useState('');
    const [followingData, setFollowingData] = useState([]);
    const { history } = useHistory();

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
            let object = Object.keys(profile);
            console.log(object)
            console.log(object.length)
            if (object.length > 0) {
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
                            data.push({ ...res.data, id: following[i].id })
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
        window.scrollTo(0, 0)

        if (!currentUser) {
            console.log('not logged in')
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

    let followerBlogs = [];
    let followingUsers = (
        <div>

        </div>);
    let followingPosts = [];
    let finalResults = <div></div>

    console.log(followingData);

    if (followingData) {
        if (followingData.length > 0) {
            followingData.map((user) => {
                console.log(user);
                console.log(user.id);
                console.log(user.profile);
                // console.log(user.blogs)
                followerBlogs.push({
                    blogs: user.blogs,
                    id: user.id
                })


                console.log(followerBlogs);
                // console.log(followerBlogs[0]);
                // console.log(followerBlogs[1]);
                console.log(Object.values(followerBlogs));
                const followers = Object.values(followerBlogs);
                console.log(followers);
                const results = Object.values(followerBlogs[0])
                console.log(results);

                console.log(followers);

                followers.map(doc => {

                    console.log(doc);
                    const obj = Object.keys(doc);
                    console.log(obj[0]);
                    const values = doc[obj[0]];
                    const id = doc[obj[1]]
                    console.log(id);
                    console.log(values);
                    let name = '';
                    let images = ''
                    let content = ''
                    console.log(user);
                    let link = ''


                    // const link = `${id}/blogs/${blogObj}`;
                    console.log(link);


                    if (id === user.id) {
                        const profileName = Object.values(user.profile);
                        console.log(profileName);
                        name = profileName[0].name;

                        let profileImg = ''
                        let profileImg1 = ''


                        console.log(name);
                        const overallResults = [];
                        let total = [];
                        const blogObj = Object.keys(values);
                        const results = Object.values(values);
                        const eachObj = Object.keys(user.blogs);
                        console.log(eachObj);
                        console.log(results);
                        console.log(blogObj);
                        console.log(blogObj[0]);
                        console.log(Object.values(values));
                        for (let i = 0; i < blogObj.length; i++) {
                            content = Object.values(results[i].content)
                            console.log(content);
                            console.log(results[i].images);
                            if (results[i].images) {
                                images = Object.values(results[i].images)
                                console.log(images);
                                total = {
                                    content,
                                    images,
                                    value: eachObj[i]
                                }
                            }
                            if (!results[i].images) {
                                total = {
                                    content,
                                    value: eachObj[i]

                                }
                            }
                            console.log(total);
                            overallResults.push(total);
                        }
                        console.log(overallResults);
                        // console.log(results);
                        followingPosts = overallResults.map(res => {
                            console.log(res);
                            if (res.images) {
                                images = Object.values(res.images);
                                content = Object.values(res.content);
                                console.log(images)
                                console.log(content);
                                link = `${id}/blogs/${res.value}`;
                                console.log(link);
                                if (profileName[0].images) {
                                    profileImg = profileName[0].images;
                                    profileImg1 = Object.values(profileName[0].images);
                                    console.log(profileImg)
                                    console.log(profileImg1[0].imageUrl)
                                }
                                return (
                                    <div key={content[0].id} className='blogs'>
                                        <div className='following'>
                                            <div className='profilePic'>
                                                <img src={profileImg1[0].imageUrl} />
                                            </div>
                                            <div className='profileContent'>
                                                <h2>{name}</h2>
                                                <p>{content[0].date}</p>
                                            </div>
                                        </div>
                                        <div className='image'>
                                            <img src={images[0].imageUrl} />
                                        </div>
                                        <Link to={link}><button>Read Blog</button></Link>
                                    </div>
                                )
                            }

                            if (!res.images) {
                                content = Object.values(res.content);
                                console.log(content);
                                link = `${id}/blogs/${res.value}`;
                                console.log(link);
                                if (profileName[0].images) {
                                    profileImg = profileName[0].images;
                                    profileImg1 = Object.values(profileName[0].images);
                                    console.log(profileImg)
                                    console.log(profileImg1[0].imageUrl)
                                }
                                return (
                                    <div key={content[0].id} className='blogs'>
                                        <div className='following'>
                                            <div className='profilePic'>
                                                <img src={profileImg1[0].imageUrl} />
                                            </div>
                                            <div className='profileContent'>
                                                <h2>{name}</h2>
                                                <p>{content[0].date}</p>
                                            </div>
                                        </div>
                                        {/* <div className='image'>
                                    <img src={images[0].imageUrl} />
                                </div> */}
                                        {/* <p>{values[0].content}</p> */}
                                        <h4>{content[0].title}</h4>
                                        <Link to={link}><button>Read Blog</button></Link>
                                    </div>
                                )
                            }
                        })
                    }

                    if (id !== user.id) {
                        console.log("not the same id")
                        const user = followingData.filter(function (follower) {
                            return follower.id.indexOf(id) > -1;
                        });
                        console.log(user);
                        console.log(user[0].profile);
                        const profileName = Object.values(user[0].profile);
                        name = profileName[0].name;

                        let profileImg = '';
                        let profileImg1 = '';
                        console.log(name);
                        console.log(user[0].blogs);
                        const blogs = Object.keys(user[0].blogs);
                        console.log(blogs);
                        const eachObj = Object.keys(user[0].blogs);
                        console.log(eachObj);
                        const blogValues = Object.values(user[0].blogs);
                        console.log(blogValues);
                        console.log(blogs.length);
                        let blogsObj = ''
                        let content = ''
                        let image = '';
                        let total = [];
                        const userBlogs = []

                        if (blogs.length > 0) {
                            for (let i = 0; i < blogs.length; i++) {
                                content = Object.values(blogValues[i].content)
                                if (blogValues[i].images) {
                                    image = Object.values(blogValues[i].images)
                                    console.log(image);
                                    // userBlogs.push(content)
                                    total = {
                                        content,
                                        image,
                                        value: eachObj[i]
                                    }
                                }
                                if (!blogValues[i].images) {
                                    total = {
                                        content,
                                        value: eachObj[i]

                                    }
                                }
                                console.log(total);
                                userBlogs.push(total);
                            }
                            console.log(userBlogs);
                            finalResults = userBlogs.map(post => {
                                console.log(post);
                                console.log(post.value);
                                if (post.image) {
                                    images = Object.values(post.image);
                                    content = Object.values(post.content);
                                    console.log(images)
                                    console.log(content);
                                    link = `${id}/blogs/${post.value}`;
                                    console.log(link);
                                    if (profileName[0].images) {
                                        profileImg = profileName[0].images;
                                        profileImg1 = Object.values(profileName[0].images);
                                        console.log(profileImg)
                                        console.log(profileImg1[0].imageUrl)
                                    }
                                    return (
                                        <div key={content[0].id} className='blogs'>
                                            <div className='following'>
                                                <div className='profilePic'>
                                                    <img src={profileImg1[0].imageUrl} />
                                                </div>
                                                <div className='profileContent'>
                                                    <h2>{name}</h2>
                                                    <p>{content[0].date}</p>
                                                </div>
                                            </div>

                                            <h4>{content[0].title}</h4>
                                            {/* <p>Author: {author[0].name}</p> */}
                                            <div className='image'>
                                                <img src={images[0].imageUrl} />
                                            </div>
                                            <Link to={link}><button>Read Blog</button></Link>
                                        </div>
                                    )
                                }

                                if (!post.images) {
                                    content = Object.values(post.content);
                                    link = `${id}/blogs/${post.value}`;
                                    console.log(link);
                                    console.log(content);
                                    if (profileName[0].images) {
                                        profileImg = profileName[0].images;
                                        profileImg1 = Object.values(profileName[0].images);
                                        console.log(profileImg)
                                        console.log(profileImg1[0].imageUrl)
                                    }
                                    return (
                                        <div key={content[0].id} className='blogs'>
                                            <div className='following'>
                                                <div className='profilePic'>
                                                    <img src={profileImg1[0].imageUrl} />
                                                </div>
                                                <div className='profileContent'>
                                                    <h2>{name}</h2>
                                                    <p>{content[0].date}</p>
                                                </div>
                                            </div>
                                            <Link to={link}><button>Read Blog</button></Link>
                                        </div>
                                    )
                                }
                            })
                        }


                    }








                }
                )

                // console.log(followingPosts);
                // console.log(followerBlogs);

                followingUsers = (
                    <div className='featured'>
                        <h3 className="featuredH3">Recent Posts</h3>
                        <div className='featuredBlogs'>
                            {finalResults}
                            {followingPosts}
                        </div>
                    </div >
                )
            })

        }
    }


    let loggedIn = (<div></div>)
    if (currentUser) {
        console.log("someone logged in")
    }
    if (!currentUser) {
        console.log("not logged in")
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

            <main className='containers welcome'>

                <div className='intro'>
                    {followingUsers}
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
