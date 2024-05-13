import React from 'react';
import {
  BiDislike,
  BiLike,
  BiSolidDislike,
  BiSolidLike,
} from 'react-icons/bi';
import { BsReply } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { postedAt } from '../utils';

function ThreadItem(props) {
  const {
    id,
    title,
    body,
    category,
    createdAt,
    upVotesBy,
    downVotesBy,
    totalComments,
    user,
    authUser,
    like,
    dislike,
    neutralLike,
  } = props;
  const isThreadLiked = upVotesBy?.includes(authUser);
  const isThreadDisliked = downVotesBy?.includes(authUser);

  const navigate = useNavigate();

  const onLikeClick = (event) => {
    event.stopPropagation();
    like(id);
  };
  const onDislikeClick = (event) => {
    event.stopPropagation();
    dislike(id);
  };

  const onNeutralLikeClick = (event) => {
    event.stopPropagation();
    neutralLike(id);
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      className="card w-full shadow-md mt-5"
      onClick={onThreadClick}
      onKeyDown={onThreadPress}
    >
      <div className="card-body flex flex-col items-start gap-5">
        <h1 className="text-lg font-normal ">{title}</h1>
        <div className="flex items-start gap-5 self-stretch">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-50 rounded-full"
          />
          <div className="flex flex-col self-center">
            <h3 className="text-md font-normal text-black">{user?.name}</h3>
            <h3>{postedAt(createdAt)}</h3>
          </div>
        </div>
        <div>{parser(body)}</div>
        <div className="flex flex-row">
          <span className="bg-primary text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded align-center">
            {`#${category}`}
          </span>
        </div>
        <div className="flex flex-row gap-7">
          <button
            type="button"
            aria-label="like"
            onClick={isThreadLiked ? onNeutralLikeClick : onLikeClick}
            className="flex flex-row gap-2 place-items-center"
          >
            {isThreadLiked ? <BiSolidLike /> : <BiLike />}
            {upVotesBy.length}
          </button>

          <button
            type="button"
            aria-label="unlike"
            onClick={isThreadDisliked ? onNeutralLikeClick : onDislikeClick}
            className="flex flex-row gap-2 place-items-center"
          >
            {isThreadDisliked ? <BiSolidDislike /> : <BiDislike />}
            {downVotesBy.length}
          </button>
          <span className="flex flex-row gap-2 place-items-baseline">
            <BsReply />
            {totalComments}
          </span>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default ThreadItem;
