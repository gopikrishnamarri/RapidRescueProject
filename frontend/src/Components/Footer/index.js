import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
export default function Footer() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#E3641B",
          color: "white",
          padding: 4,
          marginTop: 4,
        }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Rapid Rescue</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <a
                href="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "20px",
                  textAlign:"left"
                }}
              >
                <Typography variant="h6">Links</Typography>
              </a>
              <a
                href="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                  textAlign:"left"

                }}
              >
                <Typography variant="h6">Home</Typography>
              </a>
              <a
                href="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                  textAlign:"left"

                }}
              >
                <Typography variant="h6">About</Typography>
              </a>
              <a
                href="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                  textAlign:"left"

                }}
              >
                <Typography variant="h6">Services</Typography>
              </a>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Join Our Newsletter</Typography>
              <input
                label="Email"
                placeholder="email"
                // variant="outlined"
                // fullWidth
                style={{ background: "#D9D9D9",  padding:"10px", border:"none", borderRadius:"5px"
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
