import React, { useState } from "react";
import {
  // Importing Material-UI components
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  Hidden,
  InputLabel,
} from "@mui/material";

// Importing images and icons
import backgroundImage from "../assets/login-bg.png";
import logo from "../assets/logo.png";
import { AiOutlineCopyright } from "react-icons/ai";

// Importing routing and data
import { Link, useNavigate } from "react-router-dom";
import { countries } from "../utils/countryCode";
import axios from "../axios.js";

// Importing authentication context
import { useAuth } from "../context/AuthContext";

// Define the LoginPage component
const LoginPage = () => {
  // State variables for user input and error handling
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const year = new Date().getFullYear();

  // Handle login button click
  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      // Create an object with the login data
      const loginData = {
        country_code: selectedCountry,
        phone_number: phoneNumber,
        password,
        role: "doctor",
      };

      // Send OTP request to the server
      const response = await axios.post("/login-request-otp", loginData);

      // Check if the OTP request was successful
      if (response.status === 200) {
        // If successful, store the login data in the context
        login(loginData);

        // Redirect to VerifyPage
        navigate("/verify");
      } else {
        setError("OTP request failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Left Side: Background Image */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              width: "100%",
              height: "100vh",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center bottom",
            }}
          ></Paper>
        </Grid>

        {/* Right Side: Login Form */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ height: "100vh", display: "flex", justifyContent: "center" }}
        >
          <Grid
            item
            sm={6}
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Paper
              sx={{
                padding: "20px",
                maxWidth: "400px",
                boxShadow: "none",
                background: "transparent",
                border: "none",
              }}
            >
              <img src={logo} alt="logo" />
            </Paper>
            <Grid>
              <Paper
                sx={{
                  padding: "20px",
                  maxWidth: "400px",
                  boxShadow: "none",
                  background: "transparent",
                  border: "none",
                }}
              >
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="h4"
                  gutterBottom
                >
                  Login
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Login to oCare doctor panel
                </Typography>
              </Paper>

              <FormControl>
                <Paper
                  sx={{
                    padding: "20px",
                    maxWidth: "600px",
                    boxShadow: "none",
                    background: "transparent",
                    border: "none",
                  }}
                >
                  {/* User input fields */}
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      sx={{ width: "30%", marginRight: "10px" }}
                    >
                      <Hidden lgDown>
                        <InputLabel id="country-select-label">
                          Select
                        </InputLabel>
                      </Hidden>
                      <Select
                        labelId="country-select-label"
                        id="country-select"
                        label="Select"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        {countries.map((option) => (
                          <MenuItem key={option.code} value={option.iso}>
                            {option.iso}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Phone number input */}
                    <TextField
                      sx={{ width: "70%" }}
                      label="Phone Number"
                      type="number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Box>

                  {/* Password input */}
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* Error message */}
                  {error && (
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ marginBottom: "1rem" }}
                    >
                      {error}
                    </Typography>
                  )}

                  {/* Login button */}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                </Paper>
              </FormControl>
            </Grid>
            <Box sx={{ textAlign: "center" }}>
              {/* Footer information */}
              <Paper
                sx={{
                  padding: "20px",
                  maxWidth: "400px",
                  boxShadow: "none",
                  background: "transparent",
                  border: "none",
                }}
              >
                <AiOutlineCopyright /> {year} oCare Web Portal |{" "}
                {/* Link to Privacy & Policy */}
                <Link style={{ textDecoration: "none" }}>
                  <span style={{ color: "#1565C0" }}>Privacy & Policy</span>
                </Link>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
