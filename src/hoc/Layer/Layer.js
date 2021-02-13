import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Aux from '../Auxilary/Auxilary';
import classes from './Layer.css';
import img from '../../assets/images/logo.png';
import img2 from '../../assets/images/logo3.png';
import Navbar from '../../component/Navigation/Navbar';


class Layer extends Component {

    render() {
        return (
            <Aux>
                <nav className={classes.Navbar}>
                    <div className={classes.Logo}>
                        <img src={img2} alt={"this is the logo of adventures statement"} className={classes.Img2} />
                        <img src={img} alt={"this is the logo of adventures with chu"} className={classes.Img} />
                    </div>


                    <div className={classes.NavLinks}>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/blog">Blogs</Link></li>
                            <li className={classes.Profile} onClick={this.toggleHandler}>Profile
                     <ul className={classes.Dropdown}>
                                    <li>
                                        <a href="#!">Web Design</a>
                                    </li>
                                    <li>
                                        <a href="#!">Web Development</a>
                                    </li>
                                    <li>
                                        <a href="#!">Graphic Design</a>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </nav>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}

export default Layer;

