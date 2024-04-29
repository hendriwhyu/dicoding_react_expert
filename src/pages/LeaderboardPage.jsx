import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardsList from '../components/LeaderboardsList';
import { asyncLeaderboardUsers } from '../states/shared/thunk';

function LeaderboardPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLeaderboardUsers());
  }, [dispatch]);

  const sortedLeaderboard = leaderboards
    .slice()
    .sort((a, b) => b.score - a.score)
    .map((leaderboard) => ({
      ...leaderboard,
    }));

  return (
    <section className="leaderboard pt-16 flex flex-col h-full overflow-hidden">
      <div className="w-full p-6 m-auto lg:max-w-xl">
        <h1 className="text-2xl font-semibold text-center text-black">
          Leaderboard 🏆
        </h1>

        <div className="card shadow-md mt-5">
          <div className="card-body flex flex-col items-start gap-5">
            <LeaderboardsList leaderboardsUser={sortedLeaderboard} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeaderboardPage;
