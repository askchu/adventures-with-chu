import React from 'react';
import Aux from '../../../../hoc/Auxilary/Auxilary';
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

    let author = (
        <h5>By: {props.author}</h5>
    )
    if (props.author == null) {
        author = (
            <h5>By: Unknown</h5>
        )
    }



    let image = ''
    if (props.img) {
        image = (
            <Aux>
                <div className="newsPic" style={{
                    background: `url(${props.img})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                </div>
                <div className='summary'>
                    {/* <h5>By: {props.author}</h5> */}
                    {/* {author} */}
                    <h4>{props.title}</h4>
                    {content}
                </div>
            </Aux>
        )
    }
    if (props.img == null) {
        image = (<div className='summary'>
            {/* <h5>By: {props.author}</h5> */}
            <h4>{props.title}</h4>
            {/* {author} */}
            {content}
        </div>
        )
    }

    return (
        <div className="news">
            {image}

        </div >

    )
}

