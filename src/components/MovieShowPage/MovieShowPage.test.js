import React from 'react';
import MovieShowPage from './MovieShowPage';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { connect } from 'react-redux';

let testStore, testWrapper, mockMovieData;

beforeEach(() => {
  testStore = createStore(rootReducer);
  testWrapper = <Provider store={testStore}>
    <Router>
      <MovieShowPage />
    </Router>
  </Provider>
})

describe('Movie Show Page', () => {
  it('should render a movie page with the correct elements', () => {
    const { getByText, queryAllByRole} = render(testWrapper)

    expect(queryAllByRole('heading')).toBeDefined();
    expect(getByText('Average Rating:')).toBeInTheDocument()
  });

  it('should display the correct details for the movie being displayed', () => {


  });
});
