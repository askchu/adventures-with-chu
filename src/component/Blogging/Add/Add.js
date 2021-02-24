import React, { Component } from 'react'
import instance from '../../../axios-orders';
import './Add.css';

export class Add extends Component {
    constructor(props) {
        super();
        this.state = {
            title: '',
            author: '',
            date: '',
            content: '',
            posts: [],
            // submitted: false
        }
        console.log('constructor');
    }

    newPostHandler = () => {
        // alert("Add new post!");
        let post = {
            title: this.state.title,
            author: this.state.author,
            date: this.state.date,
            content: this.state.content
        }
        instance.post('/posts.json', post)
            .then(response => {
                console.log(response)
                // window.location.reload();
                // this.setState({ submitted: true })
                // this.getData();
                this.props.history.push('/profile/my-blogs');
                // return this.setState({ author: '', date: '', content: '' })
            })
            .catch(error => console.log(error));
    }


    render() {

        // console.log(output);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const date = new Date()
        const month = monthNames[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const output = month + ' ' + day + ', ' + year;
        console.log(output);

        return (
            <div className='container'>
                <div className='title'>
                    <h1>New Blog</h1>
                    <button><a href="/profile/my-blogs">Back</a></button>
                </div>


                <div className='edit'>
                    <div className='input-field'>
                        <label>Title:</label>
                        <input type='text' value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                    </div>
                    <div className='input-field'>
                        <label>Author:</label>
                        <input type='text' value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })} />
                    </div>
                    <div className='input-field'>
                        <label>Date:</label>
                        <input type='text' value={output}
                            onChange={(event) => this.setState({ date: output })}
                        // onChange={(event) => this.setState({ date: event.target.value })}
                        />
                    </div>
                    <div className='input-field'><label>Content</label>
                        <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                    </div>
                    <button
                        onClick={this.newPostHandler}
                    >Add Post
                    </button>
                </div>
            </div>
        )
    }
}

export default Add
