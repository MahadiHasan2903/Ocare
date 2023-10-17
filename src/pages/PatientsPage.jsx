import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Patients from "../components/Patients";

const PatientsPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "300px",
          height: "100vh",
          backgroundColor: "#ffffff",
          overflow: "hidden",
        }}
      >
        <Sidebar />
      </Box>
      <Box className=" w-full">
        <Box
          sx={{
            height: "8vh",
            overflow: "hidden",
          }}
        >
          <Header />
        </Box>
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            height: "92vh",
            overflowY: "hidden",
            paddingBottom: "10px",
          }}
        >
          <Patients />
        </Box>
      </Box>
    </Box>
  );
};

export default PatientsPage;
