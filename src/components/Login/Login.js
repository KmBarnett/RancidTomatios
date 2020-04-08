import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <form>
        <input
          type='email'
          name='email'
          value={this.state.email}
          placeholder='Your email'
          required
        />
        <input
          type='password'
          name='password'
          value={this.state.password}
          placeholder='Your password'
          required
        />
        <button type='submit' >Log in</button>
      </form>
    )
  }
}

export default Login;
