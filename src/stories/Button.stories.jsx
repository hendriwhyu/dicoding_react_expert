import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../components/Button';
import '../styles/style.css';

const stories = {
  title: 'Button Component',
  component: Button,
};

export default stories;

function TemplateStory(args) {
  return <Button {...args} />;
}

const Default = TemplateStory.bind({});
Default.args = {
  onClick: action('onClick'),
  text: 'Example',
  themes: 'primary',
  type: 'button',
};

const Outline = TemplateStory.bind({});
Outline.args = {
  onClick: action('onClick'),
  text: 'Example',
  themes: 'primary',
  type: 'button',
  outline: true,
};

const Secondary = TemplateStory.bind({});
Secondary.args = {
  onClick: action('onClick'),
  text: 'Example',
  themes: 'secondary',
  type: 'button',
  outline: true,
};
const Success = TemplateStory.bind({});
Success.args = {
  onClick: action('onClick'),
  text: 'Example',
  themes: 'success',
  type: 'button',
  outline: true,
};
const Danger = TemplateStory.bind({});
Danger.args = {
  onClick: action('onClick'),
  text: 'Example',
  themes: 'danger',
  type: 'button',
  outline: true,
};
const Warning = TemplateStory.bind({});
Warning.args = {
  onClick: action('onClick'),
  text: 'Example',
  themes: 'warning',
  type: 'button',
  outline: true,
};
const Info = TemplateStory.bind({});
Info.args = {
  onClick: action('onClick'),
  text: 'Example',
  themes: 'info',
  type: 'button',
  outline: true,
};
export {
  Default,
  Outline,
  Secondary,
  Success,
  Danger,
  Warning,
  Info,
};
