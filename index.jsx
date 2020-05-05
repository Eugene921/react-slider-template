import React from 'react';
import { render } from 'react-dom';

import Slider from './src/app';

import i1 from './src/assets/images/lake_and_pull.jpg';
import i2 from './src/assets/images/night_fire.jpg';
import i3 from './src/assets/images/star_light.jpg';
import i4 from './src/assets/images/3.jpeg';

render(<Slider slides={[i1, i2, i3, i4]} pager />, document.getElementById('root'));
