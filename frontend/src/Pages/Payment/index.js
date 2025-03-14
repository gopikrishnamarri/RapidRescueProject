import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
export default function Payment() {
  return (
    <div>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "700", textAlign: "center" }}
        >
          {" "}
          Payment
        </Typography>
        <Grid container spacing={2} className="mt-3 justify-content-center">
          <Box
            sx={{
              backgroundColor: "#f2f2f2",
              // width: "363px",
              padding: "50px 30px ",
              borderRadius: "10px",
              fontFamily: "Itim",
            }}
          >
            <h6
              style={{
                fontSize: "18px",
                fontWeight: "400",
                fontFamily: "Itim",
              }}
            >
              <span style={{ fontWeight: "700", fontFamily: "Itim" }}>
                Service Charge
              </span>{" "}
               $50
            </h6>
            <h6
              style={{
                fontSize: "18px",
                fontWeight: "400",
                fontFamily: "Itim",
              }}
            >
              {" "}
              <span style={{ fontWeight: "700", fontFamily: "Itim" }}>Tax</span>
                $5
            </h6>
            <h6
              style={{
                fontSize: "18px",
                fontWeight: "400",
                fontFamily: "Itim",
              }}
            >
              {" "}
              <span style={{ fontWeight: "700", fontFamily: "Itim" }}>
                {" "}
                Total 
              </span>{" "}
              $55
            </h6>

            <div>
              <h6 style={{ fontFamily: "Itim" }}>Select Payment Method </h6>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Typography sx={{ fontFamily: "Itim" }}>
                      Credit Card/ Debit Card
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Typography sx={{ fontFamily: "Itim" }}>
                      Google Pay
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Typography sx={{ fontFamily: "Itim" }}>Cash</Typography>
                  }
                />
              </FormGroup>
            </div>
            <div className="mt-4 text-center">
              <Button
                className="px-3"
                sx={{
                  backgroundColor: "#E3641B",
                  color: "white",
                  borderRadius: "10px",
                  fontFamily:"Itim"
                }}
              >
                Proceed
              </Button>
            </div>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
