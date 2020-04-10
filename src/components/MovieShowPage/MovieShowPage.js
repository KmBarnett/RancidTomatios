import React from 'react';
import './MovieShowPage.css';
import StarSlider from './../StarSlider/StarSlider.js';
import { connect } from 'react-redux';
import moment from 'moment';
import RatingForm from '../RatingForm/RatingForm';
import { rateMovie } from '../../actions'

const MovieShowPage = (props) => {
  const { movie = {} } = props
  const rating = props.userRating ?
    props.userRating.rating : 0

  const removePreviousRating = () => {
    const ratingId = props.user.ratings.find(rating => rating.movie_id === movie.id).id
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${props.user.id}/ratings/${ratingId}`, {
      method: 'DELETE'
    })
      .catch(error => console.error(error))
  }

  const postMovieRating = rating => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${props.user.id}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movie_id: movie.id,
        rating: parseInt(rating)
      })
    })
      .then(response => response.json())
      .then(data => props.rateMovie(data.rating))
  }

  return (
    <article className='show-page'>
      <img src={movie.backdrop_path} />
      <h2>{movie.title}</h2>
      <h3>Released: {moment(movie.release_date).format("MMMM Do YYYY")}</h3>
      <section>
        <p>Average Rating:</p>
        <StarSlider rating={movie.average_rating} />
      </section>
      {props.user.name &&
        <section>
          <p>Your Rating:</p>
          <div>
            <StarSlider rating={rating} />
            <RatingForm
              removePreviousRating={removePreviousRating}
              postMovieRating={postMovieRating}
              rating={rating} />
          </div>
        </section>}
      <p>{movie.overview}</p>
    </article>
  )
}

const mapStateToProps = (state, { matchId }) => ({
  movie: state.movies.find(movie => {
    return movie.id === matchId
  }),
  userRating: state.user.ratings && state.user.ratings.find(rating => {
    return rating.movie_id === matchId;
  }),
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  rateMovie: rating => dispatch(rateMovie(rating))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieShowPage);
