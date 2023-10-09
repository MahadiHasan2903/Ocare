import { Box, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  console.log("User Data:", user);

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontWeight: "bold",
      }}
    >
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            color: "#1565C0",
            fontSize: "25px",
          }}
        >
          Go to Login Page
        </Box>
      </Link>
    </Container>
  );
};

export default HomePage;
