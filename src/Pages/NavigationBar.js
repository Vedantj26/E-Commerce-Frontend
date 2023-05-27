import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Modal,
} from "react-bootstrap";
import { getAllCats, getProdByCatId, searchProd } from "../Services/Services";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/loginPage.css";
import {
  updateCatId,
  updateCatList,
  updateNavSearch,
  updateProdList,
} from "../Actions/auth.action";
import UserProfile from "../Components/Profile";
import { FaUser } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { TbCategory } from "react-icons/tb";
import { AiFillHome, AiFillFileAdd, AiFillShopping } from "react-icons/ai";

function NavScroll() {
  const catState = useSelector((state) => state.cat.catList);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      className="d-flex flex-column"
    >
      <Container fluid>
        <Navbar.Brand href="#">
          <AiFillShopping color="white" size={23} /> Mart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-8 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              style={{ marginRight: "20px", marginLeft: "20px" }}
              href="/products"
            >
              <AiFillHome color="white" size={23} />
            </Nav.Link>
            <NavDropdown
              style={{ marginRight: "20px" }}
              title={<TbCategory color="white" size={23} />}
              id="navbarScrollingDropdownCategories"
            >
              {catState.map((element, index) => (
                <NavDropdown.Item
                  key={element.id}
                  title={element.id}
                  onClick={(e) => {
                    dispatch(updateCatId(e.target.title));
                    callGetProdByCatId(e.target.title);
                  }}
                >
                  {element.catName}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/category">
                All Categories
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              style={{ marginRight: "20px" }}
              title={<AiFillFileAdd color="white" size={23} />}
              id="navbarScrollingDropdownAdd"
            >
              <NavDropdown.Item as={Link} to="/addupdateprod">
                Add Product
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/addcat">
                Add Category
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => {
                dispatch(updateNavSearch(e.target.value));
                callSearchProdAPI(e.target.value);
              }}
            />
            <Button variant="success">
              <BsSearch />
            </Button>
            <FaUser
              className="ms-4 mx-3"
              color="white"
              size={30}
              onClick={() => {
                setShow(true);
              }}
            />
          </Form>

          <Modal
            style={{ top: "5%", left: "31.5%" }}
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <UserProfile />
          </Modal>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
