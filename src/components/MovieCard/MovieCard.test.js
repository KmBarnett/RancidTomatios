import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MovieCard from './MovieCard';
import { BrowserRouter as Router, Link } from 'react-router-dom'


const movie = {
  id: 1,
  title: "Bloodshot",
  poster_path: "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
  backdrop_path: "https://image.tmdb.org/t/p/original//ocUrMYbdjknu2TwzMHKT9PBBQRw.jpg",
  release_date: "2020-03-05",
  overview: "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
  average_rating: 6.4
}

function renderMovieCard(userRating) {
  const utils = render(
  <Router>
    <MovieCard  { ... movie } userRating={userRating}/>
  </Router>
  )
  return utils
}

describe('MovieCard', () => {

  it('Should its exist', () => {
    const { getByText, getByAltText } = renderMovieCard({});

    const title = getByText('Bloodshot')
    const avgRating = getByText('Average Rating:')
    const poster = getByAltText('Bloodshot')

    expect(title).toBeInTheDocument()
    expect(avgRating).toBeInTheDocument()
    expect(poster).toBeInTheDocument()

  })

  it('Should navigate', () => {
    const { getByTestId } = renderMovieCard({});

    const card = getByTestId('movie-card')

    fireEvent.click(card)

    expect(window.location.pathname).toBe(`/movies/1`)
  })

  it('Should Conditonaly render user rating', () => {
    const { getByText, debug } = renderMovieCard({rating: 3});

    const conditionalRating = getByText('Your Rating:')

      expect(conditionalRating).toBeInTheDocument()
  })


})
