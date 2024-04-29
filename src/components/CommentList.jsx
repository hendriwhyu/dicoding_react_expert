import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from './CommentItem';

function CommentList({ comments }) {
  return (
    <div className="comments-list mb-20 w-xl flex flex-col items-start gap-5">
      {comments?.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.shape(commentItemShape).isRequired,
};

export default CommentList;
