import { ENDPOINT } from "../Config/config";
import { client } from "./Axios";
import { store } from "../Main/main";

const token = store.getState().auth.token;

export const signup = (data) => {
  return client
    .post(ENDPOINT.signup, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const login = (data) => {
  return client
    .post(ENDPOINT.login, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const createProd = (data) => {
  return client
    .post(ENDPOINT.createProduct, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllProds = () => {
  return client
    .get(ENDPOINT.getAllProducts, {
      headers: {
        // "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const getProdById = (data) => {
  return client
    .get(ENDPOINT.getProductById + data.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const getProdByCatId = (id) => {
  return client
    .get(ENDPOINT.getProductByCatId + "" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const updateProdById = (data) => {
  return client
    .put(ENDPOINT.updateProductById + "" + data.id, data.formdata, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteProdById = (data) => {
  return client
    .delete(ENDPOINT.deleteProductById + "" + data.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const searchProd = (data) => {
  return client
    .get(ENDPOINT.searchProduct + "?query=" + data.query, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const createCat = (data) => {
  return client
    .post(ENDPOINT.createCategory, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const getCategoryById = (data) => {
  return client
    .get(ENDPOINT.getCategoryById + "" + data.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllCats = () => {
  return client
    .get(ENDPOINT.getAllCategory, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const updateCatById = (data, formdata) => {
  return client
    .put(ENDPOINT.updateCategoryById + "" + data.id.id, formdata, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteCatById = (data) => {
  return client
    .delete(ENDPOINT.deleteCategoryById + "" + data.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

// Users Cart
export const getAllCartItems = (data) => {
  return client
    .get(ENDPOINT.getAllCartItems, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// User
export const getDeleteCartItemByProdId = (data) => {
  return client
    .delete(ENDPOINT.deleteCartItemByProdId + "" + data.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

// User
export const getAddToCart = (data) => {
  return client
    .post(ENDPOINT.addCartItem, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// User
export const getCartItemsByUserId = (data) => {
  return client
    .get(ENDPOINT.getCartItemsByUserId + "/" + data.userId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// User
export const getPlaceOrder = (data) => {
  return client
    .post(ENDPOINT.getplaceOrder, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

// User
export const getAllOrders = () => {
  return client
    .get(ENDPOINT.getAllOrder, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getOrderByUserId = (data) => {
  return client
    .get(ENDPOINT.getOrderByUserId + data.userId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getOrderById = (data) => {
  return client
    .get(ENDPOINT.getOrderById + data.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getUpdateStatus = (data) => {
  return client
    .put(ENDPOINT.updateStatus, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
};

// User
export const getDeleteCartItemsByUserId = (data) => {
  return client
    .delete(ENDPOINT.deleteCartItemsByUserId + "" + data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const displayFile = (data) => {
  return client
    .get(ENDPOINT.displayfile, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const getPagination = (data) => {
  return client
    .get(ENDPOINT.pagination + "/" + data.pageNo + "/" + data.pageSize, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const sendMailWithAttachment = (data) => {
  return client
    .post(ENDPOINT.sendMailWithAttachment, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const getFilterOrders = (data) => {
  return client
    .post(ENDPOINT.filterOrders, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
};
