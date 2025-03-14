import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
  CardMedia,
} from "@mui/material";

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { getApihandler } from "../../Apihandler"; // Assuming this is your GET API handler
import swal from "sweetalert";

export default function ServiceList() {
  const [services, setServices] = useState([]);
  console.log("services data is --->", services);



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
      getAssignedMechanic();
    }
  }, []);
 

  const getAssignedMechanic = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData || !userData._id) {
      console.error("User ID is missing.");
      return;
    }

    const userId = userData._id;
    const res = await getApihandler(`/getAssignedMechanic/${userId}`);
    console.log("get assigned res is --->", res);
    if (res.message === "Assigned mechanic retrieved successfully.") {
      setServices([res.data]);
    }
  };

  // const handleSelectService = (serviceId) => {
  //   localStorage.setItem("selectedServiceId", serviceId);
  //   navigate(`/book-service/${serviceId}`);
  // };

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        {/* <Typography variant="h5" fontWeight="bold" gutterBottom>
          Available Services
        </Typography> */}
        <Grid container spacing={2}>
          {services.length > 0 ? (
            services.map((service) => (
              <Grid item xs={12} sm={4} key={service._id}>
                <Card
                  sx={{
                    backgroundColor: "",
                    p: 2,
                    borderRadius: "10px",
                  }}
                >
                  {/* Image Display */}
                  <CardMedia
                    component="img"
                    // height="200"
                    image={`http://localhost:80/${service.photoUrl}`} // Adjust the base URL as needed
                    alt="Service Image"
                    sx={{ objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                  />

                  <CardContent>
                    <Typography variant="h6">{service.user_Name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {service.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", mt: 1 }}
                    >
                      Issue Type: {service.issueType}
                    </Typography>
                    <Typography variant="body2">
                      Address: {service.address}
                    </Typography>
                    <Typography variant="body2">
                      User Name: {service.user_Name}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#E3641B", mt: 2 }}
                      size="small"
                      // onClick={() => handleSelectService(service._id)}
                    >
                      Completed
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="error">
              ⚠ No services available. Please try again later.
            </Typography>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
