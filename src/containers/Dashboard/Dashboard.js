import React, { Component } from 'react'
import Footer from '../../component/Navigation/Footer/Footer';
import ProfileBlogs from '../../component/Profile/ProfileBlogs/ProfileBlogs';

export class Dashboard extends Component {
    render() {
        return (
            <div className='home'>
                <ProfileBlogs />
                <Footer />
            </div>
        )
    }
}

export default Dashboard
