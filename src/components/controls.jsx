import React from 'react';
import PropTypes from 'prop-types';

const Controls = ({ controlsStopAtLast, goToPre, goToNext, activeIndex, length }) => {
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
  goToPre: PropTypes.func.isRequired,
  goToNext: PropTypes.func.isRequired,
  controlsStopAtLast: PropTypes.bool.isRequired,
};

export default Controls;
