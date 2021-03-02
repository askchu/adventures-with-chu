import React, { Component } from 'react'
import './Home.css';
import img from '../../assets/images/logo3.png';
import img2 from '../../assets/images/img2.svg';
import img3 from '../../assets/images/img3.png';
import News from './News/News';
import instance from '../../axios-orders';
import ShowPosts from '../../component/Blogging/ShowPosts/ShowPosts';

class Home extends Component {
    constructor(props) {
        super();
        this.state = {

            posts: [],

        }
        console.log('constructor');
    }

    componentDidMount() {
        this.getData();
        console.log('component did mount');
    }

    getData = () => {
        instance.get('/posts.json')
            .then(response => {
                console.log(response.data)

                console.log(response.data)

                const results = [];

                for (let key in response.data) {
                    results.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({ posts: results })
                console.log(this.state.posts);
            })
    }

    render() {

        const post = (
            this.state.posts.map(results => (
                <ShowPosts key={results.id}
                    title={results.title}
                    author={results.author}
                    date={results.date}
                    content={results.content}
                    id={results.id}
                />
            ))
        )

        return (
            <div className='home'>
                <div className='logo'>
                    <img src={img} alt={"logo that says - adventures with chu, exploring the world one trip at a time"} />
                </div>

                <main className='welcome'>
                    <div className='intro'>
                        <div className='description'>
                            <h3>Welcome to Adventures with Chu!</h3>
                            <p>Start blogging and share your trips with everyone. Your trip might just be someone's next adventure!</p>
                            <h4>Having troubles planning where to go next?</h4>
                            <p>No worries! Come check out other blogs and their recommendations. If not, check our recommended lists and start from there!</p>
                            <img src={img3} alt={"picture of 3 people and the world"} />
                        </div>
                        {/* <picture className="img">
                            <img src={img2} alt={"adventures with chu"} />
                        </picture> */}
                        <div className='featured'>
                            <h3 className="featuredH3">Featured blogs of the day</h3>
                            <div className='featuredBlogs'>
                                {post}
                            </div>
                            <picture>
                                <img src={img2} alt={"adventures with chu"} />
                            </picture>
                        </div >
                    </div>


                    <div className="new">
                        <h3>What's New</h3>
                        <News />
                    </div>
                </main >

            </div >
        )
    }
}

export default Home;
