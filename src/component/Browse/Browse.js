import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import './Browse.css';
import instance from '../../axios-orders';


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
        await axios.get(`https://gnews.io/api/v4/search?q=${searchValue}&max=5&lang=en&token=${token}`)
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


    let displayUsers = ''
    let userInfo = ''
    if (foundUser) {
        displayUsers = foundUser.map(doc => {
            console.log(doc.name);
            console.log(doc.images);
            let images = Object.values(doc.images);
            console.log(images);
            let pic = ''
            if (doc.images) {
                pic = images[0].imageUrl;
            }
            if (foundUser.length > 0) {
                userInfo = (
                    <div className='user'>
                        <h2>{doc.name}</h2>
                        <img src={pic} />
                        <p>{doc.location}</p>
                        <button>Follow</button>
                    </div>
                )
            }
            return (
                <div className='userProfile'>
                    {userInfo}
                </div>
            )
        })
    }

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
                    let object2 = Object.values(response.data[object[i]].profile);
                    console.log(object2);
                    results.push({
                        name: object2[0].name,
                        location: object2[0].location,
                        images: object2[0].images
                    })
                }

                console.log(results);
                setUserData(results);
            })
            .catch(err => console.log(err));
    }, []);

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




    return (
        <div className="home">
            <div className='search containers'>
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
        </div >
    )
}
