import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import StarSlider from './StarSlider';

function renderStarSlider({ rating = 0, loggedIn = false, postMovieRating = jest.fn(), removePreviousRating = jest.fn() }) {
  const utils = render(
    <StarSlider postMovieRating={postMovieRating} removePreviousRating={removePreviousRating} loggedIn={loggedIn} rating={rating} />
  )
  return utils
}

describe('MovieCard', () => {

  it('Should its exist', () => {
    const { getByTestId } = renderStarSlider({})

    const emptyStars = getByTestId('empty-stars')
    const fullStars = getByTestId('full-stars')
    const starRange = getByTestId('star-range')

    expect(emptyStars).toBeInTheDocument()
    expect(fullStars).toBeInTheDocument()
    expect(starRange).toBeInTheDocument()

  })

  it('Should its be able to take in a rating', () => {
    const { getByTestId } = renderStarSlider({ rating: 3 })

    const starRange = getByTestId('star-range')

    expect(starRange.value).toBe('3')

  })

  it('Should its be enabled if a user is logged In', () => {
    const { getByTestId } = renderStarSlider({ rating: 3 , loggedIn: true})

    const starRange = getByTestId('star-range')

    expect(starRange.disabled).toBe(false)
  })

  it('Should its be enabled if a user is logged In', async () => {
    const mockPostMovieRating = jest.fn();
    const mockRemovePreviousRating = jest.fn();

    const { getByTestId } = renderStarSlider({
      rating: 3,
      loggedIn: true,
      postMovieRating: mockPostMovieRating,
      removePreviousRating: mockRemovePreviousRating
    })

    const starRange = getByTestId('star-range')

    fireEvent.change(starRange, { target: { value: '6' } })

    expect(mockRemovePreviousRating).toHaveBeenCalled()
    await waitFor(() => expect(mockPostMovieRating).toHaveBeenCalledWith('6'))
  })

})
