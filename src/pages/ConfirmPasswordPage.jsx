import React, { useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  Box,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../assets/login-bg.png";
import logo from "../assets/logo.png";
import { AiOutlineCopyright } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios.js";
import { useAuth } from "../context/AuthContext";

const ConfirmPasswordPage = () => {
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userData } = useAuth();
  const year = new Date().getFullYear();

  // Extract user data
  const country_code = userData?.country_code;
  const phone_number = userData?.phone_number;

  console.log(country_code);
  console.log(phone_number);

  // Function to obscure part of the phone number for privacy
  const unRevealedPhoneNumber = (phone_number) => {
    const firstTwo = phone_number.slice(0, 2);
    const lastTwo = phone_number.slice(-2);
    const middleStars = "*".repeat(phone_number.length - 4);
    return firstTwo + middleStars + lastTwo;
  };

  // Function to handle the confirmation of password reset
  const handleConfirmPassword = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);

      // Send a request to confirm the password reset
      const response = await axios.post("/confirm-forget-password-otp", {
        country_code,
        phone_number,
        otp,
        password,
        confirm_password: confirmPassword,
      });

      // Check if the password reset was successful
      if (response.data.success) {
        toast.success("Password Reset successful!");
        navigate("/login");
      } else {
        setError("Password Reset failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Password Reset failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
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
              backgroundPosition: "center ",
            }}
          ></Paper>
        </Grid>
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
                  New Password
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontSize: "18px" }}
                >
                  Enter the OTP verification code that was sent to{" "}
                  {unRevealedPhoneNumber(userData.phone_number)} and set a new
                  password.
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
                    <TextField
                      sx={{ width: "100%" }}
                      label="OTP"
                      type="text"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      sx={{ width: "100%" }}
                      label="Password"
                      type="text"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      sx={{ width: "100%", marginBottom: "25px" }}
                      label="Confirm Password"
                      type="text"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
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

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleConfirmPassword}
                    >
                      Confirm Password Reset
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
                <Link to="/" style={{ textDecoration: "none" }}>
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

export default ConfirmPasswordPage;
