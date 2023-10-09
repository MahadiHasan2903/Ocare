import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Box, Divider, Button } from "@mui/material";
import { LuCircle } from "react-icons/lu";
import { BiSolidDashboard } from "react-icons/bi";
import { FaPrescription } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [prescriptionClicked, setPrescriptionClicked] = useState(false);

  const handleDashboardClick = () => {
    setDashboardClicked(true);
    setPrescriptionClicked(false);
  };

  const handlePrescriptionClick = () => {
    setDashboardClicked(false);
    setPrescriptionClicked(true);
  };
  return (
    <Box className="border-r border-[#75757] ">
      <Box
        sx={{
          padding: "15px",
        }}
      >
        <img src={logo} alt="logo" />
      </Box>

      <Box
        sx={{
          height: "89vh",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            marginLeft: "15px",
          }}
        >
          <Box>
            <Link to="/dashboard">
              <Box
                sx={{
                  display: "flex",
                  fontSize: "15px",
                  width: "80%",
                  marginY: "20px",
                  paddingY: "7px",
                  paddingX: "10px",
                  borderRadius: "5px",
                  backgroundColor: dashboardClicked ? "#54b1f0" : "",
                  color: dashboardClicked ? "#ffffff" : "",
                  cursor: "pointer",
                }}
                onClick={handleDashboardClick}
              >
                <BiSolidDashboard className="mr-2 mt-[5px]" /> Dashboard
              </Box>
            </Link>

            <Link to="/dashboard">
              <Box
                sx={{
                  display: "flex",
                  fontSize: "15px",
                  width: "80%",
                  marginY: "20px",
                  paddingX: "10px",
                  paddingY: "7px",
                  borderRadius: "5px",
                  textAlign: "center",
                  backgroundColor: prescriptionClicked ? "#54b1f0" : "",
                  color: prescriptionClicked ? "#ffffff" : "",
                  cursor: "pointer",
                }}
                onClick={handlePrescriptionClick}
              >
                <FaPrescription className="mr-2 mt-[5px]" /> Create Prescription
              </Box>
            </Link>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              marginLeft: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginY: "30px",
              }}
            >
              <LuCircle className="mr-[5px] mt-[5px]" />
              <Link to="/support">Support</Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginBottom: "25px",
              }}
            >
              <LuCircle className="mr-[5px] mt-[5px]" />
              <Link to="/settings">Setting</Link>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                width: "90%",
                marginX: "8px",
              }}
            >
              <Divider />
            </Box>
            <Box
              sx={{
                display: "flex",
                marginY: "25px",
                marginLeft: "30px",
              }}
            >
              <LuCircle className="mr-[5px] mt-[5px]" />
              Logout
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
