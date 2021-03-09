import React from 'react';
import './ShowPosts.css';

const ShowPosts = (props) => (
    <div className="cardContainer">
        <a href={`my-blogs/${props.id}/`}>
            <div className='card'>
                <h2>{props.title}</h2>
                <h4>Written by: {props.author}</h4>
                <p>Posted on: {props.date}</p>
                <p>{props.content}</p>
                {/* <div className="buttons">
                <button><a href={`my-blogs/edit/${props.id}`}>Edit <i className="far fa-edit"></i></a></button>
            </div> */}
            </div>
        </a>
    </div>
)

export default ShowPosts;