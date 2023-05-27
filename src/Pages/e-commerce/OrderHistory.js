import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  OverlayTrigger,
  Popover,
  Row,
  Tooltip,
} from "react-bootstrap";
import NavScrollExample from "./NavBar";
import {
  getAllOrders,
  getOrderByUserId,
  getUpdateStatus,
} from "../../Services/Services";
import "../../CSS/updateProduct.css";
import { Config } from "../../Config/config";
import Loader from "../../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderList } from "../../Actions/auth.action";
import { AiFillPrinter } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FcInfo } from "react-icons/fc";

export default function OrderHistory() {
  const orderList = useSelector((state) => state.cart.orderList);
  const authState = useSelector((state) => state.auth.userInfo);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [remark, setRemark] = useState("");
  const [counter, setCounter] = useState(0);
  console.log("orderList => ", orderList);

  useEffect(() => {
    setLoader(true);
    callgetOrderByUserId();
  }, [counter]);

  const callgetOrderByUserId = () => {
    let data = {
      userId: authState.id,
    };
    getOrderByUserId(data)
      .then((res) => {
        dispatch(updateOrderList(res));
        setLoader(false);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const callUpdateStatus = (Id, status, remark, cancelledBy) => {
    let data = {
      id: Id,
      status: status,
      remark: remark,
      cancelledBy: cancelledBy,
    };
    getUpdateStatus(data)
      .then((res) => {
        console.log("Status Res => ", res);
        setCounter(counter + 1);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div>
      <NavScrollExample />
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            {orderList.length === 0 && (
              <h4
                className="d-flex justify-content-center"
                style={{ marginTop: 100 }}
              >
                Order Not Found!
              </h4>
            )}
            <center>
              <h1 className="my-4">Order History</h1>
            </center>
            {orderList.map((element, index) => (
              <div className="my-2" key={index}>
                <Card>
                  <Accordion defaultActiveKey="1" flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <Container>
                          <Row>
                            <Col xs={6} md={4}>
                              <p>Order Id: {element.id}</p>
                            </Col>
                            <Col xs={6} md={4}>
                              <p>Total Price: ₹ {element.totPrice}</p>
                            </Col>
                            <Col xs={6} md={4}>
                              <Row>
                                <Col md={8}>
                                  <p>
                                    Order Date:{" "}
                                    {new Date(
                                      element.orderDate
                                    ).toLocaleDateString()}
                                  </p>
                                </Col>
                                {element.status === "Delivered" ||
                                element.status === "Cancelled" ? (
                                  <>
                                    {element.status === "Delivered" ? (
                                      <>
                                        {" "}
                                        <Col md={4}>
                                          <center>
                                            <AiFillPrinter
                                              size={25}
                                              onClick={() =>
                                                navigate("/invoice", {
                                                  state: { element: element },
                                                })
                                              }
                                            />
                                          </center>
                                        </Col>{" "}
                                      </>
                                    ) : (
                                      <>
                                        <Col md={4}>
                                          <Badge
                                            pill
                                            className="d-flex justify-content-center"
                                            bg="danger"
                                            text="dark"
                                          >
                                            {element.status}
                                          </Badge>
                                        </Col>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <Col md={4}>
                                      <Badge
                                        pill
                                        className="d-flex justify-content-center"
                                        bg="info"
                                        text="dark"
                                      >
                                        {element.status}
                                      </Badge>
                                    </Col>
                                  </>
                                )}
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={6} md={4}>
                              <p>Name: {element.name}</p>
                            </Col>
                            <Col xs={6} md={4}>
                              <p>Email: {element.email}</p>
                            </Col>
                            <Col xs={6} md={4}>
                              <Row>
                                <Col md={8}>
                                  <p>Mobile: {element.mobile}</p>
                                </Col>
                                {element.status === "Delivered" ||
                                element.status === "Cancelled" ? (
                                  <>
                                    {element.status === "Delivered" ? (
                                      <>
                                        {moment(new Date()).diff(
                                          element.orderDate
                                        ) <= 7 ? (
                                          <>
                                            <Col md={4}>
                                              <OverlayTrigger
                                                trigger="click"
                                                placement="left"
                                                overlay={
                                                  <Popover
                                                    onClick={(e) =>
                                                      e.stopPropagation()
                                                    }
                                                    id="popover-basic"
                                                  >
                                                    <Popover.Header as="h3">
                                                      Give Reason to Return
                                                    </Popover.Header>
                                                    <Popover.Body>
                                                      <Form.Control
                                                        as="textarea"
                                                        aria-label="with textarea"
                                                        onChange={(e) => {
                                                          setRemark(
                                                            e.target.value
                                                          );
                                                        }}
                                                      />
                                                      <span className="d-flex justify-content-center my-1">
                                                        <Button
                                                          variant="outline-primary"
                                                          size="sm"
                                                          onClick={() => {
                                                            callUpdateStatus(
                                                              element.id,
                                                              "Returned",
                                                              "Returned by " +
                                                                authState.role +
                                                                ": " +
                                                                remark,
                                                              authState.id
                                                            );
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 12,
                                                            }}
                                                          >
                                                            Return Order
                                                          </span>
                                                        </Button>
                                                      </span>
                                                    </Popover.Body>
                                                  </Popover>
                                                }
                                              >
                                                <Button
                                                  variant="outline-primary"
                                                  size="sm"
                                                >
                                                  <span
                                                    style={{ fontSize: 12 }}
                                                  >
                                                    Return Order
                                                  </span>
                                                </Button>
                                              </OverlayTrigger>
                                            </Col>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <Col md={3}>
                                          <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                              <Tooltip id="button-tooltip-2">
                                                {element.remark}
                                              </Tooltip>
                                            }
                                          >
                                            {({ ref, ...triggerHandler }) => (
                                              <Button
                                                variant="link"
                                                {...triggerHandler}
                                                className="d-inline-flex align-items-center"
                                              >
                                                <Image ref={ref} />
                                                <FcInfo />
                                              </Button>
                                            )}
                                          </OverlayTrigger>
                                        </Col>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <Col md={4}>
                                      <OverlayTrigger
                                        trigger="click"
                                        placement="left"
                                        overlay={
                                          <Popover
                                            onClick={(e) => {
                                              e.stopPropagation();
                                            }}
                                            id="popover-basic"
                                          >
                                            <Popover.Header
                                              as="h3"
                                              className="d-flex justify-content-evenly"
                                            >
                                              Give Reason to Cancel
                                            </Popover.Header>
                                            <Popover.Body>
                                              <Form.Control
                                                as="textarea"
                                                aria-label="with textarea"
                                                onChange={(e) => {
                                                  setRemark(e.target.value);
                                                }}
                                              />
                                              <span className="d-flex justify-content-center my-1">
                                                <Button
                                                  variant="outline-danger"
                                                  size="sm"
                                                  onClick={() => {
                                                    callUpdateStatus(
                                                      element.id,
                                                      "Cancelled",
                                                      "Cancelled by " +
                                                        authState.role +
                                                        ": " +
                                                        remark,
                                                      authState.id
                                                    );
                                                  }}
                                                >
                                                  <span
                                                    style={{ fontSize: 12 }}
                                                  >
                                                    Cancel Order
                                                  </span>
                                                </Button>
                                              </span>
                                            </Popover.Body>
                                          </Popover>
                                        }
                                      >
                                        <Button
                                          variant="outline-danger"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                          }}
                                        >
                                          <span style={{ fontSize: 12 }}>
                                            Cancel Order
                                          </span>
                                        </Button>
                                      </OverlayTrigger>
                                    </Col>
                                  </>
                                )}
                              </Row>
                            </Col>
                          </Row>
                        </Container>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="text-center">
                          <Col>Product Image</Col>
                          <Col>Product Name</Col>
                          <Col>Product Price</Col>
                          <Col>Product Quantity</Col>
                          <Col>Sub Total</Col>
                        </Row>
                        <hr />
                        {element.orderItems.map((item) => (
                          <Row
                            key={item.id}
                            style={{ height: 50 }}
                            className="text-center"
                          >
                            <Col>
                              <img
                                src={Config.Image_BASE_URL + item.imagePath}
                                alt=""
                                style={{ width: "45px", height: "45px" }}
                                className="rounded-circle me-3"
                              />
                            </Col>
                            <Col>{item.name}</Col>
                            <Col>₹ {item.price}</Col>
                            <Col>{item.qty}</Col>
                            <Col>
                              ₹ {(item.totalAmount = item.qty * item.price)}
                            </Col>
                          </Row>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
