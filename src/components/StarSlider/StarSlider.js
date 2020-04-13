import React, { Component } from 'react';
import './StarSlider.css';



class StarSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: this.props.rating
    }
  }

  submitRating = event => {
    event.preventDefault();
    if (this.props.rating) {
      this.props.removePreviousRating()
    }
    this.props.postMovieRating(event.target.value)
  }


  handleChange(e) {
    this.setState({rating: e.target.value})
    this.submitRating(e)
  }

  render() {
    const { rating } = this.state
    const { loggedIn } = this.props

    return (
      <div className="star-range">
        <input data-testid='star-range' onChange={(e) => {this.handleChange(e)}} disabled={!loggedIn} type="range" name="range" min="1" max="10" step="1" list="tickmark" value={rating}/>
        <div data-testid='empty-stars' className="star-white star">★★★★★</div>
        <div data-testid='full-stars' style={{width: rating/2 + 'em'}} className="star-black star">★★★★★</div>
      </div>
    );
  }
}

export default StarSlider;
