import "../../CSS/UserHome.css";
import Ripples from "react-ripples";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import NavScrollExample from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getAddToCart, getProdById } from "../../Services/Services";
import { updateProdInfo } from "../../Actions/auth.action";
import { Config } from "../../Config/config";
import Swal from "sweetalert2";
import Loader from "../../Components/Loader";

function ProductDetails() {
  const prodState = useSelector((state) => state.prod.prodInfo);
  const authState = useSelector((state) => state.auth.userInfo.id);
  const location = useLocation();
  const getId = location.state.element.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [num, setNum] = useState(1);
  const [qty, setQty] = useState(1);
  const [id, setId] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    GetProductById();
  }, []);

  const GetProductById = () => {
    let data = {
      id: getId,
      userId: authState,
    };
    setLoader(true);
    getProdById(data)
      .then((res) => {
        dispatch(updateProdInfo(res.data.data));

        if (res.data.data.cartId) {
          setId(res.data.data.cartId);
          setQty(res.data.data.qty);
          setNum(res.data.data.qty);
        } else {
          setId("");
          setQty(1);
          setNum(1);
        }
        setLoader(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const callAddToCartApi = () => {
    let data = {
      userId: authState,
      prodId: getId,
      qty: qty,
      id: id,
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
        navigate("/cart", { state: { id: prodState.id, qty: prodState.qty } });
        setLoader(false);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const increNum = () => {
    if (num < 10) {
      setQty(Number(num) + 1);
      setNum(Number(num) + 1);
    }
  };

  const decNum = () => {
    if (num > 0) {
      setQty(Number(num) - 1);
      setNum(Number(num) - 1);
    }
  };

  const handleChange = (e) => [setNum(e.target.value)];

  return (
    <div>
      <NavScrollExample />
      {loader ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Row className="justify-content-center mb-0">
              <Card
                className="mt-5 mb-3"
                style={{
                  background: "hsla(0, 0%, 100%, 0.55)",
                  backdropFilter: "blur(30px)",
                }}
                key={prodState.id}
              >
                <Card.Body>
                  <Row>
                    <Col sm="4">
                      <Ripples className="bg-image rounded hover-zoom hover-overlay">
                        <Card.Img
                          src={Config.Image_BASE_URL + "" + prodState.imagePath}
                          className="square bg-primary rounded-9"
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </a>
                      </Ripples>
                    </Col>
                    <Col
                      sm="8"
                      className="text-center  align-item-center border-sm-start-none border-start"
                    >
                      <h1>{prodState.name}</h1>
                      <h4>₹ {prodState.price}</h4>
                      <div className="text-align-center d-flex flex-row">
                        <p>{prodState.description}</p>
                      </div>
                      <center>
                        <Col
                          md="6"
                          lg="6"
                          className="border-sm-start-none border-top"
                        >
                          <InputGroup
                            className="justify-content-center mt-2"
                            size="sm"
                            onChange={handleChange}
                          >
                            <Button
                              className="me-3"
                              variant="dark"
                              onClick={decNum}
                            >
                              -
                            </Button>
                            {num}
                            <Button
                              className="ms-3"
                              variant="dark"
                              onClick={increNum}
                            >
                              +
                            </Button>
                          </InputGroup>
                          <Button
                            variant="success"
                            size="lg"
                            className="mt-2"
                            onClick={() => callAddToCartApi(getId)}
                          >
                            <AiOutlineShoppingCart size={23} className="me-2" />
                            Add To Cart
                          </Button>
                        </Col>
                      </center>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
