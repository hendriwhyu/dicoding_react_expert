import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function Tags(props) {
  const {
    index,
    clickTag,
    unclickTag,
    tag,
    type,
  } = props;
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

  const background = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-error',
    warning: 'btn-warning',
    info: 'btn-info',
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: index * 0.2, // Menambahkan delay berdasarkan indeks
        duration: 0.7, // Durasi animasi
        ease: 'easeInOut', // Transisi ease-in-out
      },
    },
  };
  return (
    <motion.button
      type="button"
      className={`btn ${
        active === true ? `${background[type]}` : `btn-outline ${background[type]}`
      } btn-sm text-white text-sm font-medium align-center`}
      onClick={() => onClickTag()}
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {`#${tag}`}
    </motion.button>
  );
}

Tags.propTypes = {
  index: PropTypes.number.isRequired,
  clickTag: PropTypes.func.isRequired,
  unclickTag: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
  ]).isRequired,
};

export default Tags;
