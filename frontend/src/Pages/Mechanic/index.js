import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { postApihandler } from "../../Apihandler";
import swal from "sweetalert";

export default function Mechanic() {
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    // Retrieve latitude and longitude from localStorage
    const savedLatitude = localStorage.getItem("latitude");
    const savedLongitude = localStorage.getItem("longitude");

    if (savedLatitude && savedLongitude) {
      setLatitude(savedLatitude);
      setLongitude(savedLongitude);
      fetchMechanics(savedLatitude, savedLongitude);
    }
  }, []);

  const fetchMechanics = async (lat, lng) => {
    const data = {
      longitude: parseFloat(lng),
      latitude: parseFloat(lat),
      maxDistance: 5000, // 5 km radius
    };
    const response = await postApihandler("/findNearbyMechanics", data);

    if (response.message === "Nearby mechanics found") {
      setData(response.data);
    }
  };

  // const handleSelectMechanic = (mechanicId) => {
  //   // Store the mechanic ID in localStorage
  //   localStorage.setItem("selectedMechanicId", mechanicId);

  //   // Navigate to the feedback page
  //   navigate(`/feedback/${mechanicId}`);
  // };

  // ****** select mechanic *****
  const handleSelectMechanic = async (mechanicId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData || !userData._id) {
      console.error("User ID is missing.");
      return;
    }

    const userId = userData._id;

    const requestData = {
      user_Id: userId,
      mechanic_Id: mechanicId,
    };

    try {
      const response = await postApihandler("/selectMechanic", requestData);
      console.log("select mechaic api response ---->", response);
      if (
        response.message ===
        "Mechanic selected successfully and assignment stored."
      ) {
        // Store mechanic selection details
        // localStorage.setItem("selectedMechanic", JSON.stringify(response.data));
        swal({
          text: "Mechanic selected successfully",
          icon: "success",
        });
        // Navigate to the Service Selection Page
        navigate(`/servicelist`);
      } else {
        // alert("Failed to select mechanic. Try again.");
      }
    } catch (error) {
      console.error("Error selecting mechanic:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Select a Mechanic
        </Typography>

        <Grid container spacing={2}>
          {data.map((mechanic) => (
            <Grid item xs={12} key={mechanic._id}>
              <Card
                sx={{ backgroundColor: "#f2f2f2", p: 2, borderRadius: "10px" }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", fontWeight: "500" }}
                  >
                    {mechanic.user_Name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "18px", fontWeight: "500" }}
                  >
                    Garage: {mechanic.garage_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "18px", fontWeight: "500" }}
                  >
                    Contact: {mechanic.mobile_no}
                  </Typography>
                  <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                    Email: {mechanic.user_Email}
                  </Typography>
                  <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                    Coordinates: {mechanic.location.coordinates}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#E3641B", mt: 2 }}
                    size="small"
                    onClick={() => handleSelectMechanic(mechanic._id)}
                  >
                    Select
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
