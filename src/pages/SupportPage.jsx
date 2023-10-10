import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Support from "../components/Support";

const SupportPage = () => {
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
          <Support />
        </Box>
      </Box>
    </Box>
  );
};

export default SupportPage;
