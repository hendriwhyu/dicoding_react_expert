import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Tags({ clickTag, unclickTag, tag }) {
  const [active, setActive] = useState(false);

  const onClickTag = () => {
    if (active === true) {
      setActive(false);
      unclickTag(tag);
    } else {
      setActive(true);
      clickTag(tag);
    }
  };

  return (
    <button
      type="button"
      className={`btn ${
        active === true ? 'btn-primary' : 'btn-outline btn-primary'
      } btn-sm text-white text-sm font-medium align-center`}
      onClick={() => onClickTag()}
    >
      {`#${tag}`}
    </button>
  );
}

Tags.propTypes = {
  clickTag: PropTypes.func.isRequired,
  unclickTag: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Tags;
