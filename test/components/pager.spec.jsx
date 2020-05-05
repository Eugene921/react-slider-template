import React from 'react';
import { shallow } from 'enzyme';

import Pager from '../../src/components/pager';

describe('pager', () => {
  let wrapper;
  let func;
  beforeEach(() => {
    func = jest.fn();
    wrapper = shallow(<Pager activeIndex={1} length={3} onChangeActiveIndex={func} />);
  });

  it('dot cuont', () => {
    expect(wrapper.find('.dot')).toHaveLength(3);
  });

  it('if length={1}, break render', () => {
    const emptyWrapper = shallow(<Pager activeIndex={1} length={0} onChangeActiveIndex={func} />);

    expect(emptyWrapper.children()).toHaveLength(0);
  });

  it('render with activeIndex > length - 1', () => {
    const emptyWrapper = shallow(<Pager activeIndex={2} length={1} onChangeActiveIndex={func} />);

    expect(emptyWrapper.children()).toHaveLength(0);
  });

  it('render with activeIndex < 0', () => {
    const emptyWrapper = shallow(<Pager activeIndex={-1} length={1} onChangeActiveIndex={func} />);

    expect(emptyWrapper.children()).toHaveLength(0);
  });

  it('have one active dot', () => {
    expect(wrapper.find('.dot').some('.pager_dot_a')).toEqual(true);
    expect(wrapper.find('.dot').every('.pager_dot_a')).toEqual(false);
  });

  it('right active dot', () => {
    expect(wrapper.find('.dot').at(1).hasClass('pager_dot_a')).toEqual(true);
  });

  it('call a function after click', () => {
    wrapper.find('.dot').at(2).simulate('click');
    wrapper.find('.dot').at(1).simulate('click');
    wrapper.find('.dot').at(0).simulate('click');
    expect(func.mock.calls).toHaveLength(3);
  });
});
