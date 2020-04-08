import React, { Component } from 'react';
import './App.css';
import { loadMovies } from '../../actions';
import { connect } from 'react-redux';
import Movies from '../../containers/Movies/Movies';
import Header from '../Header/Header';
import Login from '../Login/Login';
import { Route } from 'react-router-dom';


class App extends Component {

  componentDidMount = () => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
    .then(response => response.json())
    .then(data => this.props.loadMovies(data.movies))
    .catch(error => console.error(error.message))
  }

  render() {
    return (
      <main className="App">
        <Header />
        <Route exact path='/' >
          <Movies />
        </Route>
        <Route path='/login' >
          <Login />
        </Route>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadMovies: movies => dispatch( loadMovies(movies) )
})

export default connect(null, mapDispatchToProps)(App);
