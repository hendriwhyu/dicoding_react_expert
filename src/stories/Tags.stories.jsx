import React from 'react';
import { action } from '@storybook/addon-actions';
import Tags from '../components/Tags';
import '../styles/style.css';

// Default export that defines the component and title for the Storybook UI
const stories = {
  title: 'Tags Component',
  component: Tags,
};

export default stories;

function Template(args) {
  return <Tags {...args} />;
}

// Default story
export const Default = Template.bind({});
Default.args = {
  index: 0,
  tag: 'example',
  clickTag: action('clickTag'),
  unclickTag: action('unclickTag'),
  type: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  type: 'secondary',
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  type: 'success',
};

export const Danger = Template.bind({});
Danger.args = {
  ...Default.args,
  type: 'danger',
};

export const Warning = Template.bind({});
Warning.args = {
  ...Default.args,
  type: 'warning',
};

export const Info = Template.bind({});
Info.args = {
  ...Default.args,
  type: 'info',
};

// Story with multiple tags
export function MultipleTags() {
  return (
    <div className="flex gap-3">
      {['first', 'second', 'third'].map((tag, index) => (
        <Tags
          key={tag}
          index={index}
          tag={tag}
          clickTag={action(`clickTag-${tag}`)}
          unclickTag={action(`unclickTag-${tag}`)}
          type="primary"
        />
      ))}
    </div>
  );
}
