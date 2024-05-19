import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Button from './Button';

function LoginForm({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="label">
          <span className="text-base label-text">Email</span>
        </label>
        <input
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={onEmailChange}
          placeholder="Email Address"
          className="w-full input input-bordered input-primary"
        />
      </div>
      <div>
        <label htmlFor="password" className="label">
          <span className="text-base label-text">Password</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={onPasswordChange}
          className="w-full input input-bordered input-primary"
        />
      </div>
      <div>
        <Button onClick={() => login({ email, password })} text="Login" />
      </div>
      <span>
        Not have an account ?
        <Link
          to="/register"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {' Register '}
        </Link>
      </span>
    </form>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
