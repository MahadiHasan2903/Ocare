import React, { useState } from "react";
import {
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
  CircularProgress,
} from "@mui/material";
import { AiOutlineCopyright } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { countries } from "../utils/countryCode";
import axios from "../axios.js";
import { useAuth } from "../context/AuthContext";
import backgroundImage from "../assets/login-bg.png";
import logo from "../assets/logo.png";

const ResetPasswordPage = () => {
  // State variables for user input and error handling
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { resetOTPRequest } = useAuth();
  const year = new Date().getFullYear();
  const [loading, setLoading] = useState(false);

  // Function to handle the password reset request
  const handleReset = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Create an object with the reset request data
      const resetRequestData = {
        country_code: selectedCountry,
        phone_number: phoneNumber,
      };

      // Send OTP request to the server
      const response = await axios.post(
        "/forget-password-otp",
        resetRequestData
      );

      if (response.status === 200) {
        // If successful, store the reset request data in the context
        resetOTPRequest(resetRequestData);

        // Redirect to the Confirm Password Page
        navigate("/confirm-password");
      } else {
        setError("OTP request failed. Please check your credentials.");
      }
    } catch (err) {
      setError("OTP request failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Render the component
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        {/* Left Side: Background Image */}
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              width: "100%",
              height: "100vh",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center ",
            }}
          ></Paper>
        </Grid>

        {/* Right Side: Reset Password Form */}
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
                  Request Password Reset
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Send a request for a password reset.
                </Typography>
              </Paper>

              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <FormControl>
                  <Paper
                    sx={{
                      padding: "20px",
                      maxWidth: "800px",
                      boxShadow: "none",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    {/* User input fields */}
                    <Box sx={{ display: "flex", width: "400px" }}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        sx={{ width: "25%", marginRight: "10px" }}
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
                        required
                        sx={{ width: "75%" }}
                        label="Phone Number"
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>

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

                    {/* Reset button */}
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleReset}
                    >
                      Request Password Reset
                    </Button>

                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          color: "#1565C0",
                          marginLeft: "5px",
                          marginTop: "10px",
                          textAlign: "center",
                          fontSize: "14px",
                        }}
                      >
                        Back to Login
                      </Typography>
                    </Link>
                  </Paper>
                </FormControl>
              )}
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
                  display: "flex",
                }}
              >
                <AiOutlineCopyright
                  style={{ marginTop: "5px", marginRight: "5px" }}
                />
                {year} oCare Web Portal |
                <Link style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      color: "#1565C0",
                      marginLeft: "5px",
                      marginTop: "2px",
                    }}
                  >
                    Privacy & Policy
                  </Typography>
                </Link>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResetPasswordPage;
