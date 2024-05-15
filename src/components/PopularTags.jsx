import React from 'react';
import PropTypes from 'prop-types';
import Tags from './Tags';

function PopularTags({ tags, clickTag, unclickTag }) {
  return (
    <div className="flex flex-col my-3 gap-2 max-w-xl">
      <p>Kategori Popular</p>
      <div className="flex flex-row gap-3 flex-wrap">
        {tags?.values?.map((tag) => (
          <Tags
            key={`tag-${tag}`}
            clickTag={clickTag}
            unclickTag={unclickTag}
            tag={tag}
          />
        ))}
      </div>
    </div>
  );
}

const tagShape = {
  values: PropTypes.array.isRequired,
  selectedValue: PropTypes.string,
};

PopularTags.propTypes = {
  tags: PropTypes.shape(tagShape).isRequired,
  clickTag: PropTypes.func.isRequired,
  unclickTag: PropTypes.func.isRequired,
};

export default PopularTags;
