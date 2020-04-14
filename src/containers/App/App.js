import React, { Component } from 'react';
import './App.css';
import { loadMovies } from '../../actions';
import { connect } from 'react-redux';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import Login from '../Login/Login';
import MovieShowPage from '../MovieShowPage/MovieShowPage';
import { Route } from 'react-router-dom';
import { getAllMovies } from '../../apiCalls';


class App extends Component {

  componentDidMount = () => {
    getAllMovies()
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
        <Route path='/movies/:id' render={(match) => <MovieShowPage matchId={parseInt(match.match.params.id)} />}/>

      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadMovies: movies => dispatch( loadMovies(movies) )
})

export default connect(null, mapDispatchToProps)(App);
