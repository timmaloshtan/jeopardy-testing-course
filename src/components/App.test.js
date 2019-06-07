import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';
import { categories } from '../data/fixtures';

const setCategories = jest.fn();
const pickCategory = jest.fn();

const props = {
  categories,
  pickCategory,
};

const emptyProps = {
  categories: [],
  setCategories,
};

describe('App component', () => {
  let app;

  describe('when rendering with categories', () => {
    app = shallow(<App {...props} />);
    it('should render the title', () => {
      expect(app.find('h2').text()).toEqual('Jeopardy!');
    });
    
    it('should create the correct number of links', () => {
      expect(app.find('Link').length).toEqual(categories.length);
    });
  
    it('should title links correctly', () => {
      app.find('Link h4').forEach(
        (link, i) => expect(link.text()).toEqual(categories[i].title),
      );
    });

    describe('and clicking on of the categories', () => {
      beforeEach(() => {
        app.find('Link').at(0).simulate('click');
      });

      it('should dispatch pickCategory action', () => {
        expect(pickCategory.mock.calls.length).toBe(1);
        expect(pickCategory.mock.calls[0][0]).toEqual(categories[0]);
      });
    });
  });

  describe('when rendering without categories', () => {
    const mockSuccessResponse = categories;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    beforeEach(done => {
      global.fetch.mockClear();
      setCategories.mockClear();
      app = shallow(<App {...emptyProps} />);

      process.nextTick(() => done());
    });

    it('should fetch categories', () => {
      expect(global.fetch.mock.calls.length).toBe(1);
      expect(global.fetch.mock.calls[0][0]).toEqual('http://jservice.io/api/categories?count=20');
    });
    
    it('should dispatch setCategories action', () => {
      expect(setCategories.mock.calls.length).toBe(1);
      expect(setCategories.mock.calls[0][0]).toEqual(categories);
    })
    
  });
});
