import rootReducer from './index';
import * as actions from '../actions';
import { category, categories } from '../data/fixtures';

describe('Root reducer', () => {
  it('should set the initial state', () => {
    expect(rootReducer({}, {})).toEqual({
      category: {},
      categories: [],
    });
  });

  it('should set categories', () => {
    expect(rootReducer({}, actions.setCategories(categories))).toEqual({
      category: {},
      categories,
    });
  });

  it('should pick a category', () => {
    expect(rootReducer({}, actions.pickCategory(category))).toEqual({
      category,
      categories: [],
    });
  });
  
})
