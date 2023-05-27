import { AUTH, CART, CATEGORY, NAVSEARCH, ORDER, PRODUCT } from "./action.type";

export const updateFirstName = (firstName) => {
  return {
    type: AUTH.UPDATE_FIRSTNAME,
    payload: firstName,
  };
};

export const updateLastName = (lastName) => {
  return {
    type: AUTH.UPDATE_LASTNAME,
    payload: lastName,
  };
};

export const updateEmail = (email) => {
  return {
    type: AUTH.UPDATE_EMAIL,
    payload: email,
  };
};

export const updatePassword = (password) => {
  return {
    type: AUTH.UPDATE_PASSWORD,
    payload: password,
  };
};

export const updateFilepath = (filepath) => {
  return {
    type: AUTH.UPDATE_FILEPATH,
    payload: filepath,
  };
};

export const updateUserInfo = (userInfo) => {
  return {
    type: AUTH.UPDATE_USER_INFO,
    payload: userInfo,
  };
};

export const updateUserToken = (userToken) => {
  return {
    type: AUTH.UPDATE_USER_TOKEN,
    payload: userToken,
  };
};

export const updateProductId = (productid) => {
  return {
    type: PRODUCT.UPDATE_PRODUCT_ID,
    payload: productid,
  };
};

export const updateProdName = (prodName) => {
  return {
    type: PRODUCT.UPDATE_PROD_NAME,
    payload: prodName,
  };
};

export const updateProdDesc = (prodDescription) => {
  return {
    type: PRODUCT.UPDATE_PROD_DESC,
    payload: prodDescription,
  };
};

export const updateProdPrice = (prodPrice) => {
  return {
    type: PRODUCT.UPDATE_PROD_PRICE,
    payload: prodPrice,
  };
};

export const updateProdCatId = (prodCatId) => {
  return {
    type: PRODUCT.UPDATE_PROD_CAT_ID,
    payload: prodCatId,
  };
};

export const updateProdImage = (prodImage) => {
  return {
    type: PRODUCT.UPDATE_PROD_IMAGE,
    payload: prodImage,
  };
};

export const updateProdList = (productList) => {
  return {
    type: PRODUCT.UPDATE_PROD_LIST,
    payload: productList,
  };
};
// };

// ------------------------------------------------------------------------

export const updateCatId = (catId) => {
  return {
    type: CATEGORY.UPDATE_CATEGORY_ID,
    payload: catId,
  };
};

export const updateCatName = (catName) => {
  return {
    type: CATEGORY.UPDATE_CATEGORY_NAME,
    payload: catName,
  };
};

export const updateCatList = (catList) => {
  return {
    type: CATEGORY.UPDATE_CATEGORY_LIST,
    payload: catList,
  };
};

// ------------------------------------------------------------------------

export const updateNavSearch = (searchQuery) => {
  return {
    type: NAVSEARCH.UPDATE_NAV_SEARCH,
    payload: searchQuery,
  };
};

export const updateCartId = (cartId) => {
  return {
    type: CART.UPDATE_CART_ID,
    payload: cartId,
  };
};

export const updateCartProdId = (cartProdId) => {
  return {
    type: CART.UPDATE_CART_PROD_ID,
    payload: cartProdId,
  };
};

export const updateCartUserId = (cartUserId) => {
  return {
    type: CART.UPDATE_CART_USER_ID,
    payload: cartUserId,
  };
};

export const updateQuantity = (quantity) => {
  return {
    type: CART.UPDATE_QUANTITY,
    payload: quantity,
  };
};

export const updateCartList = (cartList) => {
  return {
    type: CART.UPDATE_CARTLIST,
    payload: cartList,
  };
};

export const updateOrderList = (orderList) => {
  return {
    type: CART.UPDATE_ORDERLIST,
    payload: orderList,
  };
};

export const updateProdInfo = (prodInfo) => {
  return {
    type: PRODUCT.UPDATE_PROD_INFO,
    payload: prodInfo,
  };
};

export const updateAllOrder = (allOrder) => {
  return {
    type: ORDER.UPDATE_ALL_ORDERS,
    payload: allOrder,
  };
};
