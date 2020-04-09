import React from 'react';
import './MovieCard.css';
import StarSlider from './../StarSlider/StarSlider.js';
import { connect } from 'react-redux';



const MovieCard = (props) => {
  console.log(`${props.userRating}: ${props.average_rating}`);

  return(
    <article className='card'>
      <img className='card-img' src={props.poster_path} alt={props.title} />
      <section className='card-text'>
        <h3>
          {props.title}
        </h3>
        <section>
          <p>Average Rating:</p>
          <StarSlider rating = {props.average_rating}/>
        </section>
      </section>
    </article>
  )
}

const mapStateToProps = (state, {id}) => ({
  userRating: state.user.ratings && state.user.ratings.find(rating => rating.movie_id === id)
})

export default connect(mapStateToProps)(MovieCard);
