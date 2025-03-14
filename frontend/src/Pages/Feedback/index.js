import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { postApihandler } from "../../Apihandler";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";

export default function FeedBack() {
  const [value, setValue] = React.useState(2);
  const [comment, setComment] = useState("");
  const { mechanicId } = useParams(); // Get mechanic ID from URL
  console.log("mechanic id is ---", mechanicId);
  const navigate = useNavigate();
  const SubmitFeedback = async () => {
    // const mechanicId = localStorage.getItem("mechanic_Id");
    const issueId = localStorage.getItem("issue_Id");
    const issueid = JSON.parse(issueId);
    console.log("issue id -->", issueId);
    // console.log("mechanic id is --->", mechanicId);
    // const Id = JSON.parse(mechanicId);
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData || !userData._id) {
      console.error("User ID is missing.");
      return;
    }

    const userId = userData._id;
    const data = {
      issue_Id: issueid,
      user_Id: userId,
      mechanic_Id: mechanicId,
      rating: value,
      comment: comment,
    };
    console.log("data is ---->", data);
    const res = await postApihandler("/submitFeedback", data);
    console.log("send feedback res is --->", res);
    if (res.message === "Feedback submitted successfully") {
      swal({
        text: "Feedback submitted successfully",
        icon: "success",
      });
      navigate("/payment");
    } else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
  };
  return (
    <>
      <Header />
      <section>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", textAlign: "center" }}
          >
            {" "}
            Service Feedback
          </Typography>
          <Grid container spacing={2} className="mt-3 justify-content-center">
            <Box
              sx={{
                backgroundColor: "#f2f2f2",
                // width: "363px",
                padding: "50px 30px ",
                borderRadius: "10px",
              }}
            >
              <h6 style={{ fontSize: "18px", fontWeight: "400" }}>
                <span style={{ fontWeight: "700" }}>Issue:</span>  Flat Tire
              </h6>
              <h6 style={{ fontSize: "18px", fontWeight: "400" }}>
                {" "}
                <span style={{ fontWeight: "700" }}>Mechanic:</span> John Doe
              </h6>
              <h6 style={{ fontSize: "18px", fontWeight: "400" }}>
                {" "}
                <span style={{ fontWeight: "700" }}> Resolution: </span> Tire
                replaced successfully
              </h6>

              <Typography
                component="legend"
                className="mt-3"
                sx={{ fontSize: "18px", fontWeight: "700" }}
              >
                Rate the Service
              </Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <div>
                <textarea
                  placeholder="Write your Feedback...."
                  className="py-4 px-5"
                  style={{ borderRadius: "10px" }}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-4 text-center">
                <Button
                  className="px-3"
                  sx={{
                    backgroundColor: "#E3641B",
                    color: "white",
                    borderRadius: "10px",
                  }}
                  onClick={SubmitFeedback}
                >
                  Submit Feedback
                </Button>
              </div>
            </Box>
          </Grid>
        </Container>
      </section>
      <Footer />
    </>
  );
}
