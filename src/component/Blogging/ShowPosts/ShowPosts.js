import React from 'react';
import Edit from '../../../containers/Blog/Edit/Edit';
import './ShowPosts.css';

const ShowPosts = (props) => (
    <div className='card'>
        <p>Author: {props.author}</p>
        <p>Date: {props.date}</p>
        <p>Content: {props.content}</p>
        <div className="buttons">
            <button><a href={`my-blogs/edit/${props.id}`}>Edit</a></button>
            <button><a>Delete</a></button>
        </div>
    </div>
)

export default ShowPosts;