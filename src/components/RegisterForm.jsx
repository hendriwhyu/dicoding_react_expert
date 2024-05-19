import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Button from './Button';

function RegisterForm({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="label">
          <span className="text-base label-text">Name</span>
        </label>
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={onNameChange}
          className="w-full input input-bordered input-primary"
        />
      </div>
      <div>
        <label htmlFor="email" className="label">
          <span className="text-base label-text">Email</span>
        </label>
        <input
          name="email"
          type="text"
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
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={onPasswordChange}
          className="w-full input input-bordered input-primary"
        />
      </div>
      <div>
        <Button onClick={() => register({ name, email, password })} text="Sign Up" />
      </div>
      <span>
        Already have an account ?
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {' Login '}
        </Link>
      </span>
    </form>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterForm;
