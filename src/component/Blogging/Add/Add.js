
import React, { useState, useRef } from 'react'
import './Add.css';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';
import ProgressBar from '../../ProgressBar/ProgressBar';
import ImageGrid from '../ImageGrid/ImageGrid';


export default function Add() {
    const titleRef = useRef();
    const contentRef = useRef();
    const { currentUser, updateProfile } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const history = useHistory();




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

    console.log(currentUser);


    return (
        <div className='container'>
            <div className='containers'></div>
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
                <ImageGrid />
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
