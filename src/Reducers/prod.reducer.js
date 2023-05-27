import { PRODUCT } from "../Actions/action.type";

const initialState = {
  id: "",
  name: "",
  description: "",
  price: "",
  catId: "",
  image: "",
  productlist: [],
  prodInfo: [],
};

const prodReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT.UPDATE_PRODUCT_ID:
      return { ...state, id: payload };

    case PRODUCT.UPDATE_PROD_NAME:
      return { ...state, name: payload };

    case PRODUCT.UPDATE_PROD_DESC:
      return { ...state, description: payload };

    case PRODUCT.UPDATE_PROD_PRICE:
      return { ...state, price: payload };

    case PRODUCT.UPDATE_PROD_CAT_ID:
      return { ...state, catId: payload };

    case PRODUCT.UPDATE_PROD_IMAGE:
      return { ...state, image: payload };

    case PRODUCT.UPDATE_PROD_LIST:
      return { ...state, productlist: payload };

    case PRODUCT.UPDATE_PROD_INFO:
      return { ...state, prodInfo: payload };

    default:
      return state;
  }
};

export default prodReducer;
