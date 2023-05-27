import image from "../Images/image.jpg";
import { BsTwitter, BsGoogle, BsFacebook, BsGithub } from "react-icons/bs";
import { MDBInput } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { Card, Col, Container, FormCheck, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../CSS/loginPage.css";
import { login } from "../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmail,
  updatePassword,
  updateUserInfo,
} from "../Actions/auth.action";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

function Login_Page() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(updateEmail(""));
    dispatch(updatePassword(""));
  }, []);

  // const validate = (event) => {
  //   event.preventDefault();
  //   if (authState.email && authState.password) {
  //     callApi();
  //   } else {
  //   }
  // };

  const callApi = (e) => {
    e.preventDefault();
    let data = {
      username: authState.email,
      password: authState.password,
    };
    setLoader(true);
    login(data)
      .then((res) => {
        dispatch(updateUserInfo(res.data.user));
        localStorage.setItem("token", (res.data.token));
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully...!",
          showConfirmButton: false,
          timer: 1500,
        });
        if (res.data.user.roles[0].id === 501) {
          navigate("/products", {
            state: { name: authState.email },
          });
        } else {
          navigate("/home", {
            state: { name: authState.email },
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
          <Container className="my-5">
            <Card
              style={{
                background: "hsla(0, 0%, 100%, 0.55)",
                backdropFilter: "blur(30px)",
              }}
            >
              <Row className="g-0 d-flex align-items-center">
                <Col md="4">
                  <Card.Img
                    src={image}
                    alt="phone"
                    className="rounded-t-5 rounded-tr-lg-0"
                    fluid
                  />
                </Col>

                <Col md="8">
                  <center>
                    <h1>Sign In</h1>
                  </center>

                  <Card.Body>
                    <MDBInput
                      wrapperClass="mb-4"
                      placeholder="Email address"
                      id="form1"
                      type="email"
                      onChange={(e) => dispatch(updateEmail(e.target.value))}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      placeholder="Password"
                      id="form2"
                      type="password"
                      onChange={(e) => dispatch(updatePassword(e.target.value))}
                    />

                    <div className="d-flex justify-content-between mx-4 mb-4">
                      <FormCheck
                        name="flexCheck"
                        value=""
                        id="flexCheckDefault"
                        label="Remember me"
                      />
                      <a href="!#">Forgot password?</a>
                    </div>

                    <Button
                      className="mb-4 w-100"
                      onClick={(e) => callApi(e)}
                    >
                      Sign in
                    </Button>
                    <center>
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <Button
                          variant="link"
                          className="text-black-50 fw-bold"
                          onClick={() => navigate("/signup")}
                        >
                          Sign Up
                        </Button>
                      </p>
                    </center>

                    <div className="text-center">
                      <p>or sign up with:</p>

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
                </Col>
              </Row>
            </Card>
          </Container>
        </>
      )}
    </div>
  );
}

export default Login_Page;
