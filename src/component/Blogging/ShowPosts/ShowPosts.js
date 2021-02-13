import React from 'react';
import classes from './ShowPosts.css';

const ShowPosts = (props) => (
    <div className={classes.Card}>
        <p>Author: {props.author}</p>
        <p>Date: {props.date}</p>
        <p>Content: {props.content}</p>
    </div>
)

export default ShowPosts;