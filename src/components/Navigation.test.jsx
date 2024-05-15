import React from 'react';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import {
  afterEach,
  describe,
  expect,
  it,
} from 'vitest';
import { MemoryRouter as Router } from 'react-router';
import Navigation from './Navigation';
/**
 * skenario testing
 *
 * - Navigation component
 *   - renders Navigation Component correctly
 *   - should has Login link button when pathname on page is not /login
 *   - should has Register link button when pathname on page is not /register
 *   - should have alt Avatar Profile when authUser is not null
 */
expect.extend(matchers);
describe('Navigation component', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders Navigation Component correctly', async () => {
    // arrange
    render(
      <Router>
        <Navigation authUser={null} />
      </Router>,
    );

    const threadLink = await screen.getByRole('link', { name: 'Thread' });
    const leaderboardsLink = await screen.getByRole('link', {
      name: 'Leaderboard',
    });

    // assert
    expect(threadLink).toBeInTheDocument();
    expect(leaderboardsLink).toBeInTheDocument();
  });
  it('should has Login link button when pathname on page is not /login', async () => {
    // arrange
    render(
      <Router initialEntries={['/register']}>
        <Navigation authUser={null} />
      </Router>,
    );
    window.location.pathname = '/register';

    const loginLink = await screen.getByRole('link', { name: 'Login' });

    // assert
    expect(loginLink).toBeInTheDocument();
  });
  it('should has Register link button when pathname on page is not /register', async () => {
    // arrange
    render(
      <Router initialEntries={['/login']}>
        <Navigation authUser={null} />
      </Router>,
    );

    const registerLink = await screen.getByRole('link', { name: 'Register' });

    // assert
    expect(registerLink).toBeInTheDocument();
  });
  it('should has Register link button when pathname on page is not /register', async () => {
    // arrange
    const authUser = {
      id: 'user-mQhLzINW_w5TxxYf',
      name: 'Dimas Saputra',
      email: 'dimas@dicoding.com',
      avatar:
        'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    };
    render(
      <Router initialEntries={['/threads']}>
        <Navigation authUser={authUser} />
      </Router>,
    );

    const avatar = await screen.getByAltText('Avatar Profile');

    // assert
    expect(avatar).toBeInTheDocument();
  });
});
