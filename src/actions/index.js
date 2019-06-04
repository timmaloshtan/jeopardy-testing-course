export const SET_CATEGORIES = "SET_CATEGORIES";
export const PICK_CATEGORY = "PICK_CATEGORY";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories,
});

export const pickCategory = (category) => ({
  type: PICK_CATEGORY,
  category,
});