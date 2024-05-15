import { createSlice } from '@reduxjs/toolkit';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads(state, action) {
      return action.payload;
    },
    addThreads(state, action) {
      return [action.payload.thread, ...state];
    },
    toggleLikeThread(state, action) {
      return state.map((thread) => {
        if (thread.id === action.payload.id) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy.concat([action.payload.userId]),
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          };
        }
        return thread;
      });
    },
    toggleDislikeThread(state, action) {
      return state.map((thread) => {
        if (thread.id === action.payload.id) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy.concat([action.payload.userId]),
          };
        }
        return thread;
      });
    },
    toggleNeutralThread(state, action) {
      return state.map((thread) => {
        if (thread.id === action.payload.id) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          };
        }
        return thread;
      });
    },
  },
});

export const {
  receiveThreads,
  addThreads,
  toggleLikeThread,
  toggleDislikeThread,
  toggleNeutralThread,
} = threadsSlice.actions;

export default threadsSlice.reducer;
