import React, { Component } from 'react'
import instance from '../../../axios-orders';
import './ShowBlog.css'



class ShowBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            title: '',
            author: '',
            date: '',
            content: '',
            post: [],
        }
    }



    getData = () => {
        instance.get(`/posts/${this.state.id}.json`)
            .then(response => {
                // console.log(response.data)
                this.setState({
                    id: this.state.id,
                    title: response.data.title,
                    author: response.data.author,
                    content: response.data.content,
                    date: response.data.date
                }, () => {
                    console.log(this.state);
                })
            })
    }


    componentDidMount() {
        // this.inputRef.current.focus();
        this.getData();
    }

    render() {
        // console.log(this.state.id);
        console.log(this.state.date);

        const post = {
            ...this.state.post[0]
        };
        // console.log(post);

        const time = new Date();

        return (
            <div className='container'>
                <div className='title'>
                    <h1>{this.state.title}</h1>
                    <button><a href="/profile/my-blogs">Back</a></button>
                    <button><a href={`/profile/my-blogs/${this.state.id}/edit`}>Edit <i className="far fa-edit"></i></a></button>
                </div>

                <h4>Written by: {this.state.author}</h4>
                <p>Posted on: {this.state.date}</p>

                <p>{this.state.content}</p>

            </div>
        )
    }
}

export default ShowBlog



