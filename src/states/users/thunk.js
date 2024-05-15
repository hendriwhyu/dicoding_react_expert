import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const asyncRegisterUser = createAsyncThunk(
  'registerUser',
  async (data, { dispatch }) => {
    const { name, email, password } = data;
    try {
      dispatch(showLoading());
      await api.register({ name, email, password });
      toast.success('Register success');
      return { error: null };
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  },
);

export { asyncRegisterUser };
