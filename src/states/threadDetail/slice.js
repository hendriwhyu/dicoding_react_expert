import { createSlice } from '@reduxjs/toolkit';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail(state, action) {
      return action.payload;
    },
    clearThreadDetail() {
      return null;
    },
    toggleLikeThreadDetail(state, action) {
      return {
        ...state,
        upVotesBy: state.upVotesBy.includes(action.payload)
          ? state.upVotesBy.filter((id) => id !== action.payload)
          : state.upVotesBy.concat(action.payload),
        downVotesBy: state.downVotesBy.filter((id) => id !== action.payload),
      };
    },
    toggleDislikeThreadDetail(state, action) {
      return {
        ...state,
        upVotesBy: state.upVotesBy.filter((id) => id !== action.payload),
        downVotesBy: state.downVotesBy.includes(action.payload)
          ? state.downVotesBy.filter((id) => id !== action.payload)
          : state.downVotesBy.concat(action.payload),
      };
    },
    toggleNeutralThreadDetail(state, action) {
      return {
        ...state,
        upVotesBy: state.upVotesBy.filter((id) => id !== action.payload),
        downVotesBy: state.downVotesBy.filter((id) => id !== action.payload),
      };
    },
    addComentThreadDetail(state, action) {
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    },
    toggleLikeCommentThreadDetail(state, action) {
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy.concat(action.payload.userId),
              downVotesBy: comment.downVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
          return comment;
        }),
      };
    },
    toggleDislikeCommentThreadDetail(state, action) {
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                  (id) => id !== action.payload.userId,
                )
                : comment.downVotesBy.concat(action.payload.userId),
            };
          }
          return comment;
        }),
      };
    },
    toggleNeutralCommentThreadDetail(state, action) {
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
              downVotesBy: comment.downVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
          return comment;
        }),
      };
    },
  },
});

export const {
  receiveThreadDetail,
  clearThreadDetail,
  toggleLikeThreadDetail,
  toggleDislikeThreadDetail,
  toggleNeutralThreadDetail,
  addComentThreadDetail,
  toggleLikeCommentThreadDetail,
  toggleDislikeCommentThreadDetail,
  toggleNeutralCommentThreadDetail,
} = threadDetailSlice.actions;

export default threadDetailSlice.reducer;
