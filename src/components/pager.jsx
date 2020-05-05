import React from 'react';
import PropTypes from 'prop-types';

const Pager = ({ activeIndex, length, onChangeActiveIndex }) => {
  if (length === 0) return null;
  if (activeIndex < 0 || activeIndex > length - 1) return null;

  const elemDots = [];

  for (let i = 0; i < length; i += 1) {
    elemDots.push(
      <li key={i.toString()}>
        <button
          type="button"
          className={activeIndex === i ? 'pager_dot_a dot' : 'dot'}
          onClick={() => onChangeActiveIndex(i)}
        />
      </li>
    );
  }

  return <ul className="pager">{elemDots}</ul>;
};

Pager.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  onChangeActiveIndex: PropTypes.func.isRequired,
};

export default Pager;
