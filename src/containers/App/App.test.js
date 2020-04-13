import React from 'react';
import { render, waitFor, debug } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getMovies } from '../../apiCalls';
import { Provider } from 'react-redux';
import { App, mapDispatchToProps } from './App';
import { connect } from 'react-redux';
// import { loadMovies } from '../../actions';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

jest.mock('../../apiCalls');

describe('App', () => {
  it('renders correctly', async () => {
    getMovies.mockResolvedValueOnce({
      movies: [
        {
            "id": 1,
            "title": "Bloodshot",
            "poster_path": "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
            "average_rating": 5
        }
      ]
    })


    const store = createStore(rootReducer);
    const { getByText } = render(<Provider store={store}>
        <App />
      </Provider>)

    expect(getByText('Rancid Tomatillos')).toBeInTheDocument()
    await waitFor (() => expect(getByText('Bloodshot')).toBeInTheDocument());
  });
});
