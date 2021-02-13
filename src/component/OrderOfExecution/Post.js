import React, { Component } from 'react'
import Blog from './Blog'


class Post extends Component {
    constructor() {
        super();
        const todoCounter = 2;
        this.state = {
            todoCounter: todoCounter,
            author: '',
            content: '',
            post: [
                {
                    id: "1",
                    author: 'Alex',
                    content: 'I like boooooooooo',
                },
                {
                    id: '2',
                    author: 'G',
                    content: 'I like Alexxxx'
                }
            ],

        }
    }

    submitPost() {
        const newId = this.state.todoCounter + 1;
        const author = this.state.author;
        const content = this.state.content;
        const newPost = [
            ...this.state.post,
            { id: newId, author: author, content: content }
        ];
        this.setState({ post: newPost, todoCounter: newId });
        return (
            this.setState({ author: '', content: '' })
        )
    }

    componentDidMount() {
        console.log('lifeCycleA componentdidmount');
    }

    // shouldComponentUpdate() {
    //     console.log('lifeCycleA shouldComponentUpdate');
    //     return true
    // }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     console.log('lifeCycleA getSnapshitBeforeUpdate');
    //     return null
    // }

    componentDidUpdate() {
        console.log('lifeCycleA shouldComponentDidUpdate')
    }

    render() {
        const blog = this.state.post.map((post) => (
            <div>
                <Blog key={post.id} posts={post} />
            </div>
        ))
        return (
            <div>
                <label>Author:</label>
                <input type='text' value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                <button onClick={this.submitPost.bind(this)}>Add New Post</button>
                {blog}
            </div>
        )
    }
}


export default Post
