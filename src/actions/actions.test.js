import * as actions from '.';

describe('Action Creators', () => {
  it('should sould have a type of LOG_IN and a correct pay load', () => {
    const user = {
      email: 'diana@turing.io',
      password: 111111
    }
    const expectedAction = {
      type: 'LOG_IN',
      user: user
    }
    const result = actions.logIn(user)
    expect(result).toEqual(expectedAction)
  });

  it('should sould have a type of LOG_IN and a correct pay load', () => {
    const expectedAction = {
      type: 'LOG_OUT'
    }
    const result = actions.logOut({type: 'LOG_OUT'})
    expect(result).toEqual(expectedAction);
  });
})
