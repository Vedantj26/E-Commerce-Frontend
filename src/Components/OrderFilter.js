import React, { useState, useRef } from "react";
import { Button, Overlay, Form } from "react-bootstrap";
import { GoSettings } from "react-icons/go";
import { getAllOrders, getFilterOrders } from "../Services/Services";
import { useDispatch } from "react-redux";
import { updateOrderList } from "../Actions/auth.action";
import DateFilter from "./DateFilter";

export default function OrderFilter() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [userId, setuserId] = useState("");
  const [orderStatus, setorderStatus] = useState("");
  const [orderDateStart, setorderDateStart] = useState("");
  const [orderDateEnd, setorderDateEnd] = useState("");
  const target = useRef(null);

  const callgetAllOrders = () => {
    getAllOrders()
      .then((res) => {
        dispatch(updateOrderList(res));
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const callgetFilterOrders = () => {
    let data = {
      userId: userId,
      orderStatus: orderStatus,
      orderDate: orderDateStart,
      orderDateStart: orderDateStart,
      orderDateEnd: orderDateEnd,
    };
    if (data.orderStatus == "All") {
      callgetAllOrders();
    } else {
      getFilterOrders(data)
        .then((res) => {
          dispatch(updateOrderList(res));
          return res;
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <>
      <Button variant="link" ref={target} onClick={() => setShow(!show)}>
        <GoSettings size={25} color="black" />
      </Button>
      <Overlay target={target.current} show={show} placement="left">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            className="d-flex flex-row-reverse bd-highlight"
            style={{
              backgroundColor: "#fff",
              ...props.style,
            }}
          >
            <div className="p-2 bd-highlight">
              <Button onClick={() => callgetFilterOrders()}>Filter</Button>
            </div>
            <div className="p-2 bd-highlight">
              <DateFilter />
            </div>
            <div className="p-2 bd-highlight">
              <Form.Select
                aria-label="Default select example"
                defaultValue={0}
                onChange={(e) => setorderStatus(e.target.value)}
              >
                <option value="All">All Orders</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Packed">Packed</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </div>
            <div className="p-2 bd-highlight">
              <Form>
                <Form.Control
                  type="search"
                  placeholder="Search User"
                  onChange={(e) => setuserId(e.target.value)}
                />
              </Form>
            </div>
          </div>
        )}
      </Overlay>
    </>
  );
}
