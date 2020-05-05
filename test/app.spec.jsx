import React from 'react';
import { mount, shallow, render } from 'enzyme';

import Slider from '../src/app';

describe('render', () => {
  it('check slide cuont', () => {
    const wrapper = mount(<Slider slides={[' ', ' ']} />);

    expect(wrapper.find('.slide')).toHaveLength(2);
  });
});
