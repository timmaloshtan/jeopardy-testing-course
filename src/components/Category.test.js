import React from 'react';
import { shallow } from 'enzyme';

import { Category } from './Category';
import { categories, clues } from '../data/fixtures'

const props = { category: categories[0] };

describe('Category component', () => {
  const mockSuccessResponse = clues;
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  let category;

  describe('when mounting without a category', () => {
    category = shallow(<Category category={{}} />);

    it('should redirect to home', () => {
      expect(category.find('Redirect').exists()).toBe(true);
    })
  });


  describe('when mounting a new instance', () => {
    beforeEach(done => {
      global.fetch.mockClear();
      category = shallow(<Category {...props} />);

      process.nextTick(() => done());
    });

    it('should create a link to navigate home', () => {
      expect(category.find('Link h4').text()).toEqual('Home');
    });

    it('should render category title', () => {
      expect(category.find('h2').text()).toEqual(props.category.title);
    });

    it('should initialize clues in state', () => {
      expect(category.state().clues).toEqual(clues);
    });

    it('should render the correct number of clues', () => {
      expect(category.find('Clue').length).toEqual(clues.length);
    });
  });

});