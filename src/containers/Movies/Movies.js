import React from 'react';
import { connect } from 'react-redux';
import './Movies.css'
import MovieCard from '../../components/MovieCard/MovieCard';

const Movies = ({ movies, userRatings, userName }) => {
  const allMovies = movies.map(movie => {
    if (userRatings) {
      let userRating = userRatings.find(userRating => movie.id === userRating.movie_id);
      const rating = userRating ?
      userRating.rating : 0;
      return <MovieCard
        {...movie}
        userRating={rating}
        loggedIn={true}
        key={movie.id}
        />
    } else {
      return (<MovieCard
        {...movie}
        key={movie.id}
      />)
    }
  })
  return(
    <section className='movie-container'>
      {allMovies}
    </section>
  )
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  userRatings: state.user.ratings,
})

export default connect(mapStateToProps)(Movies);
