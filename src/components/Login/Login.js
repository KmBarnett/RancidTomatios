import React, { Component } from 'react';
import './Login.css';
import { logIn } from '../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        this.props.logIn(data.user);
        this.setState({
          email: '',
          password: '',
          authenticated: true
        })
      })
      .catch(error => {
        console.error(error.message);
        this.setState({
          password: ''
        });
        alert('Incorrect email and/or password')
      })
  }

  render() {
    const redirectPath = this.state.authenticated ? '/' : '/login';
    return (
      <form onSubmit={this.submitForm} >
        <Redirect to={redirectPath} />
        <input
          type='email'
          name='email'
          value={this.state.email}
          placeholder='Your email'
          onChange={this.handleChange}
          required
        />
        <input
          type='password'
          name='password'
          value={this.state.password}
          placeholder='Your password'
          onChange={this.handleChange}
          required
        />
        <button type='submit' >Log in</button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  logIn: (user) => dispatch( logIn(user) )
})

export default connect(null, mapDispatchToProps)(Login);
