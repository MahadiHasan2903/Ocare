import React, { useState } from "react";
import { Grid, Paper, Button, Typography, TextField, Box } from "@mui/material";
import { AiOutlineCopyright } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../axios.js";
import backgroundImage from "../assets/login-bg.png";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { setUser } from "../redux/actions/userAction.js";

const VerifyPage = () => {
  //getting the currecnt year
  const year = new Date().getFullYear();

  // State variables for user input and error handling
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState("");

  const country_code = userData?.country_code;

  const phone_number = userData?.phone_number;

  // Function to obscure part of the phone number for privacy
  const unRevealedPhoneNumber = (phone_number) => {
    const firstTwo = phone_number.slice(0, 2);
    const lastTwo = phone_number.slice(-2);
    const middleStars = "*".repeat(phone_number.length - 4);
    return firstTwo + middleStars + lastTwo;
  };

  // Handle verify button click
  const handleVerifyClick = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to verify OTP
      const response = await axios.post("/login", {
        otp: otp,
        country_code,
        phone_number,
      });

      // Checking if the login was successful or not
      if (response.data.success) {
        // Dispatch the setUser action to store user details in Redux
        dispatch(setUser(response.data.data));
        toast.success("Login successful!");
        navigate("/dashboard"); // Redirect to the home page on success
      } else {
        setError("OTP request failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };
  const handleResendClick = async () => {
    try {
      // Make an HTTP POST request to resend OTP
      const response = await axios.post("/resend-login-otp", {
        country_code,
        phone_number,
      });

      if (response.data.success) {
        toast.success("OTP resend successful!");
      } else {
        setError("OTP resend request failed. Please try again later.");
      }
    } catch (err) {
      setError("OTP resend request failed. Please try again later.");
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

        {/* Right Side: Verify Form */}
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
                  maxWidth: "350px",
                  boxShadow: "none",
                  background: "transparent",
                  border: "none",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }} variant="h4">
                  Verify
                </Typography>
                {userData && (
                  <Box sx={{ fontWeight: "bold" }} variant="body2">
                    Enter the OTP verification code that was sent to{" "}
                    {unRevealedPhoneNumber(userData.phone_number)}
                  </Box>
                )}
              </Paper>
              <Paper
                sx={{
                  padding: "20px",
                  maxWidth: "400px",
                  boxShadow: "none",
                  background: "transparent",
                  border: "none",
                }}
              >
                {/* OTP input */}
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {error && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ marginBottom: "1rem" }}
                  >
                    {error}
                  </Typography>
                )}
                {/* Verify button */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleVerifyClick}
                >
                  Verify
                </Button>
                {/* Resend OTP link */}
                <Typography
                  sx={{
                    marginTop: "1rem",
                    textAlign: "center",
                  }}
                  variant="body2"
                >
                  Don&apos;t receive your code ?{" "}
                  <span
                    style={{ cursor: "pointer", color: "#1565C0" }}
                    onClick={handleResendClick}
                  >
                    Resend
                  </span>
                </Typography>
              </Paper>
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
                <Link to="/" style={{ textDecoration: "none" }}>
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

export default VerifyPage;
