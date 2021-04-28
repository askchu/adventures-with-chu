import React from 'react';
import './ShowPosts.css';

export default function ShowPosts(props) {
    let content = (
        <p className='content'>{props.content}</p>
    );
    if (props.content.length > 90) {
        content = (
            <p className='content'>{props.content.slice(0, 89)}... <span>Read more</span></p>
        )
    }
    // console.log(props.content)
    // console.log(props.content.length)
    // console.log(props.content.slice(0, 89))

    return (
        <div className="cardContainer">
            <a href={`my-blogs/${props.id}/`}>
                <div className='card'>
                    <h2>{props.title}</h2>
                    <h4>Written by: {props.author}</h4>
                    <p className="date">Posted on: {props.date}</p>
                    {content}
                </div>
            </a>
        </div>
    )
}
