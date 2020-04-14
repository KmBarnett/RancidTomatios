import React from 'react';
import { MovieShowPage } from './MovieShowPage';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { connect } from 'react-redux';
import { getAllRatings, submitNewRating, deleteExistingRating } from '../../apiCalls';

jest.mock('../../apiCalls');
let mockUser, currentMovie, testStore, testWrapper, allRatings;

beforeEach(() => {
  mockUser = {user: {id: 1, name: "Diana", email: "diana@turing.io"}}
  currentMovie = {
    "movie": {
      "id": 1,
      "title": "Bloodshot",
      "poster_path": "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
      "backdrop_path": "https://image.tmdb.org/t/p/original//ocUrMYbdjknu2TwzMHKT9PBBQRw.jpg",
      "release_date": "2020-03-05",
      "overview": "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
      "average_rating": 6
    }
  }

  testStore = createStore(rootReducer);
  testWrapper = <Provider store={testStore}>
    <Router>
      <MovieShowPage
        user={mockUser}
        movie={currentMovie}/>
    </Router>
  </Provider>

  allRatings = {
    "ratings": [
      {
      "id": 292,
      "user_id": 7,
      "movie_id": 11,
      "rating": 10,
      "created_at": "2020-04-13T19:21:26.815Z",
      "updated_at": "2020-04-13T19:21:26.815Z"
    }]}
  })

describe('Movie Show Page', () => {
  it('should render a user\'s rating for a specific movie upon logging in',  () => {

  submitNewRating.mockResolvedValueOnce(allRatings)
  const { queryByText } = render(testWrapper);
  expect(queryByText('Your Rating:')).toBeInTheDocument();

  });

  it('should not render a user\'s rating for a specific movie if not logged in', () => {
    testWrapper = <Provider store={testStore}>
      <Router>
        <MovieShowPage
          user={{}}
          movie={currentMovie}/>
      </Router>
    </Provider>
    const { queryByText } = render(testWrapper)
    expect(queryByText('Your Rating:')).not.toBeInTheDocument();
  });
})
