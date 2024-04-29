import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { asyncSetAuthUser } from '../states/authUser/thunk';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogin = async ({ email, password }) => {
    try {
      const { error } = await dispatch(asyncSetAuthUser({ email, password }));
      if (!error) {
        navigate('/');
      }
    } catch (error) {
      navigate('/login');
    }
  };
  return (
    <section className="login pt-16 flex flex-col h-full overflow-hidden">
      <div className="w-full p-6 m-auto lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-black">Login</h1>
        <LoginForm login={onLogin} />
      </div>
    </section>
  );
}

export default LoginPage;
