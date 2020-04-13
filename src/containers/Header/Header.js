import React from 'react';
import './Header.css';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { Link } from 'react-router-dom';
import { logOut } from '../../actions';
import { connect } from 'react-redux';

const Header = ({ user, logOut }) => {
  return (
    <header>
      <div className='header-container'>
      <Logo />
      {user.name && <h2>Welcome, {user.name}!</h2>}
      {user.name ?
        <button onClick={logOut}>Log out</button> :
        <Link to='/login' >
          <button>LOG IN</button>
        </Link>
      }
      </div>
    </header>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch( logOut() )
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
