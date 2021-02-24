import axios from 'axios';
import React, { Component } from 'react'
import instance from '../../../axios-orders';
import ShowPosts from '../ShowPosts/ShowPosts';
import './Edit.css'



class Edit extends Component {
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
        this.inputRef1 = React.createRef();
        this.inputRef2 = React.createRef();
        this.inputRef3 = React.createRef();
        this.inputRef4 = React.createRef();
        this.inputChange = this.inputChange.bind(this);
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

    inputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        // this.inputRef.current.focus();
        this.getData();
    }

    onDelete() {
        axios.delete(`https://facebook-blog-app-default-rtdb.firebaseio.com/posts/${this.state.id}.json`)
            .then(response => {
                this.props.history.push('/profile/my-blogs');
                console.log(`${this.state.id} has been deleted`)
            })
            .catch(err => console.log(err));
    }

    editPost(newPost) {
        axios.request({
            method: 'put',
            url: `https://facebook-blog-app-default-rtdb.firebaseio.com/posts/${this.state.id}.json`,
            data: newPost
        }).then(response => {
            this.props.history.push(`/profile/my-blogs/${this.state.id}`);
        })
            .catch(err => console.log(err));
    }

    onSubmit(e) {
        const newPost = {
            title: this.inputRef1.current.value,
            author: this.inputRef2.current.value,
            date: this.state.date,
            content: this.inputRef4.current.value
        }
        console.log(newPost)
        this.editPost(newPost);
        e.preventDefault();
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
                    <h1>Edit Page</h1>
                    <button><a href={`/profile/my-blogs/${this.state.id}`}>Back</a></button>
                    <button onClick={this.onDelete.bind(this)}>Delete <i className='garbage far fa-trash-alt'></i></button>
                </div>


                <div className='edit'>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className='input-field'>
                            <label htmlFor='title'>Title:</label>
                            <input type='text' name='title' ref={this.inputRef1} value={this.state.title} onChange={this.inputChange} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='author'>Author:</label>
                            <input type='text' name='author' ref={this.inputRef2} value={this.state.author} onChange={this.inputChange} />
                        </div>
                        {/* <div className='input-field'>
                            <label htmlFor='date'>Date:</label>
                            <input type='text' name='date' ref={this.inputRef3} value={time.toLocaleTimeString('en-US')}
                                onChange={this.inputChange} />
                        </div> */}
                        <div className='input-field'>
                            <label htmlFor='content'>Content:</label>
                            <textarea rows="4" name='content' ref={this.inputRef4} value={this.state.content} onChange={this.inputChange} />
                        </div>
                        <input type='submit' value='Save' />
                    </form>

                </div>

            </div>
        )
    }
}

export default Edit




// const Edit = (props) => {




//     const { id } = props.match.params;
//     let blog = {
//         id: { id },
//         author: ''
//     }

//     const getData = () => {
//         let res = []
//         instance.get(`/posts/${id}.json`)
//             .then(response => {
//                 console.log(response.data)
//                 // console.log(response.data.author)

//                 // id: response.data.id,
//                 // author: response.data.author,
//                 // content: response.data.content,
//                 // date: response.data.date

//                 res = [{
//                     author: response.data.author,
//                     date: response.data.date,
//                     content: response.data.content
//                 }]
//                 return res
//                 // for (let key in response.data) {
//                 //     results.push({
//                 //         ...response.data,
//                 //         id: key
//                 //     })
//                 // }
//                 // console.log(results[0].author);
//                 // return blog = {
//                 //     author: results[0].author
//                 // }
//             })
//         return res;
//     }

//     const x = getData();



//     console.log(x);

//     // const post = (
//     //     blog.map(results => (
//     //         <ShowPosts key={results.id}
//     //             author={results.author}
//     //             date={results.date}
//     //             content={results.content}
//     //             id={results.id}
//     //         />
//     //     ))
//     // )

//     return (
//         <div className='container'>
//             <h1>Edit</h1>
//             Id: {id}
//             <h3>Edited on: {new Date().toLocaleTimeString()}</h3>
//             {/* {post} */}
//         </div>
//     )
// }




// export default Edit
