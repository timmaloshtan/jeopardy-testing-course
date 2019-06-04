import { combineReducers } from 'redux';

import { SET_CATEGORIES, PICK_CATEGORY } from '../actions';

const category = (state = {}, action) => {
  switch (action.type) {
    case PICK_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

export default combineReducers({
  category,
  categories,
});