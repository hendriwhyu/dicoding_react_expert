import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setIsPreload } from './slice';
import { setAuthUser } from '../authUser/slice';

const asyncPreloadProcess = createAsyncThunk(
  'asyncPreloadProcess',
  async (data, { dispatch }) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      dispatch(setAuthUser(null));
    } finally {
      dispatch(setIsPreload(false));
    }
    dispatch(hideLoading());
  },
);

export { asyncPreloadProcess };
