import { CATEGORY } from "../Actions/action.type";

const initialState = {
  id: "",
  name: "",
  catList: [],
};

const catReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY.UPDATE_CATEGORY_ID:
      return { ...state, id: payload };

    case CATEGORY.UPDATE_CATEGORY_NAME:
      return { ...state, name: payload };

    case CATEGORY.UPDATE_CATEGORY_LIST:
      return { ...state, catList: payload };

    default:
      return state;
  }
};

export default catReducer;
