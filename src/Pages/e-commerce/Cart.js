import "../../CSS/Cart.css";
import React, { useEffect, useState } from "react";
import NavScrollExample from "./NavBar";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Config } from "../../Config/config";
import {
  getCartItemsByUserId,
  getDeleteCartItemByProdId,
} from "../../Services/Services";
import { updateCartList } from "../../Actions/auth.action";
import Swal from "sweetalert2";
import { MDBTypography } from "mdb-react-ui-kit";
import CardHeader from "react-bootstrap/esm/CardHeader";
import Ripples from "react-ripples";
import { MdDeleteForever } from "react-icons/md";
import Loader from "../../Components/Loader";

export default function Cart() {
  const cartList = useSelector((state) => state.cart.cartList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [counter, setcounter] = useState(0);
  const authState = useSelector((state) => state.auth.userInfo);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    callGetAllProdAPI();
  }, [counter]);

  const callGetAllProdAPI = () => {
    let data = {
      userId: authState.id,
    };
    getCartItemsByUserId(data)
      .then((res) => {
        dispatch(updateCartList(res));
        setLoader(false);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const callDeleteCartItemsByProdId = async (elementId) => {
    let data = {
      id: elementId,
    };
    setLoader(true);
    getDeleteCartItemByProdId(data)
      .then((res) => {
        setcounter(counter + 1);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Deleted Successfully...!",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoader(false);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const totalProd = () => {
    const sum = cartList.reduce((total, element) => total + element.qty, 0);
    return sum;
  };

  const totalAmt = () => {
    const sum = cartList.reduce(
      (total, element) => total + element.qty * element.price,
      0
    );
    return sum;
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <section className="h-100 gradient-custom">
            <NavScrollExample />
            <Container className="py-5 h-100">
              {cartList && cartList.length > 0 ? (
                <>
                  <Row className="justify-content-center my-4">
                    <Col md="8">
                      {cartList.map((element, index) => (
                        <Card
                          className="mb-4"
                          key={index}
                          style={{
                            background: "hsla(0, 0%, 100%, 0.55)",
                            backdropFilter: "blur(30px)",
                          }}
                        >
                          <CardHeader className="py-3">
                            <MDBTypography tag="h5" className="mb-0">
                              {element.name}
                            </MDBTypography>
                          </CardHeader>
                          <Card.Body>
                            <Row>
                              <Col lg="3" md="12" className="mb-4 mb-lg-0">
                                <Ripples
                                  rippleTag="div"
                                  rippleColor="light"
                                  className="bg-image rounded hover-zoom hover-overlay"
                                >
                                  <Card.Img
                                    src={
                                      Config.Image_BASE_URL +
                                      "" +
                                      element.imagePath
                                    }
                                    className="w-100"
                                    alt=""
                                  />
                                  <a href="#!">
                                    <div
                                      className="mask"
                                      style={{
                                        backgroundColor:
                                          "rgba(251, 251, 251, 0.2)",
                                      }}
                                    ></div>
                                  </a>
                                </Ripples>
                              </Col>

                              <Col lg="5" md="6" className=" mb-4 mb-lg-0">
                                <p>
                                  <strong>{element.catName}</strong>
                                </p>
                                <Button
                                  variant="danger"
                                  onClick={() => {
                                    callDeleteCartItemsByProdId(element.id);
                                  }}
                                >
                                  <MdDeleteForever size={20} />
                                  Delete
                                </Button>
                              </Col>
                              <Col lg="4" md="6" className="mb-4 mb-lg-0">
                                <p className="mt-4 text-start text-md-center">
                                  <h5>Quantity: {element.qty}</h5>
                                  <h3 className="mt-3">₹ {element.price}</h3>
                                </p>
                              </Col>
                            </Row>
                            <hr className="my-4" />
                          </Card.Body>
                        </Card>
                      ))}
                    </Col>
                    <Col md="4">
                      <Card className="mb-4">
                        <CardHeader>
                          <MDBTypography tag="h5" className="mb-0">
                            Summary
                          </MDBTypography>
                        </CardHeader>
                        <Card.Body>
                          <ListGroup flush>
                            <ListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                              Name
                              <span>
                                {authState.firstName} {authState.lastName}
                              </span>
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between align-items-center px-0">
                              Products
                              <span>{totalProd()}</span>
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                              <div>
                                <strong>Total Amount</strong>
                              </div>
                              <span>
                                <strong>₹ {totalAmt()}</strong>
                              </span>
                            </ListGroupItem>
                          </ListGroup>

                          <Button
                            block
                            size="lg"
                            onClick={() => navigate("/checkout")}
                          >
                            Go to checkout
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <center>
                    <h1>Add Items into Cart</h1>
                  </center>
                  <center>
                    <Button onClick={() => navigate("/home")}>HOME</Button>
                  </center>
                </>
              )}
            </Container>
          </section>
        </>
      )}
    </>
  );
}
