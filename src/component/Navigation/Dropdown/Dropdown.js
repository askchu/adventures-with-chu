import React, { useState } from 'react';
import { MenuItems } from '../Dropdown/MenuItems/MenuItems';
import './Dropdown.css';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Auxilary/Auxilary';

function Dropdown() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <Aux>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </Aux>
  );
}

export default Dropdown;

