import { createSlice } from '@reduxjs/toolkit';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser(state, action) {
      return action.payload;
    },
    unsetAuthUser() {
      return null;
    },
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
