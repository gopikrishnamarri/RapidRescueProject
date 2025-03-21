import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
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
import signupimg from "../../Images/signup.png";
import { postApihandler } from "../../Apihandler";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Eye, EyeOff } from "lucide-react"; 


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mechanicemail, setMechanicEmail] = useState("");
  const [mechanicpassword, setMechanicPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    const data = {
      user_Email: email,
      password: password,
    };
    
    const res = await postApihandler("/userLogin", data);

    if (res.status === 200) {
      localStorage.setItem("userData", JSON.stringify(res.data));
      swal(" Login Successfully");
      navigate("/");
    } else {
      swal("Error", res.message || res.error.response.data.message, "error");
    }
    console.log("login api response is ------->", res);
  };
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ********** mechanic login ************
  const mechanicLogin = async (e) => {
    e.preventDefault();

    const data = {
      user_Email: mechanicemail,
      password: mechanicpassword,
    };
    console.log("data is ---->", data);
    const res = await postApihandler("/mechanicLogin", data);
     console.log("login api response is ----->", res);
     if (res.status === 200) {
      localStorage.setItem("userData", JSON.stringify(res.data));
      localStorage.setItem("mechanic_Id", JSON.stringify(res.data._id));

      swal(" Login Successfully");
      navigate("/");
    } else {
      swal("Error", res.message || res.error.response.data.message, "error");
    }
  };

  return (
    <div>
      <Header />
      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <div className="signupimg">
              <img src={signupimg} alt="Mechanic" width="100%" />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    sx={{
                      "& .MuiTabs-indicator": { backgroundColor: "#E3641B" },
                    }}
                  >
                    <Tab label="User" value="1" style={{ color: "#E3641B" }} />
                    <Tab
                      label="Mechanic"
                      value="2"
                      style={{ color: "#E3641B" }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <h6 style={{ fontWeight: "600", textAlign: "center" }}>
                    User
                  </h6>

                  <form
                    component="form"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      textAlign: "center",
                    }}
                    onSubmit={userLogin}
                  >
                    <div>
                      <input
                        type="email"
                        label=""
                        placeholder="Email"
                        fullWidth
                        style={{
                          border: "1px solid #E3641B",
                          width: "272px",
                          height: "40px",
                          borderRadius: "10px",
                          padding: "10px",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginBottom: "20px",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}>
                    <div
      style={{
        
        width: "272px",
        display: "flex",
        
        border: "1px solid #E3641B",
        borderRadius: "10px",
        padding: "5px 10px",
        background: "#fff",
      }}
    >
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        style={{
          border: "none",
          outline: "none",
          width: "100%",
          height: "30px",
          fontSize: "14px",
          fontWeight: "500",
        }}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          cursor: "pointer",
          color: "#E3641B",
        }}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </span>
    </div>
    </div>
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: "#E3641B" }}
                      >
                        Login
                      </Button>
                    </div>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      sx={{
                        fontFamily: "Inter;",
                        fontSize: "14px;",
                        fontWeight: "500",
                        marginTop: "20px",
                      }}
                    >
                      Don’t have an account? <a href="/signup"> Sign up</a>
                    </Typography>
                  </form>
                </TabPanel>
                <TabPanel value="2">
                  <h6 style={{ fontWeight: "600", textAlign: "center" }}>
                    Mechanic
                  </h6>

                  <form
                    component="form"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      textAlign: "center",
                    }}
                    onSubmit={mechanicLogin}
                  >
                    <div>
                      <input
                        type="email"
                        label=""
                        placeholder="Mechanic Email"
                        fullWidth
                        style={{
                          border: "1px solid #E3641B",
                          width: "272px",
                          height: "40px",
                          borderRadius: "10px",
                          padding: "10px",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginBottom: "20px",
                        }}
                        onChange={(e) => setMechanicEmail(e.target.value)}
                        value={mechanicemail}
                      />
                    </div>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}>
                    <div
      style={{
        width: "272px",
        display: "flex",
        border: "1px solid #E3641B",
        borderRadius: "10px",
        padding: "5px 10px",
        background: "#fff",
      }}
    >
                      <input
                       type={showPassword ? "text" : "password"}
                        label=""
                        placeholder="Password"
                        fullWidth
                        style={{
                          border: "none",
                          outline: "none",
                          width: "100%",
                          height: "30px",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                        onChange={(e) => setMechanicPassword(e.target.value)}
                        value={mechanicpassword}
                      />
                      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          cursor: "pointer",
          color: "#E3641B",
        }}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </span>
                    </div>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: "#E3641B" }}
                      >
                        Login
                      </Button>
                    </div>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      sx={{
                        fontFamily: "Inter;",
                        fontSize: "14px;",
                        fontWeight: "500",
                        marginTop: "20px",
                      }}
                    >
                      Don’t have an account? <a href="/signup"> Sign up</a>
                    </Typography>
                  </form>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
}
