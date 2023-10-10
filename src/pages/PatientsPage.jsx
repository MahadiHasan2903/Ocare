import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Support from "../components/Support";
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
          height: "102vh",
          backgroundColor: "#ffffff",
        }}
      >
        <Sidebar />
      </Box>
      <Box className=" w-full">
        <Box
          sx={{
            height: "7vh",
          }}
        >
          <Header />
        </Box>
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            height: "90vh",
          }}
        >
          <Patients />
        </Box>
      </Box>
    </Box>
  );
};

export default PatientsPage;
