import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const {
    onClick,
    text,
    type,
    themes,
    outline,
  } = props;
  const background = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-error',
    warning: 'btn-warning',
    info: 'btn-info',
  };
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`btn btn-block ${background[themes]} ${outline ? 'btn-outline' : ''} text-white mb-2`}
      onClick={(event) => onClick(event)}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
  themes: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
  ]),
  outline: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  themes: 'primary',
  outline: false,
};

export default Button;
