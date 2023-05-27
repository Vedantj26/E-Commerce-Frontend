import { ORDER } from "../Actions/action.type";

const initialState = {
  allOrders: [],
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case ORDER.UPDATE_ALL_ORDERS:
      return { ...state, allOrders: payload };

    default:
      return state;
  }
};

export default orderReducer;
