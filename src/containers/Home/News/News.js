import React, { Component } from 'react'
import axios from 'axios';
import ShowNews from './ShowNews/ShowNews';

class News extends Component {
    constructor(props) {
        super();
        this.state = {
            news: [],
        }
        console.log('constructor');
    }

    componentDidMount() {
        axios.get('http://newsapi.org/v2/everything?' +
            'qInTitle=vacation&' +
            // 'from=2021-02-22&' +
            'sortBy=popularity&' +
            'apiKey=1b2cf9f17cb94f8fbb7fd0f5fd2ff074')
            .then(response => {
                const articles = [];
                // console.log(response.data);
                for (let i = 0; i < 3; i++) {
                    // console.log(response.data.articles[i]);
                    articles.push({
                        // ...response.data[i],
                        id: i,
                        author: response.data.articles[i].author,
                        title: response.data.articles[i].title,
                        // content: response.data.articles[i].content,
                        description: response.data.articles[i].description,
                        url: response.data.articles[i].url,
                        urlImg: response.data.articles[i].urlToImage
                    })
                }
                this.setState({ news: articles })
                console.log(this.state.news)
            })
            .catch(err => {
                console.log(err);
            })
    }



    render() {
        const news = (
            this.state.news.map(results => (
                <ShowNews key={results.id}
                    title={results.title}
                    author={results.author}
                    // content={results.content}
                    description={results.description}
                    url={results.url}
                    img={results.urlImg}
                />
            ))
        )
        return (
            <div>
                {news}
            </div>
        )
    }
}

export default News
