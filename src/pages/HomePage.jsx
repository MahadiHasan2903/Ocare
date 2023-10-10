import React from "react";
import { Link } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
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
      {user && (
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              color: "#1565C0",
              fontSize: "25px",
              marginTop: "50px",
            }}
          >
            Go to Dashboard
          </Box>
        </Link>
      )}
    </Container>
  );
};

export default HomePage;
