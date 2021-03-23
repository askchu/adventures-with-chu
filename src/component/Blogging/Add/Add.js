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
import instance from '../../../axios-orders';
import { isCompositeComponent } from 'react-dom/test-utils';
import GetData from './GetData/GetData';
import ShowCurrentImages from './ShowCurrentImages/ShowCurrentImages';
import Modal from '../ImageGrid/Modal/Modal';
import ModalDescription from './ModalDescription/ModalDescription';




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
    const [id, setId] = useState('');
    const [selectedImg, setSelectedImg] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [savedDescription, setSavedDescription] = useState(null);

    console.log(id);

    // Grabs images from new blog page
    const { datas } = GetData(docs, count.id, savedDescription);
    console.log(datas);



    const handleChange = (e) => {
        const types = ['image/png', 'image/jpeg'];
        let selected = e.target.files[0];
        let countArrayNumber = 0

        if (count.length > 1) {
            countArrayNumber = count.length - 1;
        }
        console.log(countArrayNumber);
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setId(count.id);
            setError('');

        } else {
            setFile(null);
            setId('');
            setError('Please select an image file (png or jpeg)');
        }
    }


    const grabCount = async () => {
        console.log(count);
        await instance.get(`/${currentUser.uid}/count.json`)
            .then(response => {
                console.log(response.data)
                console.log(response.data.length)
                let res = []
                for (let key in response.data) {
                    res.push({
                        ...response.data[key],
                        id: key
                    })
                }
                console.log(res.length);
                let arrayNum = 0;

                if (res.length > 1) {
                    arrayNum = res.length - 1;
                }
                setCount(res[arrayNum]);
            })
            .catch(err => console.log(err));
    }



    useEffect(async () => {

        console.log(count);
        grabCount();

    }, [])


    console.log(count);
    // const key = dataId[0]
    // console.log(key.id);


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

    console.log(selectedImg);
    console.log(selectedId);
    console.log(`this is savedDescription from Add Page ${savedDescription}`)

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
                        <span><i className="fas fa-plus"></i></span>
                    </div>
                    <div className='output'>
                        {error && <div className='errors'>{error}</div>}
                        {file && file.name}
                        {file && <ProgressBar file={file} setFile={setFile} id={id} setId={setId} />}
                    </div>
                </div>

                <ShowCurrentImages data={datas} setSelectedImg={setSelectedImg} setSelectedId={setSelectedId} setSelectedDescription={setSelectedDescription} />
                {selectedImg &&
                    <ModalDescription
                        selectedImg={selectedImg} setSelectedImg={setSelectedImg}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        selectedDescription={selectedDescription} setSelectedDescription={setSelectedDescription}
                        count={count.id}
                        savedDescription={setSavedDescription} />}
                <div className='newBlog-input'>
                    <label>Content </label>
                    <textarea rows='20' cols='100' placeholder='Start writing here...'></textarea>
                </div>
                <div className='newBlog-post'>
                    <button
                        // disabled={loading}
                        type='submit'
                        onClick={submitPostHandler}
                    >Post
                </button>
                </div>
            </form>
        </div>
    )
}
