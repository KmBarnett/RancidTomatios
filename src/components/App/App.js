import React, { Component } from 'react';
import './App.css';
import { loadMovies } from '../../actions';
import { connect } from 'react-redux';
import Movies from '../../containers/Movies/Movies';


class App extends Component {
 
  componentDidMount = () => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
    .then(response => response.json())
    .then(data => this.props.loadMovies(data.movies))
    .catch(error => console.error(error.message))
  }

  render() {
    return (
      <div className="App">
        <Movies />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadMovies: movies => dispatch( loadMovies(movies) )
})

export default connect(null, mapDispatchToProps)(App);
