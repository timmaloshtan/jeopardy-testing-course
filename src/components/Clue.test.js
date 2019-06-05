import React from 'react';
import { mount } from 'enzyme';

import Clue from './Clue';
import { clue } from '../data/fixtures';

const props = {
  clue,
};

describe('Clue component', () => {
  let clueWrapper = mount(<Clue {...props} />);

  it('should render clue value', () => {
    expect(clueWrapper.find('h4').text()).toEqual(clue.value);
  });

  
  
  it('should render clue question', () => {
    expect(clueWrapper.find('h5').at(0).text()).toEqual(clue.question);
  });
  
  it('should render clue answer', () => {
    expect(clueWrapper.find('h5').at(1).text()).toEqual(clue.answer);
  });
  
  
  it('should apply default class "text-hidden" to clue answer', () => {
    expect(clueWrapper.find('h5').at(1).hasClass('text-hidden')).toBe(true);
  });

  describe('when rendering a clue with no value', () => {
    beforeEach(() => {
      props.clue.value = undefined;
  
      clueWrapper = mount(<Clue {...props} />);
    });

    it('should render Unknown value', () => {
      expect(clueWrapper.find('h4').text()).toEqual('Unknown');
    });
  })
  
  
  describe('when clicked on ', () => {
    beforeEach(() => {
      clueWrapper.find('div').simulate('click');
    });

    it('should apply class "text-reveal" to clue answer', () => {
      expect(clueWrapper.find('h5').at(1).hasClass('text-reveal')).toBe(true);
    });
  });
});
