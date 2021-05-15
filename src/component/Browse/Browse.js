import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import './Browse.css';



export default function Browse() {
    const [articles, setArticles] = useState([]);
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

    useEffect(() => {
        // browseData();
    }, []);

    console.log(articles);

    let blog = '';
    let content = articles.map(doc => {
        if (articles.length > 0) {
            console.log(doc.content)

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
                {/* TODO: FIX THE CSS STYLING */}
                {/* {articles.map((doc) => (
                    <div className='blog'>
                        <h2>{doc.title}</h2>
                        <img src={doc.image} />
                        <p>{content}</p>
                    </div>
                ))} */}
                {content}
            </div>
        </div >
    )
}
