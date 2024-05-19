import React from 'react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import ThreadItem from '../components/ThreadItem';
import '../styles/style.css';

const stories = {
  title: 'ThreadItem Component',
  component: ThreadItem,
};

export default stories;

function Template(args) {
  return (
    <MemoryRouter>
      <ThreadItem {...args} />
    </MemoryRouter>
  );
}

const ownerThread = {
  id: 'user-123',
  name: 'John Doe',
  avatar: 'https://ui-avatars.com/api/?name=JohnDoe&background=random',
};

const Default = Template.bind({});
Default.args = {
  index: 0,
  id: '1',
  title: 'Bagaimana pengalamanmu belajar Redux?',
  body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
  category: 'General',
  createdAt: '2021-01-01T00:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 2,
  user: ownerThread,
  authUser: 'user-123',
  like: action('onLikeClick'),
  dislike: action('onDislikeClick'),
  neutralLike: action('onNeutralLikeClick'),
};

export { Default };
