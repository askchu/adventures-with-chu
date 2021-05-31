import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { history } = useHistory();


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

  const logOut = async () => {
    try {
      setError('');
      await logout()
      // history.pushState('/sign-in')
      window.location.reload();

      history.push('/');
    } catch {
      setError('Failed to log out');
    }
    closeMobileMenu()
  }

  let navlinks = (
    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
      <li className='nav-item'>
        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
          Home
            </Link>
      </li>
      <li className='nav-item'>
        <Link
          to='/browse'
          className='nav-links'
          onClick={closeMobileMenu}
        >
          Browse
            </Link>
      </li>
      {/* 
      <li className='nav-item'>
        <Link
          to='/contact-us'
          className='nav-links'
          onClick={closeMobileMenu}
        >
          Contact Us
            </Link>
      </li> */}
      <li className='nav-item'>
        <Link
          to='/sign-in'
          className='nav-links'
          onClick={closeMobileMenu}
        >
          Sign In
            </Link>
      </li>
    </ul>
  )
  if (currentUser) {
    navlinks = (
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
            to='/profile-blogs'
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
            to='/browse'
            className='nav-links'
            onClick={closeMobileMenu}
          >
            Browse
            </Link>
        </li>

        {/* <li className='nav-item'>
          <Link
            to='/contact-us'
            className='nav-links'
            onClick={closeMobileMenu}
          >
            Contact Us
            </Link>
        </li> */}
        <li className='nav-item'>
          <Link
            to='/'
            className='nav-links'
            onClick={logOut}
          >
            Log Out
            </Link>
        </li>
      </ul>
    )
  }

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
        {navlinks}
      </nav>
    </Aux>
  );
}

export default Navbar;
