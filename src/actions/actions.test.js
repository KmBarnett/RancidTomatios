import * as actions from '.';

describe('Action Creators', () => {
  it('should have a type of LOAD_MOVIES and a correct payload', () => {
    const movies = [{ title: 'movie1', id: 1, released: 1990 }, { title: 'movie2', id: 2, released: 1992 }]
    const expectedAction = {
      type: 'LOAD_MOVIES',
      movies
    }
    const result = actions.loadMovies(movies)
    expect(result).toEqual(expectedAction)
  });
  
  it('should have a type of LOG_IN and a correct payload', () => {
    const user = {
      email: 'diana@turing.io',
      password: 111111
    }
    const expectedAction = {
      type: 'LOG_IN',
      user
    }
    const result = actions.logIn(user)
    expect(result).toEqual(expectedAction)
  });

  it('should have a type of LOG_IN and a correct payload', () => {
    const expectedAction = {
      type: 'LOG_OUT'
    }
    const result = actions.logOut({type: 'LOG_OUT'})
    expect(result).toEqual(expectedAction);
  });

  it('should have a type of GET_RATINGS and a correct payload', () => {
    const ratings = [{ id: 1, movie: 'movie1', rating: 8 }, { id: 2, movie: 'movie2', rating: 10 }]
    const expectedAction = {
      type: 'GET_RATINGS',
      ratings
    }
    const result = actions.getRatings(ratings)
    expect(result).toEqual(expectedAction)
  })
})
