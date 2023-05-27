import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  createCat,
  getCategoryById,
  updateCatById,
} from "../Services/Services";
import Swal from "sweetalert2";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateCatName } from "../Actions/auth.action";
import SideNav from "../Components/SideNav";

export default function AddCat() {
  const catState = useSelector((state) => state.cat);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const catId = location.state;
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (catId) {
      callgetCategoryById();
    }
  }, []);

  const addCategory = (e) => {
    e.preventDefault();
    if (catId && catState.name) {
      callUpdateCategory();
    } else if (catState.name) {
      callCreateCategoryApi();
    } else {
      alert("Category Name Category ID is Not Found");
    }
  };

  const callgetCategoryById = () => {
    setLoader(true);
    let data = {
      id: catId.id,
    };
    setLoader(true);
    getCategoryById(data)
      .then((res) => {
        dispatch(updateCatName(res.data.catName));
        setLoader(false);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const callUpdateCategory = async () => {
    let formdata = new FormData();
    formdata.append("catName", catState.name);
    let dataId = {
      id: catId,
    };
    setLoader(true);
    updateCatById(dataId, formdata)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Category Updated Successfully...!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/category");
        setLoader(false);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const callCreateCategoryApi = () => {
    let formdata = new FormData();
    formdata.append("catName", catState.name);
    setLoader(true);
    createCat(formdata)
      .then((res) => {
        if (res) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Category Created Successfully...!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/category");
          setLoader(false);
          return res;
        }
      })
      .catch((err) => {
        alert("Not Getting Response ");
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
          {loader ? (
            <Loader />
          ) : (
            <>
              <div className="Auth-form-container">
                <Container>
                  <form
                    className="Auth-form text-center"
                    style={{
                      width: "500px",
                      margin: "auto",
                      marginTop: "15%",
                      padding: "10px",
                      border: "2px solid white",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="Auth-form-content">
                      {catId ? (
                        <>
                          <h3 className="Auth-form-title">Update Category</h3>
                        </>
                      ) : (
                        <>
                          <h3 className="Auth-form-title">Add Category</h3>
                        </>
                      )}

                      {catId ? (
                        <>
                          <div className="form-group mt-3">
                            <input
                              className="form-control mt-1"
                              value={catState.name}
                              onChange={(e) =>
                                dispatch(updateCatName(e.target.value))
                              }
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group mt-3">
                            <input
                              className="form-control mt-1"
                              placeholder="Enter Category Name"
                              onChange={(e) =>
                                dispatch(updateCatName(e.target.value))
                              }
                            />
                          </div>
                        </>
                      )}
                      <div className="d-grid gap-2 mt-3">
                        <Button
                          type="submit"
                          className="btn btn-success"
                          onClick={(e) => addCategory(e)}
                        >
                          {catId ? <>Update Category</> : <>Add Category</>}
                        </Button>
                        <Button type="reset" className="btn btn-danger">
                          Reset
                        </Button>
                      </div>
                    </div>
                  </form>
                </Container>
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
