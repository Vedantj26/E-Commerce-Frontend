import React, { useEffect, useRef, useState } from "react";
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
import "../CSS/updateProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderList } from "../Actions/auth.action";
import Loader from "../Components/Loader";
import { Config } from "../Config/config";
import { getAllOrders, getUpdateStatus } from "../Services/Services";
import { FcInfo } from "react-icons/fc";
import OrderFilter from "../Components/OrderFilter";
import SideNav from "../Components/SideNav";

export default function ManageOrder() {
  const orderList = useSelector((state) => state.cart.orderList);
  const authState = useSelector((state) => state.auth.userInfo);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const [remark, setRemark] = useState("");

  useEffect(() => {
    setLoader(true);
    callgetAllOrders();
  }, [counter]);

  const callgetAllOrders = () => {
    getAllOrders()
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
        setCounter(counter + 1);
      })
      .catch((err) => {
        throw err;
      });
  };

  //   const displayStatus=(element)=>{
  //     if(status==1)
  // return(
  //   <div>

  //   </div>
  // )
  //   }

  return (
    <div>
      <Row>
        <Col md={2}>
          <SideNav />
        </Col>
        <Col md={10}>
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
                  <h1 className="my-4">Manage All Orders</h1>
                </center>
                <div className="d-flex flex-row-reverse bd-highlight mb-3">
                  <OrderFilter />
                </div>
                {orderList.map((element, index) => (
                  <div className="my-2" key={index}>
                    <Card>
                      <Accordion className="d-flex justify-content-center" defaultActiveKey="1" flush>
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
                                    <Col md={4}>
                                      <Row>
                                        <Col md={9}>
                                          {element.status === "Delivered" ||
                                          element.status === "Cancelled" ? (
                                            <>
                                              {element.status ===
                                              "Cancelled" ? (
                                                <>
                                                  <Badge
                                                    pill
                                                    className="d-flex justify-content-center"
                                                    bg="danger"
                                                    text="white"
                                                  >
                                                    {element.status}
                                                  </Badge>
                                                </>
                                              ) : (
                                                <>
                                                  <Badge
                                                    pill
                                                    className="d-flex justify-content-center"
                                                    bg="success"
                                                    text="white"
                                                  >
                                                    {element.status}
                                                  </Badge>
                                                </>
                                              )}
                                            </>
                                          ) : (
                                            <>
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
                                                      Give Reason to Cancel
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
                                                            style={{
                                                              fontSize: 12,
                                                            }}
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
                                                  size="sm mb-2"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                  }}
                                                >
                                                  <span
                                                    style={{ fontSize: 12 }}
                                                  >
                                                    Cancel
                                                  </span>
                                                </Button>
                                              </OverlayTrigger>
                                            </>
                                          )}
                                        </Col>
                                      </Row>
                                    </Col>
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
                                        {element.status === "Cancelled" ? (
                                          <>
                                            <Col md={4}>
                                              <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                  <Tooltip id="button-tooltip-2">
                                                    {element.remark}
                                                  </Tooltip>
                                                }
                                              >
                                                {({
                                                  ref,
                                                  ...triggerHandler
                                                }) => (
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
                                        ) : (
                                          <></>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <Col md={4}>
                                          <Form.Select
                                            size="sm"
                                            aria-label="Default select example"
                                            defaultValue={element.status}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                            }}
                                            onChange={(e) =>
                                              callUpdateStatus(
                                                element.id,
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value={0}>Status</option>
                                            <option value="Confirmed">
                                              Confirmed
                                            </option>
                                            <option value="Packed">
                                              Packed
                                            </option>
                                            <option value="Dispatched">
                                              Dispatched
                                            </option>
                                            <option value="Delivered">
                                              Delivered
                                            </option>
                                          </Form.Select>
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
        </Col>
      </Row>
    </div>
  );
}
