import React from "react";
import { Box } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import doctor from "../assets/doctor.png";

const Header = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: "10px",
          width: "250px",
          height: "30px",
          marginBottom: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Box
          sx={{
            position: "absolute",
          }}
        >
          <button className="absolute">
            <AiOutlineSearch className="mt-1 ml-2" />
          </button>
          <input
            type="text"
            className="bg-transparent focus:outline-none ml-8"
            placeholder="Seach..."
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box>Major Gen. K. M. Omar Hasan</Box>
        <Box
          sx={{
            width: "40px",
            height: "40px",
            marginLeft: "20px",
          }}
        >
          <img src={doctor} alt="profile" />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
