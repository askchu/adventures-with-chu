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


// const ShowPosts = (props) => (
//     <div className="cardContainer">
//         <a href={`my-blogs/${props.id}/`}>
//             <div className='card'>
//                 <h2>{props.title}</h2>
//                 <h4>Written by: {props.author}</h4>
//                 <p>Posted on: {props.date}</p>
//                 <p>{props.content}</p>
//                 {/* <div className="buttons">
//                 <button><a href={`my-blogs/edit/${props.id}`}>Edit <i className="far fa-edit"></i></a></button>
//             </div> */}
//             </div>
//         </a>
//     </div>
// )

// export default ShowPosts;