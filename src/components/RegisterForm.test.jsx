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
import RegisterForm from './RegisterForm';
/**
 * skenario testing
 *
 * - RegisterForm component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when login button is clicked
 */
expect.extend(matchers);
describe('RegisterForm component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle name typing correctly', async () => {
    // arrange
    render(
      <Router>
        <RegisterForm register={() => {}} />
      </Router>,
    );
    const nameInput = await screen.getByPlaceholderText('Name');

    // action
    await userEvent.type(nameInput, 'John Doe');

    // assert
    expect(nameInput).toHaveValue('John Doe');
  });
  it('should handle email typing correctly', async () => {
    // arrange
    render(
      <Router>
        <RegisterForm register={() => {}} />
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
        <RegisterForm register={() => {}} />
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
    const mockRegister = vi.fn();
    render(
      <Router>
        <RegisterForm register={mockRegister} />
      </Router>,
    );
    const nameInput = await screen.getByPlaceholderText('Name');
    const emailInput = await screen.getByPlaceholderText('Email Address');
    const passwordInput = await screen.getByPlaceholderText('Enter Password');
    const registerButton = await screen.getByRole('button', {
      name: 'Sign Up',
    });
    // action
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'johndoe@gmail.com');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(registerButton);
    // assert
    expect(mockRegister).toBeCalledWith({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password',
    });
  });
});
