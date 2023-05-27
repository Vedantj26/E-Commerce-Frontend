export const Config = {
  BASE_URL: "http://localhost:8080/api/",
  Image_BASE_URL: "http://localhost:8080/api/v1/auth/products/displayFile/",
};

export const ENDPOINT = {
  signup: "v1/auth/register",
  login: "v1/auth/login",

  // Products URLs
  createProduct: "products/createProduct",
  getAllProducts: "products/getAllProducts",
  getProductById: "products/getProductById/",
  getProductByCatId: "products/getProductByCatId/",
  updateProductById: "products/updateProduct/",
  deleteProductById: "products/deleteProductById/",
  searchProduct: "/products/search",

  // Category URLs
  createCategory: "category/createCategory",
  getCategoryById: "category/getCategoryById/",
  getAllCategory: "category/getAllCategory",
  updateCategoryById: "category/updateCategoryById/",
  deleteCategoryById: "category/deleteCategoryById/",

  // User Cart URL
  addCartItem: "cart/addToCart",
  getAllCartItems: "cart/getAllCartItems",
  getCartItemsByUserId: "cart/getCartItemsByUserId",
  deleteCartItemByProdId: "cart/deleteCartItemByProdId/",
  deleteCartItemsByUserId: "cart/deleteCartItemsByUserId/",

  // User Order URL
  getplaceOrder: "orders/placeOrder",
  getAllOrder: "orders/getAllOrder",

  // User Order URL
  placeOrder: "order/placeOrder",
  getOrders: "order/getOrders",
  getOrderByUserId: "orders/getOrderByUserId/",
  getOrderById: "orders/getOrderById/",
  updateStatus: "orders/updateStatus",

  uploadfile: "products/uploadFile/",
  displayfile: "v1/auth/products/displayFile/",

  pagination: "products/pagination",

  sendMailWithAttachment: "orders/sendMailWithAttachment",

  // Order History Filters
  filterOrders: "orders/filterStatus/",
};
