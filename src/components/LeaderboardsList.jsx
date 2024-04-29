import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardsList({ leaderboardsUser }) {
  return (
    <div id="leaderboard" className="w-full flex flex-col items-start gap-5">
      {leaderboardsUser?.map((leaderboard, index) => (
        <LeaderboardItem
          key={leaderboard.id}
          index={index + 1}
          {...leaderboard}
        />
      ))}
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

LeaderboardsList.propTypes = {
  leaderboardsUser: PropTypes.shape(userShape).isRequired,
};
export default LeaderboardsList;
