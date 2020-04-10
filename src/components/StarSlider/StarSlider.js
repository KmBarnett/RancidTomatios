import React, { Component } from 'react';
import './StarSlider.css';



class StarSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: this.props.rating
    }
  }


  render() {
    const { rating } = this.state
    return (
      <div className="star-range">
        <input disabled type="range" name="range" min="1" max="10" step="1" list="tickmark" value={rating}/>
        <div className="star-white star">★★★★★</div>
        <div style={{width: rating/2 + 'em'}} className="star-black star">★★★★★</div>
      </div>
    );
  }
}

export default StarSlider;
