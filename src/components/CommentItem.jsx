import React from 'react';
import {
  BiDislike, BiLike, BiSolidDislike, BiSolidLike,
} from 'react-icons/bi';
import parser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { postedAt } from '../utils';
import {
  asyncToggleDislikeComment,
  asyncToggleLikeComment,
  asyncToggleNeutralComment,
} from '../states/threadDetail/thunk';

function CommentItem(props) {
  const {
    index,
    id,
    content,
    createdAt,
    upVotesBy,
    downVotesBy,
    owner,
    authUser,
  } = props;
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const onLikeClick = (event) => {
    event.stopPropagation();
    dispatch(asyncToggleLikeComment({ threadId, id }));
  };
  const onDislikeClick = (event) => {
    event.stopPropagation();
    dispatch(asyncToggleDislikeComment({ threadId, id }));
  };

  const onNeutralLikeClick = (event) => {
    event.stopPropagation();
    dispatch(asyncToggleNeutralComment({ threadId, id }));
  };

  const isCommentLiked = upVotesBy?.includes(authUser?.id);
  const isCommentDisliked = downVotesBy?.includes(authUser?.id);

  const direction = index % 2 === 0 ? 'left' : 'right';
  const variants = {
    hidden: { opacity: 0, x: direction === 'left' ? -100 : 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };
  return (
    <motion.div
      className="card shadow-md mt-5 w-full"
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={{ scale: 1.1 }}
    >
      <div className="card-body flex flex-col items-start gap-5">
        <div className="flex items-start gap-5 self-stretch">
          <img
            src={owner?.avatar}
            alt="profile"
            className="w-50 rounded-full"
          />
          <div className="flex flex-col self-center">
            <h3 className="text-md font-normal text-black">{owner?.name}</h3>
            <h3>{postedAt(createdAt)}</h3>
          </div>
        </div>
        <p>{content && parser(content)}</p>
        <div className="flex flex-row gap-7">
          <button
            type="button"
            aria-label="like"
            onClick={isCommentLiked ? onNeutralLikeClick : onLikeClick}
            className="flex flex-row gap-2 place-items-center"
          >
            {isCommentLiked ? <BiSolidLike /> : <BiLike />}
            {upVotesBy?.length}
          </button>
          <button
            type="button"
            aria-label="unlike"
            onClick={isCommentDisliked ? onNeutralLikeClick : onDislikeClick}
            className="flex flex-row gap-2 place-items-center"
          >
            {isCommentDisliked ? <BiSolidDislike /> : <BiDislike />}
            {downVotesBy?.length}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export const commentItemShape = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  index: PropTypes.number.isRequired,
  ...commentItemShape,
  authUser: PropTypes.shape(userShape).isRequired,
};
export default CommentItem;
