import React from 'react';
import './Header.css';
import { ReactComponent as Logo } from '../../assets/Logo.svg';

const Header = () => {

  return(
    <header>
      <Logo />
      <button>Login</button>
    </header>
  )
}

export default Header;
