import React, { Component } from 'react'
import ProfileBlogs from '../../component/Profile/ProfileBlogs/ProfileBlogs';

export class Dashboard extends Component {
    render() {
        return (
            <div className='container'>
                <ProfileBlogs />
            </div>
        )
    }
}

export default Dashboard
