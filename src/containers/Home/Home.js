import React, { Component } from 'react'
import './Home.css';
import img from '../../assets/images/logo3.png';
import blogPic1 from '../../assets/images/img1.jpg'
import Featured from './Featured/Featured';
import News from './News/News';

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className='logo'>
                    <img src={img} alt={"adventures with chu"} />
                </div>

                <main className='welcome'>
                    <div className='intro'>
                        <h3>Welcome to Adventures with Chu!</h3>
                        <p>Start blogging and share your trips with everyone. Your trip might just be someone's next adventure!</p>
                        <h4>Having troubles planning where to go next?</h4>
                        <p>No worries! Come check out other blogs and their recommendations. If not, check our recommended lists and start from there!</p>
                    </div>
                    <div className='featured'>
                        <h3 className="featuredH4">Featured blogs of the day</h3>

                        <div className='img-wrapper blog1 slide1'>
                            Blog 1
                            <div className='img'></div>
                        </div>
                        <div className='img-wrapper blog2 slide2'>
                            Blog 2
                            <div className='img'></div>
                        </div>
                        <div className='img-wrapper blog3 slide3'>
                            Blog 3
                            <div className='img'></div>
                        </div>
                    </div >
                    <div className="new">
                        <h3>What's New</h3>
                        <News />
                    </div>
                </main >

            </div >
        )
    }
}

export default Home;
