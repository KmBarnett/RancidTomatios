import { user } from './user';

describe('User Reducer', () => {
  it('should return the initial state', () => {
    const expectedResult = {};
    const result = user(undefined, {})
    expect(result).toEqual(expectedResult)
  });
  
  it('when receiving LOG_IN, should change to the correct user property', () => {
    const currentUser = {id: 7, name: 'Diana', email: 'diana@turing.io'};
    const action = {
      type: 'LOG_IN',
      user: currentUser
    }
    const expectedResult = {id: 7, name: 'Diana', email: 'diana@turing.io'}
    const result = user({}, action)
    expect(result).toEqual(expectedResult)

  });

  it('when receiving LOG_OUT, should update the user property to its default value', () => {
    const initialState = { id: 7, name: 'Diana', email: 'diana@turing.io' };
    const action = {
      type: 'LOG_OUT'
    }
    const expectedResult = {}
    const result = user(initialState, action)
    expect(result).toEqual(expectedResult)
  });

  it('when receiving GET_RATINGS, should return the users ratings as a property', () => {
    const mockRatings = [
      {id: 1, user_id: 7, movie_id: 2, rating: 5},
      {id: 2, user_id: 7, movie_id: 3, rating: 6},
      {id: 3, user_id: 7, movie_id: 4, rating: 7}
    ]
    const action = {
      type: 'GET_RATINGS',
      ratings: mockRatings
    }
    const expectedResult = {ratings: mockRatings}
    const result = user(undefined, action)
    expect(result).toEqual(expectedResult)
  });
})