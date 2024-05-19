import React from 'react';
import LeaderboardItem from '../components/LeaderboardItem';
import '../styles/style.css';
import LeaderboardsList from '../components/LeaderboardsList';

const stories = {
  title: 'LeaderboardItem Component',
  component: [LeaderboardItem, LeaderboardsList],
};

export default stories;

const user = {
  id: 'user-123',
  name: 'John Doe',
  avatar: 'https://ui-avatars.com/api/?name=JohnDoe&background=random',
};

const listLeaderboard = [
  {
    user: {
      id: 'user-121',
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=JohnDoe&background=random',
    },
    score: 100,
  },
  {
    user: {
      id: 'user-123',
      name: 'Dimas Saputra',
      avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    },
    score: 50,
  },
  {
    user: {
      id: 'user-122',
      name: 'Fadhli',
      avatar: 'https://ui-avatars.com/api/?name=Fadhli&background=random',
    },
    score: 25,
  },
];

function Template(args) {
  return <LeaderboardItem {...args} />;
}

export const Item = Template.bind({});
Item.args = {
  index: 1,
  user,
  score: 100,
};

export function ListLeaderboard() {
  return <LeaderboardsList leaderboardsUser={listLeaderboard} />;
}
