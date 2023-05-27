import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/updateProduct.css";
import Container from "react-bootstrap/esm/Container";
import { Button, Card, Pagination } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Ripples from "react-ripples";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProdById,
  getAllProds,
  getPagination,
} from "../Services/Services";
import { Config } from "../Config/config";
import { useNavigate } from "react-router-dom";
import { updateProdList } from "../Actions/auth.action";
import Swal from "sweetalert2";
import Loader from "../Components/Loader";
import SideNav from "../Components/SideNav";

function Products() {
  const prodState = useSelector((state) => state.prod.productlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const [loader, setLoader] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState();
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
      pageSize: 4,
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

  const NavToUpdateProdById = (eleId) => {
    navigate("/addupdateprod", {
      state: { id: eleId },
    });
  };

  const callDeleteProdById = async (eleId) => {
    let data = {
      id: eleId,
    };
    setLoader(true);
    deleteProdById(data)
      .then((res) => {
        setCounter(counter + 1);
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
              <Container fluid>
                <Row className="d-flex justify-content-center">
                  <Col>
                    {prodState ? (
                      prodState.map((element, index) => (
                        <Card
                          className="shadow-0 border rounded-3 mt-5 mb-3"
                          key={element.id}
                          style={{
                            background: "hsla(0, 0%, 100%, 0.55)",
                            backdropFilter: "blur(30px)",
                          }}
                        >
                          <Card.Body>
                            <Row>
                              <Col md="12" lg="3" className="mb-4 mb-lg-0">
                                <Ripples className="bg-image rounded hover-zoom hover-overlay">
                                  <Card.Img
                                    src={
                                      Config.Image_BASE_URL +
                                      "" +
                                      element.imagePath
                                    }
                                    className="w-100"
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
                              </Col>
                              <Col
                                md="6"
                                className="border-sm-start-none border-start"
                              >
                                <h5>{element.name}</h5>
                                <div className="d-flex flex-row">
                                  <p>{element.description}</p>
                                </div>
                              </Col>
                              <Col
                                md="6"
                                lg="3"
                                className="border-sm-start-none border-start"
                              >
                                <div className="d-flex flex-row align-items-center mb-1">
                                  <h4 className="mb-1 me-1">
                                    ₹ {element.price}
                                  </h4>
                                </div>
                                <div className="d-flex flex-column mt-4">
                                  <Button
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={() => {
                                      NavToUpdateProdById(element.id);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => {
                                      callDeleteProdById(element.id);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <div style={{ margin: "100px 100px 100px 100px" }}>
                        <h3>Add Product</h3>
                      </div>
                    )}
                  </Col>
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
        </Col>
      </Row>
    </div>
  );
}

export default Products;
