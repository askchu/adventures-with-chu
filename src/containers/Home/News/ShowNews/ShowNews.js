import React from 'react';
import './ShowNews.css';

export default function ShowNews(props) {
    let content = (
        <p>
            { props.description}
        </p>
    );
    if (props.description.length > 120) {
        content = (
            <p>{props.description.slice(0, 119)}...<span><a href={props.url} target="__blank"> Read More.</a></span></p>
        )
    }

    return (
        <div className="news"
        >
            <div className="newsPic" style={{
                background: `url(${props.img})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
            </div>

            <div className='summary'>
                <h5>By: {props.author}</h5>
                <h4>{props.title}</h4>
                {content}
            </div>
        </div >

    )
}

