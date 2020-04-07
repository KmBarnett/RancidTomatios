import React from 'react';
import './Header.css';
import { ReactComponent as ReactLogo } from '../../assets/Logo.svg';

const Header = () => {

  return(
    <header>
      <ReactLogo />
      <h1>Rancid Tomatillos</h1>
      <button>Login</button>
    </header>
  )
}

export default Header;