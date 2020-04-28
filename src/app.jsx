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
  static calculateAspectRatio({ width, height, aspectRatio }) {
    const numerator = aspectRatio.split(':')[0];
    const denominator = aspectRatio.split(':')[1];

    if (width) return (width / numerator) * denominator;
    if (height) return (height / denominator) * numerator;

    return null;
  }

  constructor(props) {
    super(props);
    // if( props.alignHeight && props.alignWidth ) throw Error('You have aling o');

    this.sliderRef = React.createRef();
    this.sliderAspectRatio = props.sliderAspectRatio;
    this.length = props.slides.length;
    this.controlsStopAtLast = props.controlsStopAtLast;
    this._alignType = (() => {
      if (props.verticalAlign && props.horizontalAlign) return 'fullScreen';
      if (props.verticalAlign) return 'vertical';
      if (props.horizontalAlign) return 'horizontal';
      return null;
    })();

    let width;
    let height;

    switch (this._alignType) {
      case 'fullScreen':
        width = window.innerWidth;
        height = window.innerHeight;
        break;

      case 'vertical':
        height = props.height || window.innerHeight;
        width = Slider.calculateAspectRatio({ height, aspectRatio: this.sliderAspectRatio });
        break;

      case 'horizontal':
        width = props.width || window.innerWidth;
        height = Slider.calculateAspectRatio({ width, aspectRatio: this.sliderAspectRatio });
        break;

      default:
        width = props.width;
        height = props.height;
        break;
    }

    this.state = {
      activeSlideIndex: props.activeSlideIndex,
      width,
      height,
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
    const { width: maxWidth, height: maxHeight } = this.props;

    this.autoResize = {
      isActive: true,
      _setSizes: (() => {
        switch (this._alignType) {
          case 'fullScreen':
            return (event) => {
              const width = event.target.innerWidth;
              const height = event.target.innerHeight;

              this.setState({ width, height });
            };

          case 'vertical':
            return (event) => {
              const { innerHeight } = event.target;
              let height = innerHeight;
              if (maxHeight) height = innerHeight > maxHeight ? maxHeight : innerHeight;

              const width = Slider.calculateAspectRatio({ height, aspectRatio: this.sliderAspectRatio });

              this.setState({ width, height });
            };

          case 'horizontal':
            return (event) => {
              const { innerWidth } = event.target;
              let width = innerWidth;
              if (maxWidth) width = innerWidth > maxWidth ? maxWidth : innerWidth;

              const height = Slider.calculateAspectRatio({ width, aspectRatio: this.sliderAspectRatio });

              this.setState({ width, height });
            };

          default:
            return (event) => {
              const { innerHeight, innerWidth } = event.target;
              let width = innerWidth;
              let height = innerHeight;
              if (maxHeight) height = innerHeight > maxHeight ? maxHeight : innerHeight;
              if (maxWidth) width = innerWidth > maxWidth ? maxWidth : innerWidth;

              this.setState({ width, height });
            };
        }
      })(),
      add: () => window.addEventListener('resize', this.autoResize._setSizes),
      remove: () => window.removeEventListener('resize', this.autoResize._setSizes),
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
  verticalAlign: PropTypes.bool,
  horizontalAlign: PropTypes.bool,
  sliderAspectRatio: PropTypes.string,
  controls: PropTypes.bool,
  controlsStopAtLast: PropTypes.bool,
  autoResize: PropTypes.bool,
  moveSwipeAction: PropTypes.bool,
};

Slider.defaultProps = {
  slides: [], // arr images for slider.
  activeSlideIndex: 2, // it slide will be shown first, count start at 0.
  pager: true, // Mark of pager availability. If mark true pager will be show.
  pagerStyle: {}, // there can change styles for pager

  verticalAlign: false, // if turn on slider will be scale on vertical line
  //                       if set width with verticalAlign, width will be ignore
  height: 0, // defoult height for slider if verticalAlign turn on it will be maxHeight

  horizontalAlign: true, // if turn on slider will be scale on horizontal line
  //                        if set height with horizontalAlignit, height will be ignore
  width: 0, // defoult width for slider if horizontalAlign turn on it will be maxWidth

  // if pass verticalAlign and horizontalAlign true slider will scale on full screen
  // 🚨height and width will be ignore.

  sliderAspectRatio: '16:9', // If you wona make
  controls: true, // Mark of controls availability. If mark true controls will be show.
  controlsStopAtLast: true, // cen be slideLine and slideCircle
  autoResize: true,
  moveSwipeAction: true,
};

ReactDom.render(<Slider slides={[i1, i2, i3, i4]} />, document.getElementById('root'));
