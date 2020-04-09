import React from 'react';
import './MovieShowPage.css';
import StarSlider from './../StarSlider/StarSlider.js'
import { connect } from 'react-redux';
import moment from 'moment'

const MovieShowPage = (props) => {
  const { movie = {} } = props
  return(
    <article className='show-page'>
      <img src={movie.backdrop_path} />
      <h2>{movie.title}</h2>
      <h3>Released: {moment(movie.release_date).format("MMMM Do YYYY")}</h3>
      <section>
        <p>Average Rating:</p>
        <StarSlider rating={movie.average_rating}/>
      </section>
      {props.user.name &&
        <section>
        <p>Your Rating:</p>
        {props.userRating ?
          <div>
            <StarSlider rating={props.userRating.rating} />
            <button>Remove Rating</button>
          </div> :
          <div>
            <input type='number'/>
            <button>Add Rating</button>
          </div>}
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

export default connect(mapStateToProps)(MovieShowPage);
