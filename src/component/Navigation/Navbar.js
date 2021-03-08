import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown/Dropdown';
import Aux from '../../hoc/Auxilary/Auxilary';
import img1 from '../../assets/images/logo1.png';
import img2 from '../../assets/images/logo3.png';
import { useAuth } from '../../component/Authentication/AuthContext/AuthContext';
import { render } from '@testing-library/react';

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { currentUser } = useAuth();


  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };



  return (
    <Aux>
      <nav className='navbar'>
        <div className='imgContainer'>
          <img className="img1" src={img1} />
          {/* <img className="img2" src={img2} /> */}
        </div>

        <div className='menu-icon' onClick={handleClick}>
          <div className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              // to='/profile/my-blogs'
              to='/profile'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Profile
              {/* <i className='fas fa-caret-down' /> */}
            </Link>
            {/* {dropdown && <Dropdown />} */}
          </li>
          <li className='nav-item'>
            <Link
              to='/blogs'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Browse
            </Link>
          </li>

          <li className='nav-item'>
            <Link
              to='/contact-us'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/sign-in'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Sign In
            </Link>
          </li>
          {/* <li className='nav-item'>
            <Link
              to='/sign-up'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Register
            </Link>
          </li> */}
        </ul>
      </nav>
    </Aux>
  );
}

export default Navbar;
