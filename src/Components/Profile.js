import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Config } from "../Config/config";
import {
  updateEmail,
  updatePassword,
  updateUserInfo,
} from "../Actions/auth.action";
import Swal from "sweetalert2";

export default function UserProfile() {
  const authState = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    localStorage.clear();
    dispatch(updateEmail(""));
    dispatch(updatePassword(""));
    dispatch(updateUserInfo());
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Successfully Logged Out...!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  return (
    <>
      <Card>
        <Card.Body className="text-center">
          <div className="">
            <Card.Img
              src={Config.Image_BASE_URL + "" + authState.photos}
              className="rounded-circle"
              fluid
              style={{ width: "100px" }}
            />
          </div>
          <h4>
            {authState.firstName} {authState.lastName}
          </h4>
          <Card.Text className="text-muted mb-4">
            {authState.email} <span className="mx-2">|</span>{" "}
            {authState.roles[0].id === 501 ? (
              <>
                <Button
                  variant="link"
                  onClick={() => navigate("/manageOrderHistory")}
                >
                  Order History
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="link"
                  onClick={() => navigate("/orderHistory")}
                >
                  Order History
                </Button>
              </>
            )}
          </Card.Text>
          <Button
            variant="danger"
            size="md"
            onClick={() => {
              logOut();
            }}
          >
            Log Out
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
