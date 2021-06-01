import React, { Component } from 'react'
import axios from 'axios';
import ShowNews from './ShowNews/ShowNews';
import './News.css'

class News extends Component {
    constructor(props) {
        super();
        this.state = {
            news: [],
        }
        // console.log('constructor');
    }

    componentDidMount() {
        const token = process.env.REACT_APP_GNEWS;

        axios.get(`https://gnews.io/api/v4/search?q=news&max=3&lang=en&token=${token}`)
            .then(response => {
                // console.log(response.data);
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
                this.setState({ news: results })
            })
    }



    render() {
        const news = (
            this.state.news.map(results => {
                // console.log(results);
                return (
                    <ShowNews key={results.date}
                        title={results.title}
                        // author={results.author}
                        // content={results.content}
                        description={results.content}
                        url={results.url}
                        img={results.image}
                    />
                )
            })
        )
        return (
            <div className='worldNews'>
                {news}
            </div>
        )
    }
}

export default News
