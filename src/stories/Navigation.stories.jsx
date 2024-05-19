import React from 'react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import '../styles/style.css';
import Navigation from '../components/Navigation';

const stories = {
  title: 'Navigation Component',
  component: Navigation,
};

export default stories;

function Template(args) {
  return (
    <MemoryRouter>
      <Navigation {...args} />
    </MemoryRouter>
  );
}

const user = {
  id: 'user-123',
  name: 'John Doe',
  avatar: 'https://ui-avatars.com/api/?name=JohnDoe&background=random',
};

const Default = Template.bind({});
Default.args = {
  authUser: user,
  signOut: action('signOut'),
};

export { Default };
