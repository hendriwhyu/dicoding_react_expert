import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import usersSlice from './users/slice';
import authUserSlice from './authUser/slice';
import threadsSlice from './threads/slice';
import threadDetailSlice from './threadDetail/slice';
import isPreloadSlice from './isPreload/slice';
import leaderboardsSlice from './leaderboard/slice';
import categoriesSlice from './category/slice';

const store = configureStore({
  reducer: {
    authUser: authUserSlice,
    isPreload: isPreloadSlice,
    users: usersSlice,
    threads: threadsSlice,
    threadDetail: threadDetailSlice,
    loadingBar: loadingBarReducer,
    leaderboards: leaderboardsSlice,
    categories: categoriesSlice,
  },
});

export default store;
