import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import signupimg from "../../Images/signup.png";
import swal from "sweetalert";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { getApihandler, postApihandler } from "../../Apihandler";
import { useNavigate } from "react-router-dom";
const issues = ["Flat Tyre", "Battery Dead", "Engine Failure", "Fuel Empty"];
export default function Service() {
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [services, setServices] = useState([]);
 

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userData");
    if(user === null){
      swal({
        text: "Please Login First",
        icon: "warning",
      }).then(() => {
        window.location.href = "/login"; // Change this to your actual login page URL
      });
    }else{
      getServices();
    }
    
   

  }, []);

  const getServices = async () => {
    const res = await getApihandler("/admin/getAllServices");
    if (res.message === "Services fetched successfully") {
      setServices(res.data);
    }
  };

  const AddIssue = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData || !userData._id) {
      console.error("User ID is missing.");
      return;
    }

    const userId = userData._id;

    const formData = new FormData();
    formData.append("user_Id", userId);
    formData.append("issueType", issue);
    formData.append("description", description);
    formData.append("address", location);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    // Append file only if it's selected
    if (file) {
      formData.append("photo", file);
    }

    // Log formData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const res = await postApihandler("/createIssue", formData);
    console.log("crete issueAPI response:", res);
    if (res.message === "Issue created successfully") {
      swal({
        text: "Issue created successfully",
        icon: "success",
      });
      localStorage.setItem("issue_Id", JSON.stringify(res.data._id));
      localStorage.setItem("latitude", latitude);
      localStorage.setItem("longitude", longitude);
      navigate("/mechanic");
    }
  };

  return (
    <>
      <Header />
      <section className="services mt-5">
        <Container>
          <Row>
            <Col md={6}>
              <div className="signupimg">
                <img src={signupimg} alt="Mechanic" width="100%" />
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-center">
              <div>
                <h5>Request Assistance</h5>
                <Form.Group className="mt-3">
                  <Form.Label>Select Issue</Form.Label>
                  <Form.Select
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    style={{
                      border: "1px solid #E3641B",
                      width: "272px",
                      borderRadius: "10px",
                    }}
                  >
                     <option>Select Service</option>
                    {
                     
                     services.length === 0 ?"": services.map((val) => {
                        return (
                          <>

                            <option>{val.service_name}</option>
                          </>
                        )
                      })
                    }

                    
                  </Form.Select>
                </Form.Group>

                {/* Location Input */}
                <Form.Group className="mt-3">
                  <Form.Label>Your Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                      border: "1px solid #E3641B",
                      width: "272px",
                      borderRadius: "10px",
                    }}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    style={{
                      border: "1px solid #E3641B",
                      width: "272px",
                      borderRadius: "10px",
                    }}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    style={{
                      border: "1px solid #E3641B",
                      width: "272px",
                      borderRadius: "10px",
                    }}
                  />
                </Form.Group>
                {/* File Upload */}
                <Form.Group className="mt-3">
                  <Form.Label>Upload a Photo</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ width: "50%", borderRadius: "10px" }}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                      border: "1px solid #E3641B",
                      width: "272px",
                      borderRadius: "10px",
                    }}
                  />
                </Form.Group>

                {/* Estimated Service */}

                {/* Request Button */}
                <Button
                  variant="contained"
                  className=" mt-3"
                  sx={{ backgroundColor: "#E3641B", borderRadius: "10px" }}
                  onClick={AddIssue}
                >
                  Request Assistance
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}
