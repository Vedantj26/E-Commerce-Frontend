import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  createProd,
  getAllCats,
  getAllProds,
  getProdById,
  updateProdById,
} from "../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCatId,
  updateCatList,
  updateProdCatId,
  updateProdDesc,
  updateProdList,
  updateProdName,
  updateProdPrice,
} from "../Actions/auth.action";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Components/Loader";
import SideNav from "../Components/SideNav";

function UpdateProdOld() {
  const upProdState = useSelector((state) => state.prod);
  const catState = useSelector((state) => state.cat.catList);
  const authState = useSelector((state) => state.auth.userInfo.id);
  const location = useLocation();
  const navigate = useNavigate();
  const receivedProdId = location.state;
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    callGetAllCategories();
    dispatch(updateProdName(""));
    dispatch(updateProdDesc(""));
    dispatch(updateProdPrice(""));
    dispatch(updateProdCatId(""));
    if (receivedProdId) {
      getProductById();
    } else {
    }
  }, []);

  const callGetAllProdsAPI = () => {
    setLoader(true);
    getAllProds()
      .then((res) => {
        dispatch(updateProdList(res.data));
        setLoader(false);
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };

  const callCreatedProduct = () => {
    const formData = new FormData();
    formData.append("name", upProdState.name);
    formData.append("description", upProdState.description);
    formData.append("price", upProdState.price);
    formData.append("catId", upProdState.catId);
    formData.append("image", image);
    setLoader(true);
    createProd(formData)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Created Successfully...!",
          showConfirmButton: false,
          timer: 1500,
        });
        callGetAllProdsAPI();
        setLoader(false);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const callupdateProdById = async () => {
    const formData = new FormData();
    formData.append("name", upProdState.name);
    formData.append("description", upProdState.description);
    formData.append("price", upProdState.price);
    formData.append("catId", upProdState.catId);
    formData.append("image", image);
    setLoader(true);
    let data = {
      id: receivedProdId.id,
      formdata: formData,
    };

    updateProdById(data)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Updated Successfully...!",
          showConfirmButton: false,
          timer: 1500,
        });
        callGetAllProdsAPI();
        setLoader(false);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const getProductById = () => {
    let data = {
      userId: authState,
      id: receivedProdId.id,
    };
    setLoader(true);
    getProdById(data)
      .then((res) => {
        dispatch(updateProdName(res.data.data.name));
        dispatch(updateProdDesc(res.data.data.description));
        dispatch(updateProdCatId(res.data.data.catId));
        dispatch(updateProdPrice(res.data.data.price));
        setLoader(false);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const callGetAllCategories = () => {
    setLoader(true);
    getAllCats()
      .then((res) => {
        dispatch(updateCatList(res.data));
        setLoader(false);
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };

  const navigateToProds = () => {
    navigate("/products");
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
                <Card
                  className="m-5 mx-5 mb-2 p-2 shadow-5"
                  style={{
                    background: "hsla(0, 0%, 100%, 0.55)",
                    backdropFilter: "blur(30px)",
                  }}
                >
                  <Form>
                    <Card.Body className="text-center">
                      {receivedProdId ? (
                        <>
                          <h2 className="fw-bold mb-5">Update Product</h2>
                        </>
                      ) : (
                        <>
                          <h2 className="fw-bold mb-5">Add Product</h2>
                        </>
                      )}

                      {receivedProdId ? (
                        <>
                          <Row>
                            <Col col="6">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Product Name"
                                className="mb-4"
                              >
                                <Form.Control
                                  wrapperClass="mb-4"
                                  type="text"
                                  placeholder="Product Name"
                                  value={upProdState.name}
                                  onChange={(e) => {
                                    dispatch(updateProdName(e.target.value));
                                  }}
                                />
                              </FloatingLabel>
                            </Col>

                            <Col col="6">
                              <div class="form-floating">
                                <select
                                  class="form-select"
                                  id="floatingSelect"
                                  value={upProdState.catId}
                                  onChange={(e) => {
                                    dispatch(updateProdCatId(e.target.value));
                                  }}
                                >
                                  <option selected>All Categories</option>
                                  {catState.map((element, index) => (
                                    <option
                                      key={index}
                                      value={element.id}
                                      onClick={(e) => {
                                        dispatch(updateCatId(e.target.value));
                                      }}
                                    >
                                      {element.catName}
                                    </option>
                                  ))}
                                </select>
                                <label for="floatingSelect">
                                  Select Categories
                                </label>
                              </div>
                            </Col>
                          </Row>

                          <FloatingLabel
                            controlId="floatingInput"
                            label="Product Description"
                            className="mb-4"
                          >
                            <Form.Control
                              wrapperClass="mb-4"
                              type="text"
                              placeholder="Product Description"
                              value={upProdState.description}
                              onChange={(e) => {
                                dispatch(updateProdDesc(e.target.value));
                              }}
                            />
                          </FloatingLabel>

                          <FloatingLabel
                            controlId="floatingInput"
                            label="Product Price"
                            className="mb-4"
                          >
                            <Form.Control
                              wrapperClass="mb-4"
                              type="text"
                              placeholder="Product Price"
                              value={upProdState.price}
                              onChange={(e) => {
                                dispatch(updateProdPrice(e.target.value));
                              }}
                            />
                          </FloatingLabel>

                          <Form.Group controlId="formFile" className="mb-4">
                            <Form.Control
                              type="file"
                              onChange={(e) => {
                                setImage(e.target.files[0]);
                              }}
                            />
                          </Form.Group>
                        </>
                      ) : (
                        <>
                          <Row>
                            <Col col="6">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Product Name"
                                className="mb-4"
                              >
                                <Form.Control
                                  wrapperClass="mb-4"
                                  type="text"
                                  placeholder="Product Name"
                                  onChange={(e) => {
                                    dispatch(updateProdName(e.target.value));
                                  }}
                                />
                              </FloatingLabel>
                            </Col>

                            <Col col="6">
                              <div class="form-floating">
                                <select
                                  class="form-select"
                                  id="floatingSelect"
                                  onChange={(e) => {
                                    dispatch(updateProdCatId(e.target.value));
                                  }}
                                >
                                  <option selected>All Categories</option>
                                  {catState.map((element, index) => (
                                    <option
                                      key={element.id}
                                      value={element.id}
                                      onClick={(e) => {
                                        dispatch(updateCatId(e.target.value));
                                      }}
                                    >
                                      {element.catName}
                                    </option>
                                  ))}
                                </select>
                                <label for="floatingSelect">
                                  Select Categories
                                </label>
                              </div>
                            </Col>
                          </Row>

                          <FloatingLabel
                            controlId="floatingInput"
                            label="Product Description"
                            className="mb-4"
                          >
                            <Form.Control
                              wrapperClass="mb-4"
                              type="text"
                              placeholder="Product Description"
                              onChange={(e) => {
                                dispatch(updateProdDesc(e.target.value));
                              }}
                            />
                          </FloatingLabel>

                          <FloatingLabel
                            controlId="floatingInput"
                            label="Product Price"
                            className="mb-4"
                          >
                            <Form.Control
                              wrapperClass="mb-4"
                              type="text"
                              placeholder="Product Price"
                              onChange={(e) => {
                                dispatch(updateProdPrice(e.target.value));
                              }}
                            />
                          </FloatingLabel>

                          <Form.Group controlId="formFile" className="mb-4">
                            <Form.Control
                              type="file"
                              onChange={(e) => {
                                setImage(e.target.files[0]);
                              }}
                            />
                          </Form.Group>
                        </>
                      )}

                      {receivedProdId ? (
                        <>
                          <Button
                            className="w-100 mb-4"
                            size="md"
                            onClick={() => {
                              callupdateProdById();
                              navigateToProds();
                            }}
                          >
                            Update
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            className="w-100 mb-4"
                            size="md"
                            onClick={() => {
                              callCreatedProduct();
                              navigateToProds();
                            }}
                          >
                            Create
                          </Button>
                        </>
                      )}
                    </Card.Body>
                  </Form>
                </Card>
              </Container>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default UpdateProdOld;
