import React from 'react';
import PropTypes from 'prop-types';

const Controls = ({ controlsStopAtLast, onChangeActiveIndex, activeIndex, length }) => {
  const goToNext = () => {
    if (controlsStopAtLast && activeIndex + 1 >= length) return;

    const index = activeIndex + 1 >= length ? 0 : activeIndex + 1;

    onChangeActiveIndex(index);
  };

  const goToPre = () => {
    if (controlsStopAtLast && activeIndex - 1 < 0) return;

    const index = activeIndex - 1 < 0 ? length - 1 : activeIndex - 1;

    onChangeActiveIndex(index);
  };

  return (
    <>
      <button
        style={controlsStopAtLast && activeIndex === length - 1 ? { opacity: 0.1 } : null}
        className="controls controls_right"
        type="button"
        onClick={goToNext}
      >
        ❱
      </button>
      <button
        style={controlsStopAtLast && activeIndex === 0 ? { opacity: 0.1 } : null}
        className="controls controls_left"
        type="button"
        onClick={goToPre}
      >
        ❰
      </button>
    </>
  );
};

Controls.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  onChangeActiveIndex: PropTypes.func.isRequired,
  controlsStopAtLast: PropTypes.bool.isRequired,
};

export default Controls;
