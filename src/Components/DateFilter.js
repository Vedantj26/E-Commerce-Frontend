import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FcCalendar } from "react-icons/fc";
import { updateOrderList } from "../Actions/auth.action";
import { useDispatch } from "react-redux";
import { getFilterOrders } from "../Services/Services";

function OrderDate(props) {
  const dispatch = useDispatch();
  const [userId, setuserId] = useState("");
  const [orderStatus, setorderStatus] = useState("");
  const [orderDateStart, setorderDateStart] = useState("");
  const [orderDateEnd, setorderDateEnd] = useState("");

  const callgetFilterOrders = () => {
    let data = {
      userId: userId,
      orderStatus: orderStatus,
      orderDate: orderDateStart,
      orderDateStart: orderDateStart,
      orderDateEnd: orderDateEnd,
    };
    getFilterOrders(data)
      .then((res) => {
        dispatch(updateOrderList(res));
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <h4>Filter By Date</h4>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Label>
              <strong>From:</strong>
            </Form.Label>
            <Form.Group title="From">
              <Form.Control
                type="date"
                placeholder="From Date"
                value={orderDateStart}
                onChange={(e) => setorderDateStart(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>
              <strong>To:</strong>
            </Form.Label>
            <Form.Group title="To">
              <Form.Control
                type="date"
                placeholder="To Date"
                value={orderDateEnd}
                onChange={(e) => setorderDateEnd(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => callgetFilterOrders()}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function DateFilter() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="link" onClick={() => setModalShow(true)}>
        <FcCalendar size={30} />
      </Button>

      <OrderDate show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
