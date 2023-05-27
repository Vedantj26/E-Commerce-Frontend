import { NAVSEARCH } from "../Actions/action.type";

const initialState = {
  searchQuery: "",
};

const navReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NAVSEARCH.UPDATE_NAV_SEARCH:
      return { ...state, searchQuery: payload };

    default:
      return state;
  }
};

export default navReducer;
