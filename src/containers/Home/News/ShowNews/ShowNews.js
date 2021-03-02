import React from 'react';
import './ShowNews.css';

const ShowNews = (props) => (
    <div className="news">
        <h4>{props.title}</h4>
        <p><strong>By: {props.author}</strong></p>
        <div className="img">
            <img src={props.img} />
        </div>
        {/* <p>Content: {props.content}</p> */}
        <p>Description: {props.description} <span><a href={props.url} target="__blank">Read More.</a></span></p>
        {/* <p>Url: {props.url}</p> */}
    </div>
)

export default ShowNews;