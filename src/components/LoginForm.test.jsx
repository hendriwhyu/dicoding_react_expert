import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter as Router } from 'react-router-dom';
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import LoginForm from './LoginForm';

/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */
expect.extend(matchers);

describe('LoginForm component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle username typing correctly', async () => {
    // arrange
    render(
      <Router>
        <LoginForm login={() => {}} />
      </Router>,
    );
    const emailInput = await screen.getByPlaceholderText('Email Address');

    // action
    await userEvent.type(emailInput, 'johndoe@gmail.com');

    // assert
    expect(emailInput).toHaveValue('johndoe@gmail.com');
  });
  it('should handle password typing correctly', async () => {
    // arrange
    render(
      <Router>
        <LoginForm login={() => {}} />
      </Router>,
    );
    const passwordInput = await screen.getByPlaceholderText('Enter Password');
    // action
    await userEvent.type(passwordInput, 'password');
    // assert
    expect(passwordInput).toHaveValue('password');
  });
  it('should call login function when login button is clicked', async () => {
    // arrange
    render(
      <Router>
        <LoginForm login={() => {}} />
      </Router>,
    );
    const passwordInput = await screen.getByPlaceholderText('Enter Password');

    // action
    await userEvent.type(passwordInput, 'password');
    // assert
    expect(passwordInput).toHaveValue('password');
  });
  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(
      <Router>
        <LoginForm login={mockLogin} />
      </Router>,
    );
    const emailInput = await screen.getByPlaceholderText('Email Address');

    const passwordInput = await screen.getByPlaceholderText('Enter Password');

    const loginButton = await screen.getByRole('button', {
      name: 'Login',
    });
    await userEvent.type(emailInput, 'johndoe@gmail.com');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'johndoe@gmail.com',
      password: 'password',
    });
  });
});
