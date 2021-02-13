import React, { Component } from 'react'
import classes from './Home.css';
import img from '../../assets/images/logo3.png';
import blogPic1 from '../../assets/images/img1.jpg'

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className='logo'>
                    <img src={img} alt={"adventures with chu"} />
                </div>

                <main className='welcome'>
                    <div className='intro'>
                        <h2>Welcome to Adventures with Chu!</h2>
                        <p>Start blogging and share your trips with everyone. Your trip might just be someone's next adventure!</p>
                        <h4>Having troubles planning where to go next?</h4>
                        <p>No worries! Come check out other blogs and their recommendations. If not, check our recommended lists and start from there!</p>
                    </div>
                    <div className='featured'>
                        <h4>Featured blog of the day</h4>
                        <div className='img-wrapper'>
                            <div className='img'></div>
                            {/* <img src={blogPic1} alt='pic' /> */}
                        </div>
                    </div>
                    <div className="new">
                        <h4>What's New</h4>
                    </div>
                </main>

            </div>
        )
    }
}

export default Home;
