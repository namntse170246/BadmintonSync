import React, { useState, useEffect } from "react";
import { CheckIn, UpdateCheckIn, GetAllAccounts } from "../../API/APIConfigure";
import {
  Box,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const CheckInComponent = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchCheckIns();
    fetchAccounts();
  }, []);

  const fetchCheckIns = async () => {
    try {
      const response = await CheckIn();
      setCheckIns(response.data);
    } catch (error) {
      console.error("Error fetching check-ins:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await GetAllAccounts();
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const updateCheckInStatus = async (checkInId) => {
    try {
      await UpdateCheckIn(checkInId);
      fetchCheckIns();
    } catch (error) {
      console.error("Error updating check-in status:", error);
    }
  };

  const getUserName = (userId) => {
    const user = accounts.find((account) => account.UserID === userId);
    return user ? user.UserName : "Unknown";
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const statusTexts = {
    false: "Not Checked",
    true: "Checked",
  };

  const statusColors = {
    false: "red",
    true: "green",
  };

  const filteredCheckIns =
    selectedStatusFilter === "all"
      ? checkIns
      : checkIns.filter(
          (checkIn) => String(checkIn.CheckInStatus) === selectedStatusFilter
        );

  const slicedCheckIns = filteredCheckIns.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Typography
          variant="h2"
          align="center"
          color="#205295"
          sx={{
            fontSize: 40,
            mt: 2,
            mb: 2,
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          Check In
        </Typography>
        <Select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="true">Checked</MenuItem>
          <MenuItem value="false">Not Checked</MenuItem>
        </Select>
        <TableContainer component={Paper} className="dashboard-container">
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="staff-table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  CheckIn ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  SubCourt ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  Booking ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  CheckIn Time
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  User Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  Checked
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedCheckIns.map((checkIn) => (
                <TableRow key={checkIn.checkInId}>
                  <TableCell align="center" sx={{ fontSize: 13 }}>
                    {checkIn.checkInId}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 13 }}>
                    {checkIn.subCourtId}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 13 }}>
                    {checkIn.bookingId}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 13 }}>
                    {checkIn.checkInTime}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: 15,
                      color: statusColors[checkIn.checkInStatus],
                      fontWeight: "bold",
                    }}
                  >
                    {statusTexts[checkIn.checkInStatus]}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 13 }}>
                    {getUserName(checkIn.userId)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="success"
                      className="edit-btn"
                      onClick={() => updateCheckInStatus(checkIn.checkInId)}
                    >
                      <CheckIcon sx={{ fontSize: 25 }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCheckIns.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CheckInComponent;
