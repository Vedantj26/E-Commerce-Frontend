import React, { useEffect, useState } from "react";
import "../../CSS/UserHome.css";
import Ripples from "react-ripples";
import { Button, Card, Container, Col, Row, Pagination } from "react-bootstrap";
import NavScrollExample from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddToCart,
  getAllProds,
  getPagination,
} from "../../Services/Services";
import { updateProdList } from "../../Actions/auth.action";
import { Config } from "../../Config/config";
import Swal from "sweetalert2";
import Loader from "../../Components/Loader";

function Home() {
  const prodState = useSelector((state) => state.prod.productlist);
  const authState = useSelector((state) => state.auth.userInfo.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [counter, setCounter] = useState(0);
  let active = pageNo;
  const currentItems = [];
  {
    for (let number = 1; number <= totalPage; number++) {
      currentItems.push(number);
    }
  }

  useEffect(() => {
    setLoader(true);
    callGetAllProdsAPI();
    callgetPagination();
  }, [counter]);

  const callgetPagination = () => {
    let data = {
      pageNo: pageNo,
      pageSize: 3,
    };
    getPagination(data)
      .then((res) => {
        dispatch(updateProdList(res.data.data));
        setTotalPage(res.data.totalPage);
        setLoader(false);
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };

  const callGetAllProdsAPI = () => {
    getAllProds()
      .then((res) => {
        setLoader(false);
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };

  const CartCallApi = (element) => {
    let data = {
      userId: authState,
      prodId: element.id,
      qty: 1,
    };
    setLoader(true);
    getAddToCart(data)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Added To Cart...!",
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

  return (
    <>
      <div>
        <NavScrollExample />
        {loader ? (
          <Loader />
        ) : (
          <>
            <Container>
              <Row xs={1} md={3} className="g-3 justify-content-center mt-2">
                {prodState ? (
                  prodState.map((element, index) => (
                    <Col key={index}>
                      <Card
                        className="text-center"
                        key={element.id}
                        style={{
                          background: "hsla(0, 0%, 100%, 0.55)",
                          backdropFilter: "blur(30px)",
                          width: 350,
                          height: 350,
                        }}
                      >
                        <Card.Body>
                          <Row>
                            <Col className="">
                              <Ripples className="bg-image rounded hover-zoom hover-overlay">
                                <Card.Img
                                  src={
                                    Config.Image_BASE_URL +
                                    "" +
                                    element.imagePath
                                  }
                                  onClick={() =>
                                    navigate("/productDetails", {
                                      state: { element: element },
                                    })
                                  }
                                  style={{
                                    width: 200,
                                    height: 200,
                                  }}
                                />
                                <a href="#!">
                                  <div
                                    className="mask"
                                    style={{
                                      backgroundColor:
                                        "rgba(251, 251, 251, 0.15)",
                                    }}
                                  ></div>
                                </a>
                              </Ripples>
                              <h3 className="mb-1 me-1">{element.name}</h3>
                              <h4 className="mb-1 me-1">₹ {element.price}</h4>
                              <Button
                                variant="success"
                                size="sm"
                                className="mt-2"
                                onClick={() => CartCallApi(element)}
                              >
                                Add To Cart
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <div style={{ margin: "100px 100px 100px 100px" }}>
                    <h3>Add Product</h3>
                  </div>
                )}
              </Row>

              <Pagination className="fixed-bottom justify-content-center">
                <Pagination.First
                  onClick={() => {
                    setPageNo(1);
                    setCounter(counter + 1);
                  }}
                />
                <Pagination.Prev
                  onClick={() => {
                    setPageNo(pageNo - 1);
                    setCounter(counter + 1);
                  }}
                  disabled={pageNo <= 1}
                />

                {currentItems.map((number, index) => (
                  <Pagination.Item
                    key={index}
                    active={number === active}
                    onClick={() => {
                      setPageNo(number);
                      setCounter(counter + 1);
                    }}
                  >
                    {number}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => {
                    setPageNo(pageNo + 1);
                    setCounter(counter + 1);
                  }}
                  disabled={pageNo >= totalPage}
                />

                <Pagination.Last
                  onClick={() => {
                    setPageNo(totalPage);
                    setCounter(counter + 1);
                  }}
                />
              </Pagination>
            </Container>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
