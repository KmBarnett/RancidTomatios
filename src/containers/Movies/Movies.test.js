import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Movies from './Movies';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

const testStore = createStore(rootReducer);
function renderMovies() {
  return render(
    <Provider store={testStore}>
      <BrowserRouter>
        <Movies />
      </BrowserRouter>
    </Provider>
  )
}

testStore.dispatch({
  type: 'LOAD_MOVIES',
  movies: [{
    id: 1,
    title: "Bloodshot",
    poster_path: "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original//ocUrMYbdjknu2TwzMHKT9PBBQRw.jpg",
    release_date: "2020-03-05",
    overview: "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
    average_rating: 6
  },
  {
    id: 2,
    title: "Sonic the Hedgehog",
    poster_path: "https://image.tmdb.org/t/p/original//aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original//stmYfCUGd8Iy6kAMBr6AmWqx8Bq.jpg",
    release_date: "2020-02-12",
    overview: "Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.",
    average_rating: 4.6
  }]
})

describe('Header', () => {
  it('should render the default content', () => {
    const { getByText, debug } = renderMovies()

    const title1 = getByText('Bloodshot')
    const title2 = getByText('Sonic the Hedgehog')

    expect(title1).toBeInTheDocument()
    expect(title2).toBeInTheDocument()
  });

  it('should render the conditional content', () => {
    const { getAllByText, getAllByTestId, debug } = renderMovies()

    testStore.dispatch({
      type: 'GET_RATINGS',
      ratings: [
        {
          id: 490,
          user_id: 7,
          movie_id: 1,
          rating: 6,
          created_at: "2020-04-13T21:51:33.000Z",
          updated_at: "2020-04-13T21:51:33.000Z"
      }]
    })
    const userRatings = getAllByText('Your Rating:')
    const sliders = getAllByTestId('star-range')

    expect(userRatings[0]).toBeInTheDocument()
    expect(userRatings[1]).toBeInTheDocument()
    
    expect(sliders[0].value).toBe('6')
    expect(sliders[3].value).toBe('0')

  });

})
