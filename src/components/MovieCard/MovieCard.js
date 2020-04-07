import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {

  return(
    <article>
      <h3>
        {props.title}
      </h3>
      <img src={props.poster_path} alt={props.title} />
      <p>Average Rating: {props.average_rating}</p>
    </article>
  )
}

export default MovieCard;