import React from 'react';
import { MovieShowPage } from './MovieShowPage'
import { connect } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

let currentMovie, mockUser, mockRating, testWrapper, testStore;
beforeEach(() => {
  currentMovie = {
    id: 1,
    title: "Bloodshot",
    poster_path: "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original//ocUrMYbdjknu2TwzMHKT9PBBQRw.jpg",
    release_date: "2020-03-05",
    overview: "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
    average_rating: 5.75
  }

    mockUser = {user: {id: 1, name: "Alan", email: "alan@turing.io"}}

    mockRating = {rating: {user_id: 1, movie_id: 1, rating: 5}}

    testStore = createStore(rootReducer)
    testWrapper = <Provider store={testStore}>
      <Router><MovieShowPage
        movie={currentMovie}
        user={mockUser}/>
      </Router>
    </Provider>
})

describe('Movie Show Page', () => {
  it('should render a movie with the correct details', () => {
    const { getByText } = render(testWrapper)

    expect(getByText('Bloodshot')).toBeInTheDocument();
    expect(getByText('After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—\'Bloodshot\'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there\'s more to the conspiracy than he thought.')).toBeInTheDocument();
  });
  it('should render the correct images for a specific movie', () => {

    // const { getAllByAltText } = render(testWrapper);

    // expect(getAllByAltText('Bloodshot')).toBeInTheDocument();
  })
});
