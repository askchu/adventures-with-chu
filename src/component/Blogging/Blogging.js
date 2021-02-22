import React, { Component } from 'react';
// import NewPost from './NewPost/NewPost';
import Aux from '../../hoc/Auxilary/Auxilary';
import Posts from './Posts/Posts';


class Blogging extends Component {
    render() {
        return (
            <Aux>
                <Posts />
            </Aux>
        )
    };
};

export default Blogging;