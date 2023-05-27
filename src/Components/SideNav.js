import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Image,
  Nav,
  NavDropdown,
  Offcanvas,
  Overlay,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "../CSS/SideNav.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCats, getProdByCatId, searchProd } from "../Services/Services";
import {
  updateCatId,
  updateCatList,
  updateEmail,
  updateNavSearch,
  updatePassword,
  updateProdList,
  updateUserInfo,
} from "../Actions/auth.action";
import { Link, useNavigate } from "react-router-dom";
import Ripples from "react-ripples";
import Swal from "sweetalert2";
import { Config } from "../Config/config";

export default function SideNav() {
  const catState = useSelector((state) => state.cat.catList);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    callGetAllCategories();
  }, []);

  const callGetAllCategories = () => {
    getAllCats()
      .then((res) => {
        dispatch(updateCatList(res.data));
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };

  const callGetProdByCatId = async (catId) => {
    let data = {
      id: catId,
    };
    getProdByCatId(data.id)
      .then((res) => {
        dispatch(updateProdList(res.data));
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };

  const callSearchProdAPI = async (searchQuery) => {
    let data = {
      query: searchQuery,
    };
    searchProd(data)
      .then((res) => {
        dispatch(updateProdList(res.data));
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };

  const logOut = () => {
    localStorage.clear();
    dispatch(updateEmail(""));
    dispatch(updatePassword(""));
    dispatch(updateUserInfo());
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Successfully Logged Out...!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  return (
    <>
      <Offcanvas show={true} backdrop={false} scroll>
        <Offcanvas.Header>
          <Offcanvas.Title>E-Commerce</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="d-flex flex-grow-1 pe-3 flex-column h-100">
            <Card id="profileCard">
              <Ripples className="d-flex justify-content-center">
                <Image
                  id="profileImage"
                  src={Config.Image_BASE_URL + "" + authState.photos}
                  roundedCircle
                />
              </Ripples>
              <Card.Body className="p-0 mt-3 mb-3">
                <center>
                  <Card.Title style={{ fontSize: "18px" }}>
                    {authState.firstName} {authState.lastName}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "12px" }}>
                    {authState.email}
                  </Card.Text>
                </center>
              </Card.Body>
            </Card>
            <Form>
              <Form.Control
                type="search"
                placeholder="Search Product"
                onChange={(e) => {
                  dispatch(updateNavSearch(e.target.value));
                  callSearchProdAPI(e.target.value);
                }}
              />
            </Form>
            <Nav.Link href="/products">Home</Nav.Link>
            <NavDropdown
              title="Categories"
              autoClose="outside"
              // drop="end"
              menuVariant="dark"
            >
              {catState.map((element, index) => (
                <NavDropdown.Item
                  id="navdropdown"
                  key={index}
                  title={element.id}
                  onClick={(e) => {
                    dispatch(updateCatId(e.target.title));
                    callGetProdByCatId(e.target.title);
                  }}
                  style={{ position: "relative", zIndex: 10000 }}
                >
                  {element.catName}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/category">
                All Categories
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Add">
              <NavDropdown.Item as={Link} to="/addupdateprod">
                Add Product
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/addcat">
                Add Category
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/manageOrderHistory">Order History</Nav.Link>
            <Button
              className="mt-auto"
              variant="danger"
              size="md"
              onClick={() => {
                logOut();
              }}
            >
              Log Out
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
