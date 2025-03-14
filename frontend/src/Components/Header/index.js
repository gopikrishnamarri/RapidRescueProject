import React, { useEffect, useState } from "react";
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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(!!userData); // Convert to boolean (true if exists, false otherwise)
  }, []);
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userData"); // Remove user data
    setIsLoggedIn(false);
    setAnchorEl(null);
    navigate("/login"); // Redirect to login page
  };
  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            Rapid Rescue
          </Typography>
          <Box sx={{ display: "flex" }}>
            <a
              href="/"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "black",
                textDecoration: "none",
                fontWeight: "500",
                padding: "20px",
              }}
            >
              Home
            </a>
            <a
              href="/about"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "black",
                textDecoration: "none",
                fontWeight: "500",
                padding: "20px",
              }}
            >
              About
            </a>

            <Dropdown>
              <Dropdown.Toggle
                // variant="success"

                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "20px",
                  background: "transparent",
                  border: "none",
                }}
              >
                Service
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/service">Request service</Dropdown.Item>
                <Dropdown.Item href="/servicelist">Service List</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <a
              href="#"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "black",
                textDecoration: "none",
                fontWeight: "500",
                padding: "20px",
              }}
            >
              Blog
            </a>
            <a
              href="#"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "black",
                textDecoration: "none",
                fontWeight: "500",
                padding: "20px",
              }}
            >
              Contact
            </a>
          </Box>

          {isLoggedIn ? (
            <>
              {/* Profile Icon with Menu */}
              <IconButton onClick={handleClick}>
                <AccountCircleIcon sx={{ fontSize: "30px", color: "black" }} />
              </IconButton>

              {/* Popup Menu */}
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box>
              <a href="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    marginRight: 1,
                    borderRadius: "10px",
                    border: "1px solid #E3641B",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  Login
                </Button>
              </a>
              <a href="/signup" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#E3641B", borderRadius: "10px" }}
                >
                  Sign Up
                </Button>
              </a>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
