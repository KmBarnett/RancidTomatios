import React from 'react';
import { connect } from 'react-redux';
import './Movies.css'
import MovieCard from '../../components/MovieCard/MovieCard';
import PropTypes from 'prop-types';

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

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    average_rating: PropTypes.number,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string
  })),
  userRatings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    movie_id: PropTypes.number,
    user_id: PropTypes.number,
    rating: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }))
}
