import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import {
  asyncAddCommentThreadDetail,
  asyncReceiveThreadDetail,
  asyncToggleDislikeThreadDetail,
  asyncToggleLikeThreadDetail,
  asyncToggleNeutralThreadDetail,
} from '../states/threadDetail/thunk';

function DetailPage() {
  const { threadId } = useParams();
  const {
    threadDetail = null,
    users = [],
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [threadId, dispatch]);

  const onComment = (content) => {
    dispatch(asyncAddCommentThreadDetail({ threadId, content }));
  };

  const onLikeThread = (id) => {
    dispatch(asyncToggleLikeThreadDetail(id));
  };
  const onDislikeThread = (id) => {
    dispatch(asyncToggleDislikeThreadDetail(id));
  };
  const onNeutralLikeThread = (id) => {
    dispatch(asyncToggleNeutralThreadDetail(id));
  };

  const commentList = threadDetail?.comments?.map((comment) => ({
    ...comment,
    user: users.find((user) => user.id === comment.ownerId),
    authUser,
  }));
  return (
    <section className="homepage pt-16 flex flex-col h-full overflow-hidden">
      <div className="w-full p-6 m-auto lg:max-w-xl">
        <ThreadDetail
          {...threadDetail}
          authUser={authUser?.id}
          likeThread={onLikeThread}
          dislikeThread={onDislikeThread}
          neutralLikeThread={onNeutralLikeThread}
        />
        <hr />
        <CommentInput authUser={authUser} commentThread={onComment} />
        <hr />
        <CommentList comments={commentList} />
      </div>
    </section>
  );
}

export default DetailPage;
