import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login_Page from "./Pages/Login_Page";
import Signup_Page from "./Pages/Signup_Page";
import Products from "./Pages/Products";
import Category from "./Pages/Category";
import AddCat from "./Pages/AddCat";
import UpdateProdOld from "./Pages/UpdateProdOld";
import { useSelector } from "react-redux";
import Home from "./Pages/e-commerce/Home";
import ProductDetails from "./Pages/e-commerce/ProductDetails";
import Cart from "./Pages/e-commerce/Cart";
import Checkout from "./Pages/e-commerce/Checkout";
import OrderHistory from "./Pages/e-commerce/OrderHistory";
import Invoice from "./Components/Invoice";
import ManageOrder from "./Pages/ManageOrder";

function App() {
  const authState = useSelector((state) => state.auth.userInfo);

  return (
    <BrowserRouter>
      <Routes>
        {authState ? (
          authState.roles[0].id == 501 ? (
            <>
              {/* Admin Pages */}
              <Route path="/products" element={<Products />}></Route>
              <Route path="/addupdateprod" element={<UpdateProdOld />}></Route>
              <Route path="/category" element={<Category />}></Route>
              <Route path="/addcat" element={<AddCat />}></Route>
              <Route path="/manageOrderHistory" element={<ManageOrder />} />
              <Route path="*" element={<Products />}></Route>
            </>
          ) : (
            <>
              {/* Users Pages */}
              <Route path="/home" element={<Home />} />
              <Route path="/productDetails" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orderHistory" element={<OrderHistory />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="*" element={<Home />}></Route>
            </>
          )
        ) : (
          <>
            <Route path="/" element={<Login_Page />}></Route>
            <Route path="/signup" element={<Signup_Page />}></Route>
            <Route path="*" element={<Login_Page />}></Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
