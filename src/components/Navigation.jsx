import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navigation({ authUser, signOut }) {
  const { pathname } = useLocation();

  return (
    <nav className="navbar bg-primary text-white fixed top-0 z-[100]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52"
          >
            <li>
              <Link to="/">Thread</Link>
            </li>
            <li>
              <Link to="/leaderboards">Leaderboard</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Forum App
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li>
            <Link to="/">Threads</Link>
          </li>
          <li>
            <Link to="/leaderboards">Leaderboards</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {authUser !== null ? (
          <div className="flex gap-2">
            <div className="avatar-menu dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar Profile"
                    src={authUser?.avatar}
                  />
                </div>
              </div>
              <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-lg text-black">
                <li>
                  <button type="button" onClick={signOut}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex-none gap-2">
            <ul className="menu menu-horizontal text-lg px-1">
              <li>
                {pathname !== '/login' ? (
                  <Link to="/login">Login</Link>
                ) : (
                  <Link to="/register">Register</Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

const authUserPattern = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserPattern).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
