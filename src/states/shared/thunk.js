import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveUsers } from '../users/slice';
import { receiveLeaderboards } from '../leaderboard/slice';
import { receiveThreads } from '../threads/slice';
import { receiveCategories } from '../category/slice';

const asyncPopulateUsersAndThreads = createAsyncThunk(
  'asyncPopulateUsersAndThreads',
  async (data, { dispatch }) => {
    try {
      dispatch(showLoading());
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      const categories = threads.map((tag) => tag.category);

      dispatch(receiveUsers(users));
      dispatch(receiveThreads(threads));
      dispatch(receiveCategories(categories));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

const asyncLeaderboardUsers = createAsyncThunk(
  'asyncLeaderboardUsers',
  async (data, { dispatch }) => {
    try {
      dispatch(showLoading());
      const users = await api.getAllUsers();
      const leaderboard = await api.getAllLeaderboards();
      dispatch(receiveUsers(users));
      dispatch(receiveLeaderboards(leaderboard));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export { asyncPopulateUsersAndThreads, asyncLeaderboardUsers };
