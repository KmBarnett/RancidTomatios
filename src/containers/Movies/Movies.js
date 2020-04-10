import React from 'react';
import { connect } from 'react-redux';
import './Movies.css'
import MovieCard from '../../components/MovieCard/MovieCard';

const Movies = ({ movies, userRatings = [] }) => {
  const allMovies = movies.map(movie => {
    const userRating = userRatings.find(userRating => movie.id === userRating.movie_id);
    return <MovieCard {...movie} userRating={userRating} key={movie.id}/>
  })
  return(
    <section className='movie-container'>
      {allMovies}
    </section>
  )
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  userRatings: state.user.ratings
})

export default connect(mapStateToProps)(Movies);
