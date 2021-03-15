// import React, { Component } from 'react'
// import instance from '../../../axios-orders';
// import { useAuth } from '../../Authentication/AuthContext/AuthContext';
// import './Add.css';

// export class Add extends Component {
//     constructor(props) {
//         super();
//         this.state = {
//             title: '',
//             author: '',
//             date: '',
//             content: '',
//             posts: [],
//         }
//         console.log('constructor');
//     }

//     componentDidMount() {
//         const monthNames = ["January", "February", "March", "April", "May", "June",
//             "July", "August", "September", "October", "November", "December"];
//         const date = new Date()
//         const month = monthNames[date.getMonth()];
//         const day = String(date.getDate()).padStart(2, '0');
//         const year = date.getFullYear();
//         const output = month + ' ' + day + ', ' + year;
//         this.setState({ date: output });
//     }

//     newPostHandler = () => {
//         console.log(this.state.date);
//         let post = {
//             title: this.state.title,
//             author: this.state.author,
//             date: this.state.date,
//             content: this.state.content
//         }
//         console.log(post);
//         instance.post('/posts.json', post)
//             .then(response => {
//                 console.log(response)
//                 this.props.history.push('/profile/my-blogs');
//             })
//             .catch(error => console.log(error));
//     }


//     render() {


//         return (
//             <div className='container'>
//                 <div className='title'>
//                     <h1>New Blog</h1>
//                     <button><a href="/profile-blogs">Back</a></button>
//                 </div>


//                 <div className='form'>
//                     <div className='input-field'>
//                         <label>Title:</label>
//                         <input type='text' value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
//                     </div>
//                     <div className='input-field'>
//                         <label>Author:</label>
//                         <input type='text' value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })} />
//                     </div>
//                     <div className='input-field'><label>Content</label>
//                         <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
//                     </div>
//                     <button
//                         onClick={this.newPostHandler}
//                     >Add Post
//                     </button>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Add


import React, { useState, useRef } from 'react'
import './Add.css';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';
import ProgressBar from '../../ProgressBar/ProgressBar';
import ImageGrid from '../ImageGrid/ImageGrid';
import useFirestore from '../../../hooks/useFirestore';
import ShowImages from './ShowImages/ShowImages';

export default function Add() {
    const titleRef = useRef();
    const contentRef = useRef();
    const { currentUser, updateProfile } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const { docs } = useFirestore(currentUser.uid);
    const history = useHistory();

    console.log(docs.length);


    const newPostHandler = () => {
        let post = {
            title: titleRef.current.value,
            content: contentRef.current.value,
        }
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date()
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = year + '/' + month + '/' + day;


    // console.log(output);

    const handleChange = (e) => {
        const types = ['image/png', 'image/jpeg'];
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg)');
        }
    }
    const [imgUrl, setImgUrl] = useState([]);



    return (
        <div className='container'>
            <div className='title'>
                <h1>New Blog</h1>
                <button><a href="/profile-blogs">Back</a></button>
            </div>
            <form className='newBlog'>
                <div className='newBlog-input'>
                    <label>Title </label>
                    <input type='text' ref={titleRef} autoFocus />
                </div>
                <div className='newBlog-input'>
                    <label>Images </label>
                    <div className='inputFile'>
                        <input type='file' onChange={handleChange} />
                        <span><i class="fas fa-plus"></i></span>
                    </div>
                    <div className='output'>
                        {error && <div className='errors'>{error}</div>}
                        {file && file.name}
                        {file && <ProgressBar file={file} setFile={setFile} />}
                    </div>
                </div>
                {/* <ImageGrid /> */}
                <ShowImages change={file} />
                <div className='newBlog-input'>
                    <label>Content </label>
                    <textarea rows='20' cols='100' placeholder='Start writing here...'></textarea>
                </div>
                <div className='newBlog-post'>
                    <button disabled={loading} type='submit'
                    // onClick={this.newPostHandler}
                    >Post
                </button>
                </div>
            </form>
        </div>
    )
}
