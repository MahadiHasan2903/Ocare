import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients } from "../redux/actions/patientAction";
import { Box, Card, CardContent, Typography } from "@mui/material";

const Scrolling = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patient.patients);
  const [visiblePatients, setVisiblePatients] = useState(5);
  const contentRef = useRef(null); // Create a ref to the scrollable content

  // This function handles the scroll event and checks if we have reached the bottom of the content
  const handleScroll = () => {
    if (
      contentRef.current &&
      contentRef.current.scrollTop + contentRef.current.clientHeight >=
        contentRef.current.scrollHeight
    ) {
      loadMorePatients(); // If we're at the bottom, load more patients
    }
  };

  // Load more patients into the view
  const loadMorePatients = () => {
    if (visiblePatients < patients.length) {
      setVisiblePatients((prevVisiblePatients) => prevVisiblePatients + 5);
    }
  };

  useEffect(() => {
    // Fetch initial patient data when the component mounts
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    contentRef.current.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        maxHeight: "92vh",
        overflowY: "scroll",
      }}
      ref={contentRef} // Attach the ref to the scrollable content
    >
      <Typography
        variant="h3"
        component="div"
        sx={{
          textAlign: "center",
          marginY: "15px",
        }}
      >
        Patients
      </Typography>

      <Box>
        {patients.slice(0, visiblePatients).map((patient, index) => (
          <Card
            key={patient.id}
            sx={{
              margin: "10px",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                Name: {patient.profile.name}
              </Typography>
              <Typography variant="body2">
                Phone Number:{" "}
                {`${patient.country_code} ${patient.phone_number}`}
              </Typography>
              <Typography variant="body2">
                Gender: {patient.profile.gender}
              </Typography>
              <Typography variant="body2">
                Availability: {patient.is_active ? "Active" : "Inactive"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Scrolling;
