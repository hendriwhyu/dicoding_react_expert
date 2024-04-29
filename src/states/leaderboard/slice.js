import { createSlice } from '@reduxjs/toolkit';

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {
    receiveLeaderboards(state, action) {
      return action.payload;
    },
  },
});

export const { receiveLeaderboards } = leaderboardsSlice.actions;

export default leaderboardsSlice.reducer;
