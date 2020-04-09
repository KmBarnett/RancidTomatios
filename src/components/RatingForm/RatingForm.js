import React, { Component } from 'react';
import './RatingForm.css'


class RatingForm extends Component {
  constructor() {
    super();
    this.state = {
      rating: 1
    }
  }

  updateRating = e => {
    this.setState({ rating: e.target.value })
  }

  render() {
    return(
      <form>
      <input
        type='number'
        min='1'
        step='1'
        max='10'
        onChange={this.updateRating}/>
      <button>Add Rating</button>
      </form>
    )
  }
}
