import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadsList(props) {
  const {
    threads,
    like,
    dislike,
    neutralLike,
  } = props;
  return (
    <div className="thread-list mb-20 max-w-xl flex flex-col items-start gap-10">
      {threads?.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          like={like}
          dislike={dislike}
          neutralLike={neutralLike}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  neutralLike: PropTypes.func.isRequired,
};

export default ThreadsList;
