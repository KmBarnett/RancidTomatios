import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getAllMovies, loginUser, getAllRatings } from '../../apiCalls';
import { Provider } from 'react-redux';
import App from './App';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { BrowserRouter } from 'react-router-dom';

const renderTestWrapper = () => { 
  const testStore = createStore(rootReducer);
  return render(
  <Provider store={testStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider> 
  )
}

jest.mock('../../apiCalls');

const mockMovies = {movies: [{
  id: 1,
  title: "Bloodshot",
  poster_path: "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
  backdrop_path: "https://image.tmdb.org/t/p/original//ocUrMYbdjknu2TwzMHKT9PBBQRw.jpg",
  release_date: "2020-03-05",
  overview: "After he and his wife are murdered",
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
}
  
  describe('App', () => {
    
    it('renders all content correctly', async () => {
    
    getAllMovies.mockResolvedValue(mockMovies);
    
    const { getByText, queryByText } = renderTestWrapper();

    const loginBtn = getByText('LOG IN');
    const card1Title = await waitFor(() => getByText('Bloodshot'));
    const logOutBtn = queryByText('LOG OUT');


    expect(loginBtn).toBeInTheDocument();
    expect(card1Title).toBeInTheDocument();
    expect(logOutBtn).not.toBeInTheDocument();

  });
    
  it('user should be able to login', async () => {
    
    getAllMovies.mockResolvedValue(mockMovies);
    const mockUser = {user: {id: 7, name: 'Diana', email: 'diana@turing.io'}};
    loginUser.mockResolvedValue(mockUser);
    getAllRatings.mockResolvedValue([]);
    const { debug, getByText, queryByText, getByPlaceholderText } = renderTestWrapper();

    const loginBtn = queryByText('LOG IN');
    
    fireEvent.click(loginBtn);
    expect(location.pathname).toBe('/login');
    
    const usernameInput = getByPlaceholderText('Your email');
    const passwordInput = getByPlaceholderText('Your password');
    const submitButton = getByText('Log in');
    
    fireEvent.change(usernameInput, {target: {value: 'diana@turing.io'}});
    fireEvent.change(passwordInput, {target: {value: '111111'}});
    fireEvent.click(submitButton);
    
    const logOutBtn = await waitFor(() => getByText('LOG OUT'));
    const welcomeBanner = await waitFor(() => getByText('Welcome, Diana!'));
    expect(loginUser).toHaveBeenCalledWith({email: 'diana@turing.io', password: '111111' });
    expect(logOutBtn).toBeInTheDocument();
    expect(loginBtn).not.toBeInTheDocument();
    expect(welcomeBanner).toBeInTheDocument();
  });

  it('should bring us to the movie showpage of the movie card we click on', async () => {
    getAllMovies.mockResolvedValue(mockMovies);
    const mockUser = { user: { id: 7, name: 'Diana', email: 'diana@turing.io' } };
    loginUser.mockResolvedValue(mockUser);
    getAllRatings.mockResolvedValue([]);
    const { debug, getByText, queryByText, getByPlaceholderText, getAllByTestId, getAllByAltText } = renderTestWrapper();
    const loginBtn = queryByText('LOG IN');
    fireEvent.click(loginBtn);
    const usernameInput = getByPlaceholderText('Your email');
    const passwordInput = getByPlaceholderText('Your password');
    const submitButton = getByText('Log in');
    fireEvent.change(usernameInput, { target: { value: 'diana@turing.io' } });
    fireEvent.change(passwordInput, { target: { value: '111111' } });
    fireEvent.click(submitButton);

    const movieCard = await waitFor(() => getAllByTestId('movie-card'));
    fireEvent.click(movieCard[0]);

    expect(location.pathname).toBe('/movies/1');

    const movieTitle = getByText('Bloodshot');
    const movieImage = getAllByAltText('Bloodshot');
    const movieDescription = getByText('After he and his wife are murdered');

    expect(movieTitle).toBeInTheDocument();
    expect(movieImage).toHaveLength(2);
    expect(movieDescription).toBeInTheDocument();

    const starRange = getAllByTestId('star-range');

    expect(starRange).toHaveLength(2);

    const backBtn = getByText('⬅ Back');
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);

    const allCards = getAllByTestId('movie-card');
    expect(allCards).toHaveLength(2);
  });
})
