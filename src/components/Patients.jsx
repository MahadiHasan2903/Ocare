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
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../redux/actions/patientAction";

const Patients = () => {
  // Local state to manage pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get the patients data from Redux store
  const patients = useSelector((state) => state.patient.patients);
  const dispatch = useDispatch();

  // Fetch patients data from the server when the component mounts
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  // Handle page change in the table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change in the table
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(patients.length / rowsPerPage);

  // Display patients in the table rows
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

  return (
    <Box
      sx={{
        margin: "10px",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          fontSize: "30px",
          marginBottom: "10px",
        }}
      >
        Patient List
      </Box>
      <Box sx={{ paddingX: "15px" }}>
        <TableContainer
          component={Paper}
          sx={{
            marginRight: "5px",
            maxHeight: rowsPerPage > 10 ? "75vh" : "none",
            overflowY: rowsPerPage > 10 ? "scroll" : "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ typography: "body1" }}>Name</TableCell>
                <TableCell sx={{ typography: "body1" }}>Phone No</TableCell>
                <TableCell sx={{ typography: "body1" }}>Gender</TableCell>
                <TableCell sx={{ typography: "body1" }}>Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{displayPatients}</TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            count={patients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Typography
            sx={{
              paddingRight: "30px",
            }}
          >
            Page {page + 1} of {totalPages}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Patients;
