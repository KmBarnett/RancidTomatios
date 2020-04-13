import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

describe('Login', () => {
  it('should render the correct content', () => {
    const testStore = createStore(rootReducer);

    const testWrapper = 
      <Provider store={testStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    
    const { getByText, getByPlaceholderText } = render(testWrapper)

    const emailInput = getByPlaceholderText('Your email');
    const passwordInput = getByPlaceholderText('Your password');
    const loginBtn = getByText('Log in');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument()
    expect(loginBtn).toBeInTheDocument();
  })

  it('should update the state as input is entered', () => {
    const testStore = createStore(rootReducer);

    const testWrapper =
      <Provider store={testStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>

    const { getByPlaceholderText } = render(testWrapper)

    const emailInput = getByPlaceholderText('Your email');
    const passwordInput = getByPlaceholderText('Your password');

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');

    fireEvent.change(emailInput, {target: {value: 'mockEmail'}});
    fireEvent.change(passwordInput, {target: {value: 'mockPassword'}});

    expect(emailInput.value).toBe('mockEmail');
    expect(passwordInput.value).toBe('mockPassword');
  })
})