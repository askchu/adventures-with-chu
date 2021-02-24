import React from 'react';
import './ShowPosts.css';

const ShowPosts = (props) => (
    <div className='card'>
        <h2>Title: {props.title}</h2>
        <h4>Author: {props.author}</h4>
        <p>Date: {props.date}</p>
        {/* <p>Content: {props.content}</p> */}
        <div className="buttons">
            <button><a href={`my-blogs/edit/${props.id}`}>Edit <i className="far fa-edit"></i></a></button>
        </div>
    </div>
)

export default ShowPosts;