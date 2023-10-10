import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "../axios";
import { useSelector } from "react-redux";

const Patients = () => {
  // Get user data from Redux store
  const user = useSelector((state) => state.user.user);

  // Initialize state variables
  const [patients, setPatients] = useState([]); // To store patient data
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page

  // Fetch patient data from the server when the user changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = user?.access_token;
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch patient data using Axios
        const response = await axios.get("/doctor-panel/patient/list", {
          headers,
        });
        console.log(response.data.data);
        setPatients(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData when the "user" dependency changes
    fetchData();
  }, [user]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when the number of rows per page changes
  };

  // Render the list of patients with appropriate pagination
  const displayPatients = Array.isArray(patients)
    ? patients
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>{patient.profile.name}</TableCell>
            <TableCell>
              {`${patient.country_code} ${patient.phone_number}`}
            </TableCell>
            <TableCell>{patient.profile.gender}</TableCell>
            <TableCell>{patient.is_active ? "Active" : "Inactive"}</TableCell>
          </TableRow>
        ))
    : null;

  // Render the component
  return (
    <Box
      sx={{
        marginTop: "30px",
      }}
    >
      <Box className="text-center text-3xl">Patient List</Box>
      <Box style={{ padding: "15px" }}>
        <TableContainer
          className="overflow-y-scroll"
          component={Paper}
          sx={{
            marginRight: "5px",
          }}
        >
          <Table sx={{}}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Phone No</b>
                </TableCell>
                <TableCell>
                  <b>Gender</b>
                </TableCell>
                <TableCell>
                  <b>Availability</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{displayPatients}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default Patients;
