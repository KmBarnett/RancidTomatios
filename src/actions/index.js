export const loadMovies = movies => ({
  type: 'LOAD_MOVIES',
  movies
})

export const logIn = user => ({
  type: 'LOG_IN',
  user
})

export const logOut = () => ({
  type: 'LOG_OUT'
})

export const getRatings = ratings => ({
  type: 'GET_RATINGS',
  ratings
})

export const rateMovie = rating => ({
  type: 'RATE_MOVIE',
  rating
})
