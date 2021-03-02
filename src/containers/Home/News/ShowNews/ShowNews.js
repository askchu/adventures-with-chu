import React from 'react';
import './ShowNews.css';


const ShowNews = (props) => (
    <div className="news" style={{ background: `url(${props.img})` }}>


        <div className='summary'>
            <h4>{props.title}</h4>
            <h4><strong>By: {props.author}</strong></h4>
            <p>{props.description} <span><a href={props.url} target="__blank">Read More.</a></span></p>
        </div>
        {/* <div className="img">
            <img src={props.img} />
        </div> */}
        {/* <p>Content: {props.content}</p> */}
        {/* <p>Url: {props.url}</p> */}
    </div>
)

export default ShowNews;