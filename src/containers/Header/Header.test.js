import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

const testStore = createStore(rootReducer);
function renderHeader(user = {}, logOut = jest.fn()) {
  return render(
    <Provider store={testStore}>
      <BrowserRouter>
        <Header user={user} logOut={logOut}/>
      </BrowserRouter>
    </Provider>
  )
}

describe('Header', () => {
  it('should render the correct content', () => {
    const { getByText, queryByText } = renderHeader();
    const loginBtn = getByText('LOG IN');
    const logOutBtn = queryByText('Log out');

    expect(loginBtn).toBeInTheDocument();
    expect(logOutBtn).not.toBeInTheDocument();
  });
  
  it('should be able to redirect the page after clicking the login button', () => {
    const { getByText } = renderHeader();
    const loginBtn = getByText('LOG IN');

    fireEvent.click(loginBtn);

    expect(location.pathname).toBe('/login');
  });

})