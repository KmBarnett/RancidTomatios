import React from 'react';
import './MovieShowPage.css';
import StarSlider from './../StarSlider/StarSlider.js'
import { connect } from 'react-redux';
import moment from 'moment'

const MovieShowPage = (props) => {
  const { movie = {} } = props
  console.log(Object.keys(movie));
  //  ["id", "title", "poster_path", "backdrop_path", "release_date", "overview", "average_rating"]
  return(
    <article className='show-page'>
      <img src={movie.backdrop_path} />
      <h2>{movie.title}</h2>
      <h3>Released: {moment(movie.release_date).format("MMMM Do YYYY")}</h3>
      <section>
        <p>Average Rating:</p>
        <StarSlider rating={props.average_rating}/>
      </section>
      <p>{movie.overview}</p>
    </article>
  )
}

const mapStateToProps = (state, { matchId }) => ({
  movie: state.movies.find(movie => {
    return movie.id === matchId
  }),
})

export default connect(mapStateToProps)(MovieShowPage);
