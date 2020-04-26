import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import './assets/style/base.css';

// import Settings from './setings';
import Controls from './components/controls';
import Pager from './components/pager';
import SlidesArr from './components/slides_arr';

import i1 from './assets/images/lake_and_pull.jpg';
import i2 from './assets/images/night_fire.jpg';
import i3 from './assets/images/star_light.jpg';
import i4 from './assets/images/3.jpeg';

class Slider extends React.Component {
  static getHeigth(width, aspectRatio) {
    const numerator = aspectRatio.split(':')[0];
    const denominator = aspectRatio.split(':')[1];

    return (width / numerator) * denominator;
  }

  constructor(props) {
    super(props);

    this.sliderRef = React.createRef();
    this.sliderAspectRatio = props.sliderAspectRatio;
    this.length = props.slides.length;
    this.controlsStopAtLast = props.controlsStopAtLast;

    this.state = {
      activeSlideIndex: props.activeSlideIndex,
      width: props.width,
      height: props.height || Slider.getHeigth(props.width, this.sliderAspectRatio),
    };
  }

  componentDidMount() {
    const { autoResize, moveSwipeAction } = this.props;

    if (autoResize) this._addAutoResize();
    if (moveSwipeAction) {
      this._setListenerSwipe({
        listeningElem: this.sliderRef.current,
        rightSwipeFunc: () => this.goToNext(),
        leftSwipeFunc: () => this.goToPre(),
      });
    }
  }

  componentWillUnmount() {
    const { autoResize, moveSwipeAction } = this.props;

    if (autoResize) this.autoResize.remove();
    if (moveSwipeAction) this.listenerSwipe.remove();
  }

  _addAutoResize() {
    this.autoResize = {
      isActive: true,
      setSizes: (event) => {
        const width = event.target.innerWidth;
        const height = Slider.getHeigth(width, this.sliderAspectRatio);

        this.setState({ width, height });
      },
      add: () => window.addEventListener('resize', this.autoResize.setSizes),
      remove: () => window.removeEventListener('resize', this.autoResize.setSizes),
    };
    this.autoResize.add();
  }

  goTo(index) {
    if (isNaN(index) || typeof index !== 'number') return;
    if (index >= this.length || index < 0) return;

    this.setState({ activeSlideIndex: index });
  }

  _setListenerSwipe({ listeningElem, leftSwipeFunc, rightSwipeFunc }) {
    this.listenerSwipe = {
      touchStartPosition: 0,
      isListening: false,

      _touchStart: () => {
        this.listenerSwipe.touchStartPosition = event.changedTouches[0].pageX;
      },
      _touchEnd: () => {
        const endPosition = event.changedTouches[0].pageX;
        const swipeLength = this.listenerSwipe.touchStartPosition - endPosition;

        if (swipeLength > 50) rightSwipeFunc(); // function move right

        if (swipeLength < -50) leftSwipeFunc(); // function move right
      },
      remove: () => {
        if (!this.listenerSwipe.isListening) return;

        listeningElem.removeEventListener('touchstart', this.listenerSwipe._touchStart);
        listeningElem.removeEventListener('touchend', this.listenerSwipe._touchEnd);

        this.listenerSwipe.isListening = false;
      },
      add: () => {
        if (this.listenerSwipe.isListening) return;

        listeningElem.addEventListener('touchstart', this.listenerSwipe._touchStart, { passive: true });
        listeningElem.addEventListener('touchend', this.listenerSwipe._touchEnd, { passive: true });

        this.listenerSwipe.isListening = true;
      },
    };
    this.listenerSwipe.add();
  }

  goToNext() {
    const { activeSlideIndex } = this.state;

    if (this.controlsStopAtLast && activeSlideIndex + 1 >= this.length) return;
    const index = activeSlideIndex + 1 >= this.length ? 0 : activeSlideIndex + 1;

    this.goTo(index);
  }

  goToPre() {
    const { activeSlideIndex } = this.state;

    if (this.controlsStopAtLast && activeSlideIndex - 1 < 0) return;
    const index = activeSlideIndex - 1 < 0 ? this.length - 1 : activeSlideIndex - 1;

    this.goTo(index);
  }

  render() {
    const { activeSlideIndex, width, height } = this.state;
    const { pagerStyle, slides, controls, pager } = this.props;

    return (
      <div
        className="slider"
        ref={this.sliderRef}
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
          <SlidesArr slides={slides} />
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
            controlsStopAtLast={this.controlsStopAtLast}
            goToPre={() => this.goToPre()}
            activeIndex={activeSlideIndex}
            goToNext={() => this.goToNext()}
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
  autoResize: PropTypes.bool,
  moveSwipeAction: PropTypes.bool,
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
  autoResize: false,
  moveSwipeAction: true,
};

ReactDom.render(<Slider slides={[i1, i2, i3, i4]} />, document.getElementById('root'));
