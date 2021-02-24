import React, { Component } from 'react';
import './Posts.css';
import instance from '../../../axios-orders';
import ShowPosts from '../ShowPosts/ShowPosts';
import Aux from '../../../hoc/Auxilary/Auxilary';



class Posts extends Component {
    constructor(props) {
        super();
        this.state = {
            // author: '',
            // date: '',
            // content: '',
            posts: [],
            submitted: false
        }
        console.log('constructor');
    }

    newPostHandler = () => {
        // alert("Add new post!");
        let post = {
            author: this.state.author,
            date: this.state.date,
            content: this.state.content
        }
        instance.post('/posts.json', post)
            .then(response => {
                console.log(response)
                // window.location.reload();
                // this.setState({ submitted: true })
                this.getData();
                return this.setState({ author: '', date: '', content: '' })
            })
            .catch(error => console.log(error));
    }

    getData = () => {
        instance.get('/posts.json')
            .then(response => {
                console.log(response.data)
                const results = [];
                for (let key in response.data) {
                    results.unshift({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({ posts: results })
            })
    }

    componentDidMount() {
        this.getData();
        console.log('component did mount');
    }

    // componentDidUpdate() {
    //     console.log('componentDidUpdate')
    // }

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
            <Aux>
                <div className="blog">

                    <div className='profile'>
                        <h5>Profile</h5>
                        <div className='pic'><img />I am img</div>
                        <p>User: Alex Chu</p>
                        <button>Account</button>
                        <button>Following</button>
                        <button>Settings</button>
                    </div>
                    <div className="posts">
                        <h5>My Blogs</h5>
                        <div className='icon'>
                            <a href='/profile/my-blogs/new'>New Blog<i className="fas fa-plus"></i></a>
                        </div>
                        <div id="blogs">
                            {post}
                        </div>
                    </div>

                </div>
            </Aux>
        )
    };
}




export default Posts;
