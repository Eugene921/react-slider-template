import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import './assets/style/base.css';

// import Settings from './setings';
import Controls from './components/controls';
import Pager from './components/pager';

import i1 from './assets/images/lake_and_pull.jpg';
import i2 from './assets/images/night_fire.jpg';
import i3 from './assets/images/star_light.jpg';
import i4 from './assets/images/3.jpeg';

const SlidesArr = ({ style, slides }) => {
  return slides.map((slide, i) => {
    return <div style={{ ...style, backgroundImage: `url(${slide})` }} className="slide" key={i.toString()} />;
  });
};

class Slider extends React.Component {
  static getHeigth(width, aspectRatio) {
    const numerator = aspectRatio.split(':')[0];
    const denominator = aspectRatio.split(':')[1];

    return (width / numerator) * denominator;
  }

  constructor(props) {
    super(props);
    this.sliderAspectRatio = props.sliderAspectRatio;
    this.length = props.slides.length;

    this.state = {
      activeSlideIndex: props.activeSlideIndex, // position of showed slide
      width: props.width,
      height: props.height || Slider.getHeigth(props.width, this.sliderAspectRatio),
    };

    this.init();
  }

  activeAutoResize() {
    window.addEventListener('resize', (e) => {
      const width = e.target.innerWidth;
      const height = Slider.getHeigth(width, this.sliderAspectRatio);

      this.setState({ width, height });
    });
  }

  goTo(index) {
    if (isNaN(index) || typeof index !== 'number') return;
    if (index >= this.length) return;

    this.setState({ activeSlideIndex: index });
  }

  init() {
    const { autoResizeSlider } = this.props;

    if (autoResizeSlider) this.activeAutoResize();
  }

  render() {
    const { activeSlideIndex, width, height } = this.state;
    const { pagerStyle, slides, controls, controlsStopAtLast, pager } = this.props;

    return (
      <div
        className="slider"
        style={{
          height,
          width,
        }}
      >
        <div
          className="viewport"
          style={{
            transform: `translateX(-${(100 / this.length) * activeSlideIndex}%)`,
            width: `${this.length}00%`,
          }}
        >
          <SlidesArr activeSlideIndex={activeSlideIndex} slides={slides} />
        </div>
        {pager && (
          <Pager
            style={pagerStyle}
            length={this.length}
            activeIndex={activeSlideIndex}
            onChangeActiveIndex={(i) => this.goTo(i)}
          />
        )}
        {controls && (
          <Controls
            controlsStopAtLast={controlsStopAtLast}
            onChangeActiveIndex={(i) => this.goTo(i)}
            activeIndex={activeSlideIndex}
            length={this.length}
          />
        )}
      </div>
    );
  }
}

Slider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.any),
  activeSlideIndex: PropTypes.number,
  pager: PropTypes.bool,
  pagerStyle: PropTypes.objectOf(PropTypes.string),
  width: PropTypes.number,
  height: PropTypes.number,
  sliderAspectRatio: PropTypes.string,
  controls: PropTypes.bool,
  controlsStopAtLast: PropTypes.bool,
  autoResizeSlider: PropTypes.bool,
};

Slider.defaultProps = {
  slides: [],
  activeSlideIndex: 2,
  pager: true,
  pagerStyle: {},
  height: 0,
  width: window.innerWidth,
  sliderAspectRatio: '16:9',
  controls: true,
  controlsStopAtLast: true, // cen be slideLine and slideCircle
  autoResizeSlider: true,
};

ReactDom.render(<Slider slides={[i1, i2, i3, i4]} />, document.getElementById('root'));
