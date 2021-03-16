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


import React, { useState, useRef, useEffect } from 'react'
import './Add.css';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';
import ProgressBar from '../../ProgressBar/ProgressBar';
import ImageGrid from '../ImageGrid/ImageGrid';
import useFirestore from '../../../hooks/useFirestore';
import ShowImages from './ShowImages/ShowImages';
import instance from '../../../axios-orders';
import { isCompositeComponent } from 'react-dom/test-utils';
import GetData from './GetData/GetData';




export default function Add() {
    const inputRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();
    const { currentUser, updateProfile } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const { docs } = useFirestore(currentUser.uid);
    const history = useHistory();



    const [info, setInfo] = useState([]);
    const [count, setCount] = useState([]);


    // Grabs images from new blog page
    const { datas } = GetData(docs);
    console.log(datas);


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


    useEffect(async () => {

        console.log(count);
        await instance.get(`/${currentUser.uid}/count.json`)
            .then(response => {
                console.log(response.data)
                let res = []
                for (let key in response.data) {
                    res.push({
                        ...response.data[key],
                        id: key
                    })
                }
                setCount(res);
            })
            .catch(err => console.log(err));
    }, [])


    console.log(count);
    // console.log(count[0].id);
    // console.log(count);
    // console.log(count[0].count);
    // const turnTo = parseInt(count[0].count);
    // console.log('this is the number of count: ' + turnTo);

    const editPost = (newCount) => {

        const countId = count[0].id

        instance.request({
            method: 'put',
            url: `/${currentUser.uid}/count/${countId}.json`,
            data: newCount
        }).then(response => {
            this.props.history.push(`/profile-blogs`);
        })
            .catch(err => console.log(err));
    }


    const submitPostHandler = (event) => {
        // const newCount = `${setCount(count + 1)}`;
        // editPost(newCount)

        // setCount(count[0].count = )

        event.preventDefault();
        // history.push('/profile-blogs');
    }


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
                        <input type='file' onChange={handleChange} ref={inputRef} />
                        <span><i class="fas fa-plus"></i></span>
                    </div>
                    <div className='output'>
                        {error && <div className='errors'>{error}</div>}
                        {file && file.name}
                        {file && <ProgressBar file={file} setFile={setFile} />}
                    </div>
                </div>
                {/* <ImageGrid /> */}
                {/* <ShowImages userId={user} /> */}
                {datas && datas.map(urls => (
                    <li key={urls.id}><strong>{urls.id}</strong>: {urls.imageUrl}</li>
                ))}
                <div className='newBlog-input'>
                    <label>Content </label>
                    <textarea rows='20' cols='100' placeholder='Start writing here...'></textarea>
                </div>
                <div className='newBlog-post'>
                    <button
                        // disabled={loading}
                        type='submit'
                    // onClick={submitPostHandler}
                    >Post
                </button>
                </div>
            </form>
        </div>
    )
}
