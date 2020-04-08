import React from 'react';
import './Header.css';
import { ReactComponent as ReactLogo } from '../../assets/Logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {

  return(
    <header>
      <ReactLogo />
      <Link to='/login' >
        <button>Login</button>
      </Link>
    </header>
  )
}

export default Header;
