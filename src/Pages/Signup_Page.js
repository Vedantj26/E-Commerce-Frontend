import image from "../Images/image.jpg";
import { MDBInput } from "mdb-react-ui-kit";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BsTwitter, BsGoogle, BsFacebook, BsGithub } from "react-icons/bs";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/loginPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmail,
  updateFirstName,
  updateLastName,
  updatePassword,
} from "../Actions/auth.action";
import { signup } from "../Services/Services";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

function Signup_Page() {
  const authState = useSelector((state) => state.auth);
  const [file, setFile] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateFirstName(""));
    dispatch(updateLastName(""));
    dispatch(updateEmail(""));
    dispatch(updatePassword(""));
  }, []);

  const callApi = async (event) => {
    event.preventDefault();
    let formdata = new FormData();
    formdata.append("firstName", authState.firstName);
    formdata.append("lastName", authState.lastName);
    formdata.append("email", authState.email);
    formdata.append("password", authState.password);
    formdata.append("file", file);
    setLoader(true);
    signup(formdata)
      .then((res) => {
        if (res) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account Created Successfully...!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/", {
            state: { id: authState.password, name: authState.email },
          });
        }
        setLoader(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Container fluid>
            <Row className="g-0 align-items-center">
              <Col col="5">
                <Card
                  className="my-4 cascading-right"
                  style={{
                    background: "hsla(0, 0%, 100%, 0.55)",
                    backdropFilter: "blur(30px)",
                  }}
                >
                  <Card.Body className="p-5 shadow-5 text-center">
                    <h2 className="fw-bold mb-5">Sign up now</h2>

                    <Row>
                      <Col col="5">
                        <MDBInput
                          wrapperClass="mb-4"
                          placeholder="Full Name"
                          id="form1"
                          type="text"
                          onChange={(e) =>
                            dispatch(updateFirstName(e.target.value))
                          }
                        />
                      </Col>

                      <Col col="5">
                        <MDBInput
                          wrapperClass="mb-4"
                          placeholder="Last name"
                          id="form2"
                          type="text"
                          onChange={(e) =>
                            dispatch(updateLastName(e.target.value))
                          }
                        />
                      </Col>
                    </Row>
                    <MDBInput
                      wrapperClass="mb-4"
                      placeholder="Email"
                      id="form3"
                      type="email"
                      onChange={(e) => dispatch(updateEmail(e.target.value))}
                    />

                    <MDBInput
                      wrapperClass="mb-4"
                      placeholder="Password"
                      id="form5"
                      type="password"
                      onChange={(e) => dispatch(updatePassword(e.target.value))}
                    />
                    <Form.Group controlId="formFile" className="mb-4">
                      <Form.Control
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </Form.Group>
                    <Button
                      className="w-100 mb-2"
                      size="md"
                      onClick={(event) => callApi(event)}
                    >
                      sign up
                    </Button>
                    <p className="mb-4">
                      Already have an Account?{" "}
                      <Button
                        variant="link"
                        className="text-black-50 fw-bold"
                        onClick={() => navigate("/")}
                      >
                        Login
                      </Button>
                    </p>
                    <div className="text-center">
                      <p>or login up with:</p>

                      <Button
                        tag="a"
                        variant="link"
                        className="mx-3"
                        style={{ color: "#1266f1" }}
                        href="https://accounts.google.com/v3/signin/identifier?dsh=S-889145824%3A1681894700973419&ifkv=AQMjQ7RoZTZmNOp0THeErzWsnuzhyMD7RoKCrKpKRi0IwxOI5FBDd8hVowzC8FHbMwXG8nqLeL5UTQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                      >
                        <BsGoogle />
                      </Button>

                      <Button
                        tag="a"
                        variant="link"
                        className="mx-3"
                        style={{ color: "#1266f1" }}
                        href="https://twitter.com/i/flow/login/"
                      >
                        <BsTwitter />
                      </Button>

                      <Button
                        tag="a"
                        variant="link"
                        className="mx-3"
                        style={{ color: "#1266f1" }}
                        href="https://www.facebook.com/login/"
                      >
                        <BsFacebook />
                      </Button>

                      <Button
                        tag="a"
                        variant="link"
                        className="mx-3"
                        style={{ color: "#1266f1" }}
                        href="https://github.com/login"
                      >
                        <BsGithub />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md="4">
                <Card.Img
                  src={image}
                  alt="phone"
                  className="w-100 rounded-4 shadow-4"
                  fluid
                />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default Signup_Page;
