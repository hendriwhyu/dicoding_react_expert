import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import {
  addThreads,
  toggleDislikeThread,
  toggleLikeThread,
  toggleNeutralThread,
} from './slice';
import api from '../../utils/api';

const asyncAddThread = createAsyncThunk(
  'addThread',
  async (data, { dispatch }) => {
    const { title, body, category } = data;
    try {
      dispatch(showLoading());
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreads(thread));
      toast.success('Thread created successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

const asyncToggleLikeThread = createAsyncThunk(
  'asyncToggleLikeThread',
  async (id, { dispatch, getState }) => {
    const { authUser } = getState();
    dispatch(toggleLikeThread({ id, userId: authUser.id }));
    try {
      await api.toggleLikeThread(id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeThread({ id, userId: authUser.id }));
    }
  },
);

const asyncToggleDislikeThread = createAsyncThunk(
  'asyncToggleDislikeThread',
  async (id, { dispatch, getState }) => {
    const { authUser } = getState();
    dispatch(toggleDislikeThread({ id, userId: authUser.id }));
    try {
      await api.toggleDislikeThread(id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDislikeThread({ id, userId: authUser.id }));
    }
  },
);

const asyncToggleNeutralThread = createAsyncThunk(
  'asyncToggleNeutralThread',
  async (id, { dispatch, getState }) => {
    const { authUser } = getState();
    dispatch(toggleNeutralThread({ id, userId: authUser.id }));
    try {
      await api.toggleNeutralThread(id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralThread({ id, userId: authUser.id }));
    }
  },
);

export {
  asyncAddThread,
  asyncToggleLikeThread,
  asyncToggleDislikeThread,
  asyncToggleNeutralThread,
};
