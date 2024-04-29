import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAuthUser, unsetAuthUser } from './slice';
import api from '../../utils/api';

const asyncSetAuthUser = createAsyncThunk(
  'asyncSetAuthUser',
  async (data, { dispatch }) => {
    const { email, password } = data;
    try {
      dispatch(showLoading());
      const token = await api.login({ email, password });
      api.putAcessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
      return { error: null };
    } catch (error) {
      alert(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  },
);

const asyncUnsetAuthUser = createAsyncThunk(
  'asyncUnsetAuthUser',
  async (data, { dispatch }) => {
    dispatch(showLoading());
    dispatch(unsetAuthUser());
    api.putAcessToken('');
    dispatch(hideLoading());
  },
);

export { asyncSetAuthUser, asyncUnsetAuthUser };
