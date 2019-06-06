import * as actions from './index';

import { categories } from '../data/fixtures';

describe('Actions', () => {
  it('should create an action to set categories', () => {
    const expectedAction = {
      type: actions.SET_CATEGORIES,
      categories,
    };

    expect(actions.setCategories(categories)).toEqual(expectedAction);
  });

  it('should create an action to pick a category', () => {
    const expectedAction = {
      type: actions.PICK_CATEGORY,
      category: categories[0],
    };

    expect(actions.pickCategory(categories[0])).toEqual(expectedAction);
  });
});
