import React from 'react';
import PropTypes from 'prop-types';

function Tags({ isActive, clickTag, tag }) {
  return (
    <button
      type="button"
      className={`btn ${
        isActive ? 'btn-primary' : 'btn-outline btn-primary'
      } btn-sm text-white text-sm font-medium align-center`}
      onClick={() => clickTag()}
    >
      {`#${tag}`}
    </button>
  );
}

Tags.propTypes = {
  isActive: PropTypes.bool.isRequired,
  clickTag: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Tags;
