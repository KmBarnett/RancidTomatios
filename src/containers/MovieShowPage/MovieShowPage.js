import React from 'react';
import './MovieShowPage.css';
import StarSlider from '../../components/StarSlider/StarSlider.js';
import { connect } from 'react-redux';
import moment from 'moment';
import { rateMovie, getRatings } from '../../actions'
import { Link } from 'react-router-dom'


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
    .then( () => {
      fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${props.user.id}/ratings`)
        .then(response => response.json())
        .then(data => props.getRatings(data.ratings))
    })
    .catch(error => console.error(error))
  }

  return (
    <article className='show-page'>
      <img className='backdrop-img' src={movie.backdrop_path} />
      <section className='movie-info'>
        <Link to='/'>
          <button className='back-button' type='button'>⬅</button>
        </Link>
        <h2>{movie.title}</h2>
        <img className='poster-path-img' src={movie.poster_path} alt={movie.title} />
        <h3>Released: {moment(movie.release_date).format("MMMM Do, YYYY")}</h3>
        <p className='movie-overview'>{movie.overview}</p>
      <section>
        <p className='user-rating'>Average Rating:</p>
        <StarSlider className='star-range' rating={movie.average_rating} />
      </section>
      {props.user.name &&
        <section>
          <p className='user-rating'>Your Rating:</p>
          <div>
            <StarSlider
              rating={rating}
              loggedIn={true}
              removePreviousRating={removePreviousRating}
              postMovieRating={postMovieRating}
              />
          </div>
        </section>}
    </section>
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
  rateMovie: rating => dispatch(rateMovie(rating)),
  getRatings: (ratings) => dispatch( getRatings(ratings) )
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieShowPage);
