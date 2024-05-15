import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import {
  addComentThreadDetail,
  clearThreadDetail,
  receiveThreadDetail,
  toggleDislikeCommentThreadDetail,
  toggleDislikeThreadDetail,
  toggleLikeCommentThreadDetail,
  toggleLikeThreadDetail,
  toggleNeutralCommentThreadDetail,
  toggleNeutralThreadDetail,
} from './slice';
import api from '../../utils/api';

const asyncReceiveThreadDetail = createAsyncThunk(
  'asyncReceiveThreadDetail',
  async (threadId, { dispatch }) => {
    dispatch(showLoading());
    dispatch(clearThreadDetail());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetail(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

const asyncToggleLikeThreadDetail = createAsyncThunk(
  'asyncToggleLikeThreadDetail',
  async (data, { dispatch, getState }) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeThreadDetail(authUser.id));

    try {
      await api.toggleLikeThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  },
);

const asyncToggleDislikeThreadDetail = createAsyncThunk(
  'asyncToggleDislikeThreadDetail',
  async (data, { dispatch, getState }) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDislikeThreadDetail(authUser.id));
    try {
      await api.toggleDislikeThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  },
);

const asyncToggleNeutralThreadDetail = createAsyncThunk(
  'asyncToggleNeutralThreadDetail',
  async (data, { dispatch, getState }) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralThreadDetail(authUser.id));
    try {
      await api.toggleNeutralThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  },
);

const asyncAddCommentThreadDetail = createAsyncThunk(
  'asyncAddCommentThreadDetail',
  async (data, { dispatch }) => {
    const { threadId, content } = data;
    try {
      dispatch(showLoading());
      const commentThread = await api.createComment(threadId, content);
      dispatch(addComentThreadDetail(commentThread));
      toast.success('Comment created successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

const asyncToggleLikeComment = createAsyncThunk(
  'toggleLikeComment',
  async (data, { dispatch, getState }) => {
    const { threadId, id: commentId } = data;
    const { authUser } = getState();

    dispatch(
      toggleLikeCommentThreadDetail({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );
    try {
      await api.toggleLikeComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleLikeCommentThreadDetail({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }
  },
);

const asyncToggleDislikeComment = createAsyncThunk(
  'toggleDislikeComment',
  async (data, { dispatch, getState }) => {
    const { threadId, id: commentId } = data;
    const { authUser } = getState();
    dispatch(
      toggleDislikeCommentThreadDetail({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );
    try {
      await api.toggleDislikeComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleDislikeCommentThreadDetail({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }
  },
);

const asyncToggleNeutralComment = createAsyncThunk(
  'toggleNeutralComment',
  async (data, { dispatch, getState }) => {
    const { threadId, id: commentId } = data;
    const { authUser } = getState();
    dispatch(
      toggleNeutralCommentThreadDetail({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );
    try {
      await api.toggleNeutralComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralCommentThreadDetail({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }
  },
);

export {
  asyncReceiveThreadDetail,
  asyncToggleLikeThreadDetail,
  asyncToggleDislikeThreadDetail,
  asyncToggleNeutralThreadDetail,
  asyncAddCommentThreadDetail,
  asyncToggleLikeComment,
  asyncToggleDislikeComment,
  asyncToggleNeutralComment,
};
