import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

const DashboardPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "300px",
          height: "100vh",
          backgroundColor: "#ffffff",
        }}
      >
        <Sidebar />
      </Box>
      <Box className=" w-full">
        <Box
          sx={{
            height: "8vh",
          }}
        >
          <Header />
        </Box>
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            height: "90vh",
            overflowY: "hidden",
          }}
        >
          <Dashboard />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
