import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import RegisterForm from '../components/RegisterForm';
import { asyncRegisterUser } from '../states/users/thunk';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async (data) => {
    const { name, email, password } = data;
    try {
      const { error } = await dispatch(
        asyncRegisterUser({ name, email, password }),
      );
      if (!error) {
        navigate('/login');
      }
    } catch (error) {
      navigate('/register');
    }
  };
  return (
    <section className="register pt-16 flex flex-col h-full overflow-hidden">
      <div className="w-full p-6 m-auto lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-black">
          Register
        </h1>
        <RegisterForm register={onRegister} />
      </div>
    </section>
  );
}

export default RegisterPage;
