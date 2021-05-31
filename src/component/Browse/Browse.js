import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import './Browse.css';
import instance from '../../axios-orders';
import { useAuth } from '../Authentication/AuthContext/AuthContext';
import Footer from '../Navigation/Footer/Footer';
import Aux from '../../hoc/Auxilary/Auxilary';
import img1 from '../../assets/images/img1.jpg';

export default function Browse() {
    const [articles, setArticles] = useState([]);
    const [userData, setUserData] = useState([]);
    const [foundUser, setFoundUser] = useState([]);
    const inputRef = useRef();
    const token = process.env.REACT_APP_GNEWS;
    // console.log(token);

    // if (process.env.NODE_ENV === 'development') {
    //     console.log(process.env.REACT_APP_DEV_MODE);
    // }
    const { currentUser } = useAuth();


    const searchData = (e) => {
        e.preventDefault();
        console.log(inputRef.current.value);
        browseData(inputRef.current.value);

        if (userData) {
            findUser(inputRef.current.value);
        }
        inputRef.current.value = null;
    }


    const browseData = async (searchValue) => {
        // max articles = 10
        // lang = language is english
        await axios.get(`https://gnews.io/api/v4/search?q=${searchValue}&max=10&lang=en&token=${token}`)
            .then(response => {
                console.log(response.data);
                let results = [];
                for (let key of response.data.articles) {
                    results.push({
                        content: key.content,
                        description: key.description,
                        image: key.image,
                        date: key.publishedAt,
                        source: key.source,
                        title: key.title,
                        url: key.url
                    })
                }
                setArticles(results);
            })
            .catch(err => console.log(err))



    }
    console.log(userData);



    // return UserNames if it matches the searchbar current value and render users back.
    const findUser = (userName) => {
        // const user = userData.find(function (employee) {
        //     return employee.name.indexOf(userName) > -1;
        // });

        const user = userData.filter(function (employee) {
            return employee.name.indexOf(userName) > -1;
        });

        console.log(user);

        // console.log(user);
        setFoundUser(user);
    }
    console.log(foundUser);

    const [profileId, setProfileId] = useState('');
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState('')

    console.log(profileId);
    console.log(followers);




    const followUser = async (user) => {
        setFollowing(null);

        let userObjectKey = ''
        await instance.get(`https://auth-production-90d68-default-rtdb.firebaseio.com/users/${user.id}/profile.json`)
            .then(res => {
                userObjectKey = Object.keys(res.data);
            })
            .catch(err => console.log(err));

        console.log(userObjectKey);

        // console.log(user);
        const follower = {
            // name: user.name,
            // location: user.location,
            // image: user.images,
            id: user.id
        }
        console.log(user);
        console.log(follower);

        const loggedUser = {
            id: currentUser.uid
        }

        let followerId = [];
        if (followers) {
            // console.log(Object.keys(followers))
            let numberOfObject = Object.keys(followers)
            // console.log(numberOfObject);
            // console.log(numberOfObject.length);
            for (let i = 0; i < numberOfObject.length; i++) {
                console.log(followers[numberOfObject[i]]);
                console.log(followers[numberOfObject[i]].id);
                followerId.push({ id: followers[numberOfObject[i]].id })
            }
            console.log(followerId);

        }

        let profileData = {
            id: user.id
        }
        console.log(profileData.id);



        let data = followerId.some(function (doc) {
            return doc.id == user.id
        })
        console.log(data);
        if (data == true) {
            console.log('already following');
        }

        if (data == false || !followers) {
            console.log('not following');
            await instance.post(`https://auth-production-90d68-default-rtdb.firebaseio.com/users/${currentUser.uid}/profile/${profileId}/following.json`, follower)
                .then(response => {
                    console.log(response);
                    setFollowing('changed');
                })
                .catch(err => console.log(err));

            await instance.post(`https://auth-production-90d68-default-rtdb.firebaseio.com/users/${user.id}/profile/${userObjectKey[0]}/followers.json`, loggedUser)
                .then(response => {
                    console.log(response);
                    setFollowing('changed');
                })
                .catch(err => console.log(err));
        }
    }

    let displayUsers = ''
    let userInfo = ''
    let images = '';
    if (foundUser) {
        displayUsers = foundUser.map(doc => {
            // console.log(doc.name);
            // console.log(doc.images);


            // console.log(images);
            let pic = ''
            if (doc.images) {
                images = Object.values(doc.images);
                pic = images[0].imageUrl;
            }
            if (!doc.images) {
                pic = img1
            }
            if (currentUser.uid === doc.id) {
                userInfo = (
                    <div className='user'>
                        <div className='image'>
                            <img src={pic} />

                        </div>
                        <h2>{doc.name}</h2>
                        <p>{doc.location}</p>
                    </div>
                )
            }
            if (currentUser.uid !== doc.id) {
                userInfo = (
                    <div className='user'>
                        <div className='image'>
                            <img src={pic} />

                        </div>
                        <h2>{doc.name}</h2>
                        <p>{doc.location}</p>
                        <button onClick={() => followUser(doc)}>Follow</button>
                    </div>
                )
            }

            if (followers) {
                let numberOfObject = Object.keys(followers)
                // console.log(numberOfObject);
                // console.log(numberOfObject.length);
                let followerId = [];

                for (let i = 0; i < numberOfObject.length; i++) {
                    console.log(followers[numberOfObject[i]]);
                    console.log(followers[numberOfObject[i]].id);
                    followerId.push({ id: followers[numberOfObject[i]].id })
                }
                console.log(followerId);


                const data = followerId.some(function (res) {
                    return res.id == doc.id
                })
                console.log(data);
                if (data == true) {
                    console.log('already following');
                    userInfo = (
                        <div className='user'>
                            <div className='image'>
                                <img src={pic} />

                            </div>
                            <h2>{doc.name}</h2>
                            <p>{doc.location}</p>
                            <button className='following'>Following</button>
                        </div>
                    )
                }
            }


            // if (followers) {

            // }
            return (
                <div className='userProfile'>
                    {userInfo}
                </div>
            )
        })
    }



    // console.log(currentUser.uid);


    useEffect(async () => {
        // browseData();
        await instance.get(`https://auth-production-90d68-default-rtdb.firebaseio.com/users.json`)
            .then(response => {
                console.log(response.data);
                let results = []
                console.log(Object.keys(response.data));
                let object = Object.keys(response.data);
                console.log(object.length);

                for (let i = 0; i < object.length; i++) {
                    console.log(response.data[object[i]].profile);
                    let object1 = Object.keys(response.data[object[i]].profile)
                    console.log(object);
                    let object2 = Object.values(response.data[object[i]].profile);
                    console.log(object2);
                    results.push({
                        id: object[i],
                        name: object2[0].name,
                        location: object2[0].location,
                        images: object2[0].images
                    })
                }

                console.log(results);
                setUserData(results);
            })
            .catch(err => console.log(err));


        await instance.get(`users/${currentUser.uid}/profile.json`)
            .then(response => {
                console.log(response.data)
                let dataValue = Object.values(response.data)
                let dataId = Object.keys(response.data);
                console.log(dataValue);
                console.log(dataId);
                setFollowers(dataValue[0].following)
                setProfileId(dataId[0]);
            })
            .catch(err => console.log(err));
    }, [following]);

    // console.log(articles);

    let blog = '';
    let content = articles.map(doc => {
        if (articles.length > 0) {
            // console.log(doc.content)

            if (doc.content.length > 200) {
                blog = (
                    <div>
                        <h2>{doc.title}</h2>
                        <img src={doc.image} />
                        < p > {doc.content.slice(0, 199)}...<span><a href={doc.url} target="__blank"> Read More.</a></span></p >
                    </div>
                )
            }
        }
        return (
            <div className='blog'>
                {blog}
            </div>
        )
    })


    // TODO: Make categories of just users, news, everything

    return (

        <div className="home">
            <div className='browse'>
                <div className='search'>
                    <form onSubmit={searchData} className='browseForm'>
                        <div className='browseInput'>
                            <label>Browse</label>
                            <input type='text' ref={inputRef} />
                        </div>
                        <button type='submit'>Search</button>
                    </form>
                </div>
                <div className='grids'>
                    {displayUsers}
                    {content}
                </div>
            </div>
            <Footer />
        </div >
    )
}
