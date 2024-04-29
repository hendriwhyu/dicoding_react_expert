import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CommentInput({ commentThread, authUser = null }) {
  const [comment, setComment] = useState('');

  const commentSubmitHandler = () => {
    if (comment.trim()) {
      commentThread(comment);
      setComment('');
    }
  };

  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };
  return (
    <div className="form-control mb-5">
      <div className="label">
        <span className="label-text">Komentar</span>
      </div>
      {authUser !== null ? (
        <div className="comment-input flex flex-col gap-3">
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Isi komentar..."
            value={comment}
            onChange={commentChangeHandler}
          />
          <button
            type="submit"
            className="btn bg-primary grow text-white"
            onClick={commentSubmitHandler}
          >
            Submit
          </button>
        </div>
      ) : (
        <span className="label-text">
          Anda harus
          <Link to="/" className="link hover:text-primary">
            {' login '}
          </Link>
          terlebih dahulu!
        </span>
      )}
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

CommentInput.propTypes = {
  commentThread: PropTypes.func.isRequired,
  authUser: PropTypes.shape(userShape).isRequired,
};

export default CommentInput;
