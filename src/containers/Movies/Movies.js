import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../../components/MovieCard/MovieCard';

const Movies = ({ movies }) => {
  const allMovies = movies.map(movie => {
    return <MovieCard {...movie} key={movie.id}/>
  })
  return(
    <section>
      {allMovies}
    </section>
  )
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps)(Movies);