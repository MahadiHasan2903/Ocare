import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients } from "../redux/actions/patientAction";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const Scrolling = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patient.patients);
  const [visiblePatients, setVisiblePatients] = useState(5);
  const [loading, setLoading] = useState(false); // Track loading state
  const contentRef = useRef(null);
  const sentinelRef = useRef(null);

  const loadMorePatients = () => {
    setLoading(true); // Start loading
    if (visiblePatients + 5 <= patients.length) {
      setTimeout(() => {
        setVisiblePatients((prevVisiblePatients) => prevVisiblePatients + 5);
        setLoading(false); // Stop loading
      }, 1000);
    } else {
      setVisiblePatients(patients.length);
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    // Fetch initial patient data when the component mounts
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMorePatients();
        }
      },
      {
        root: contentRef.current,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading]);

  return (
    <Box
      sx={{
        maxHeight: "92vh",
        overflowY: "scroll",
        position: "relative",
      }}
      ref={contentRef}
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
                Phone Number:
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

      <Box ref={sentinelRef} style={{ height: "1px", width: "1px" }} />
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Scrolling;
