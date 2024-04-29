import React from 'react';
import {
  BiDislike, BiLike, BiSolidDislike, BiSolidLike,
} from 'react-icons/bi';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { postedAt } from '../utils';

function ThreadDetail(props) {
  const {
    id,
    title,
    body,
    owner,
    createdAt,
    upVotesBy,
    downVotesBy,
    category,
    authUser,
    likeThread,
    dislikeThread,
    neutralLikeThread,
  } = props;

  const isThreadLiked = upVotesBy?.includes(authUser);
  const isThreadDisliked = downVotesBy?.includes(authUser);
  const onLikeClick = (event) => {
    event.stopPropagation();
    likeThread(id);
  };
  const onDislikeClick = (event) => {
    event.stopPropagation();
    dislikeThread(id);
  };

  const onNeutralLikeClick = (event) => {
    event.stopPropagation();
    neutralLikeThread(id);
  };
  return (
    <>
      <div className="flex flex-col items-center gap-2 mx-auto mb-5 self-center">
        <p className="text-md text-primary font-semibold">Diskusi</p>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      <div className="flex items-start gap-5 self-stretch">
        <img src={owner?.avatar} alt="profile" className="w-50 rounded-full" />
        <div className="flex flex-col self-center">
          <h3 className="text-md font-normal text-black">{owner?.name}</h3>
          <h3>{postedAt(createdAt)}</h3>
        </div>
      </div>
      <div className="card shadow-md mt-2 mb-5 w-full">
        <div className="card-body flex flex-col items-start gap-5">
          <p>{body && parser(body)}</p>
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
              {upVotesBy?.length}
            </button>
            <button
              type="button"
              aria-label="unlike"
              onClick={isThreadDisliked ? onNeutralLikeClick : onDislikeClick}
              className="flex flex-row gap-2 place-items-center"
            >
              {isThreadDisliked ? <BiSolidDislike /> : <BiDislike />}
              {downVotesBy?.length}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
  likeThread: PropTypes.func.isRequired,
  dislikeThread: PropTypes.func.isRequired,
  neutralLikeThread: PropTypes.func.isRequired,
};

export default ThreadDetail;
