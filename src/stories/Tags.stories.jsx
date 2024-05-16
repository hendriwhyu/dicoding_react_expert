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
// Template for creating different stories
const Template = (args) => {
  <Tags {...args} />;
};

// Default story
const Default = Template.bind({});
Default.args = {
  index: 0,
  tag: 'example',
  clickTag: action('clickTag'),
  unclickTag: action('unclickTag'),
};

// Story with multiple tags
function MultipleTags() {
  return (
    <div className="flex gap-3">
      {['first', 'second', 'third'].map((tag, index) => (
        <Tags
          key={tag}
          index={index}
          tag={tag}
          clickTag={action(`clickTag-${tag}`)}
          unclickTag={action(`unclickTag-${tag}`)}
        />
      ))}
    </div>
  );
}

export { Default, MultipleTags };
