import React from 'react';
import './MovieCard.css';
import StarSlider from './../StarSlider/StarSlider.js'
import { Link } from 'react-router-dom'

const MovieCard = (props) => {
  return(
    <Link to={`/movies/${props.id}`} className='card'>
      <img className='card-img' src={props.poster_path} alt={props.title} />
      <section className='card-text'>
        <h3>
          {props.title}
        </h3>
        <section>
          <p>Average Rating:</p>
          <StarSlider rating = {props.average_rating}/>
        </section>
        {props.userRating &&
        <section>
          <p>Your Rating:</p>
          <StarSlider rating={props.userRating.rating} />
        </section>}
      </section>
    </Link>
  )
}

export default MovieCard;
