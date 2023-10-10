import React, { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { LuCircle } from "react-icons/lu";
import { BiSolidDashboard } from "react-icons/bi";
import { BsReverseListColumnsReverse } from "react-icons/bs";

import { FaPrescription } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { resetUser } from "../redux/actions/userAction";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    dispatch(resetUser());
    logout();
    navigate("/login");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    // Get the current route pathname from the window location
    const currentPathname = window.location.pathname;

    // Update the activeLink state based on the current pathname
    if (currentPathname === "/dashboard") {
      setActiveLink("dashboard");
    } else if (currentPathname === "/create-prescription") {
      setActiveLink("prescription");
    } else if (currentPathname === "/patients") {
      setActiveLink("patients");
    } else if (currentPathname === "/support") {
      setActiveLink("support");
    } else if (currentPathname === "/settings") {
      setActiveLink("settings");
    }
  }, []);

  return (
    <Box className="h-[100%] border-r border-[#75757]">
      <Box
        sx={{
          padding: "15px",
        }}
      >
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
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
                onClick={() => handleLinkClick("dashboard")}
                sx={{
                  display: "flex",
                  fontSize: "15px",
                  width: "80%",
                  marginY: "20px",
                  paddingY: "7px",
                  paddingX: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor:
                    activeLink === "dashboard" ? "#54b1f0" : "#fff",
                  color: activeLink === "dashboard" ? "#fff" : "#000",
                }}
              >
                <BiSolidDashboard className="mr-2 mt-[5px]" /> Dashboard
              </Box>
            </Link>

            <Link to="/create-prescription">
              <Box
                onClick={() => handleLinkClick("prescription")}
                sx={{
                  display: "flex",
                  fontSize: "15px",
                  width: "80%",
                  marginY: "20px",
                  paddingX: "10px",
                  paddingY: "7px",
                  borderRadius: "5px",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor:
                    activeLink === "prescription" ? "#54b1f0" : "#fff",
                  color: activeLink === "prescription" ? "#fff" : "#000",
                }}
              >
                <FaPrescription className="mr-2 mt-[5px]" /> Create Prescription
              </Box>
            </Link>
            <Link to="/patients">
              <Box
                onClick={() => handleLinkClick("patients")}
                sx={{
                  display: "flex",
                  fontSize: "15px",
                  width: "80%",
                  marginY: "20px",
                  paddingY: "7px",
                  paddingX: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor:
                    activeLink === "patients" ? "#54b1f0" : "#fff",
                  color: activeLink === "patients" ? "#fff" : "#000",
                }}
              >
                <BsReverseListColumnsReverse className="mr-2 mt-[5px]" />{" "}
                Patient List
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
            <Link to="/support">
              <Box
                onClick={() => handleLinkClick("support")}
                sx={{
                  display: "flex",
                  fontSize: "15px",
                  width: "80%",
                  marginY: "20px",
                  paddingY: "7px",
                  paddingX: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor:
                    activeLink === "support" ? "#54b1f0" : "#fff",
                  color: activeLink === "support" ? "#fff" : "#000",
                }}
              >
                <LuCircle className="mr-[5px] mt-[5px]" />
                Support
              </Box>
            </Link>

            <Link to="/settings">
              <Box
                onClick={() => handleLinkClick("settings")}
                sx={{
                  display: "flex",
                  fontSize: "15px",
                  width: "80%",
                  marginY: "20px",
                  paddingY: "7px",
                  paddingX: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor:
                    activeLink === "settings" ? "#54b1f0" : "#fff",
                  color: activeLink === "settings" ? "#fff" : "#000",
                }}
              >
                <LuCircle className="mr-[5px] mt-[5px]" />
                Setting
              </Box>
            </Link>
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
                marginLeft: "40px",
                cursor: "pointer",
              }}
              onClick={handleLogout}
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
