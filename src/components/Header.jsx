import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  const user = useSelector((state) => state.user.user);

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
          height: "40px",
          backgroundColor: "#f9f9f9",
          marginTop: "-7px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            marginTop: "5px",
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
          alignItems: "center",
          marginTop: "-10px",
        }}
      >
        {user && (
          <>
            <Box className="hidden 800px:block">
              {user.user_details.profile.name}
            </Box>
            <img
              src={user.user_details.profile.profile_avatar.url}
              alt="avatar"
              style={{
                width: "40px",
                height: "40px",
                marginLeft: "20px",
              }}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
