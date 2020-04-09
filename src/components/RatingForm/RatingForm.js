import React, { Component } from 'react';
import './RatingForm.css'


class RatingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1
    }
  }

  updateRating = e => {
    this.setState({ rating: e.target.value })
  }

  submitRating = event => {
    event.preventDefault();
    this.props.postMovieRating(this.state.rating)
    this.setState({ rating: 1 })
  }

  render() {
    return(
      <form onSubmit={this.submitRating}>
        <input
          type='number'
          min='1'
          step='1'
          max='10'
          value={this.state.rating}
          required
          onChange={this.updateRating}/>
        <button
          type='submit'>Add Rating
        </button>
      </form>
    )
  }
}

export default RatingForm;
