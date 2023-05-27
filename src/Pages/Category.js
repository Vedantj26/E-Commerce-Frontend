import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { Row, Col, Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteCatById, getAllCats } from "../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { updateCatList } from "../Actions/auth.action";
import Swal from "sweetalert2";
import SideNav from "../Components/SideNav";

export default function Category() {
  const catState = useSelector((state) => state.cat.catList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setLoader(true);
    callGetAllCategories();
  }, [counter]);

  const deleteCat = (elementId) => {
    callDeleteCategoryApi(elementId);
  };

  const callGetAllCategories = () => {
    getAllCats()
      .then((res) => {
        if (res) {
          dispatch(updateCatList(res.data));
          setLoader(false);
          return res.data;
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const callDeleteCategoryApi = async (elementId) => {
    let data = {
      id: elementId,
    };
    setLoader(true);
    deleteCatById(data)
      .then((res) => {
        setCounter(counter + 1);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Category Deleted Successfully...!",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoader(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      <Row>
        <Col md={2}>
          <SideNav />
        </Col>
        <Col md={10}>
          <Container>
            {loader ? (
              <Loader />
            ) : (
              <div className="row justify-content-center">
                <h2 className="row justify-content-center mt-4">Categories</h2>
                <div
                  className="text-center mb-5 mt-3"
                  style={{
                    backgroundColor: "#eee",
                    borderRadius: "5px",
                    background: "hsla(0, 0%, 100%, 0.55)",
                    backdropFilter: "blur(30px)",
                  }}
                >
                  {catState.length === 0 && (
                    <h4
                      className="d-flex justify-content-center"
                      style={{ marginTop: 100 }}
                    >
                      Order Not Found!
                    </h4>
                  )}

                  <Row className="mt-3">
                    <Col>
                      <p>Category Id</p>
                    </Col>
                    <Col>
                      <p>Category Name</p>
                    </Col>
                    <Col>
                      <p>Created At</p>
                    </Col>
                    <Col>
                      <p style={{ paddingLeft: "20%" }}>Updated At</p>
                    </Col>
                    <Col>
                      <p style={{ paddingLeft: "30%" }}>Is Active</p>
                    </Col>
                    <Col>
                      <Button
                        variant="Primary"
                        className="btn btn-primary btn-sm m-2 p-1"
                        style={{
                          width: "100%",
                        }}
                        onClick={() => navigate("/addcat")}
                      >
                        Add Category
                      </Button>
                    </Col>
                    <Col />
                  </Row>

                  {catState.map((element, index) => (
                    <div key={index}>
                      <Row>
                        <hr />
                        <Col>
                          <p>{element.id}</p>
                        </Col>
                        <Col>
                          <p>{element.catName}</p>
                        </Col>
                        <Col>
                          <p>{element.createdDate}</p>
                        </Col>
                        <Col>
                          <p>{element.updatedDate}</p>
                        </Col>
                        <Col>
                          <p>{String(element.active)}</p>
                        </Col>

                        <Col>
                          <Button
                            variant="primary"
                            className="btn btn-primary btn-sm"
                            style={{
                              width: "60%",
                            }}
                            onClick={() =>
                              navigate("/addcat", { state: { id: element.id } })
                            }
                          >
                            Edit
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="danger"
                            className="btn btn-primary btn-sm"
                            style={{
                              width: "60%",
                            }}
                            onClick={() => deleteCat(element.id)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
}
