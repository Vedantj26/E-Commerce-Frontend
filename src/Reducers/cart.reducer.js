import { CART } from "../Actions/action.type";

const initialState = {
  cartId: "",
  cartProdId: "",
  cartUserId: "",
  quantity: "",
  cartList: [],
  orderList: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART.UPDATE_CART_ID:
      return { ...state, cartId: payload };

    case CART.UPDATE_CART_PROD_ID:
      return { ...state, cartProdId: payload };

    case CART.UPDATE_CART_USER_ID:
      return { ...state, cartUserId: payload };

    case CART.UPDATE_QUANTITY:
      return { ...state, quantity: payload };

    case CART.UPDATE_CARTLIST:
      return { ...state, cartList: payload };

    case CART.UPDATE_ORDERLIST:
      return { ...state, orderList: payload };

    default:
      return state;
  }
};

export default cartReducer;
