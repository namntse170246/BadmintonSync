import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GetAllBookings, GetUserByID, UpdateBookingStatus } from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await GetAllBookings();
        setBookings(Array.isArray(response.data) ? response.data : []);
        fetchUserDetails(response.data.map((booking) => booking.userId));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch bookings");
      }
      setIsLoading(false);
    };
    fetchBookings();
  }, []);

  const fetchUserDetails = async (userIds) => {
    setIsLoading(true);
    const userDetailsMap = { ...userDetails };

    for (const id of userIds) {
      if (!userDetailsMap[id]) {
        try {
          const response = await GetUserByID(id);
          if (response.data && response.data.fullName) {
            userDetailsMap[id] = response.data.fullName;
          } else {
            console.error(`User with id ${id} does not have a username`);
          }
        } catch (err) {
          console.error(err);
          toast.error(`Failed to fetch user details for userId: ${id}`);
        }
      }
    }

    setUserDetails(userDetailsMap);
    setIsLoading(false);
  };

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (selectedStatusFilter === "all") {
      return true; // Show all bookings
    } else {
      return booking.status === parseInt(selectedStatusFilter);
    }
  });

  const slicedBookings = filteredBookings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const statusTexts = {
    0: "Pending",
    1: "Confirmed",
    2: "Cancelled",
  };

  const statusColors = {
    0: "orange",
    1: "green",
    2: "red",
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await UpdateBookingStatus(bookingId, newStatus);
      if (response.success) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.bookingId === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
        toast.success("Status updated Successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <h2
          style={{
            textAlign: "center",
            color: "#205295",
            fontSize: "40px",
            marginTop: "20px",
            marginBottom: "20px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          Booking
        </h2>
        <Select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          style={{ marginBottom: "20px" }}
        >
          <MenuItem value="all">All</MenuItem>
          {Object.keys(statusTexts).map((key) => (
            <MenuItem key={key} value={key}>
              {statusTexts[key]}
            </MenuItem>
          ))}
        </Select>
        <TableContainer component={Paper} className="dashboard-container">
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="staff-table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }} align="center">
                  Name
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }} align="center">
                  Amount
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }} align="center">
                  SubCourtId
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }} align="center">
                  BookingID
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }} align="center">
                  Status
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedBookings.map((booking) => (
                <TableRow key={booking.bookingId}>
                  <TableCell style={{ fontSize: "13px" }} align="center">
                    {userDetails[booking.userId] || booking.userId}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }} align="center">
                    {booking.amount.toLocaleString()} VND
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }} align="center">
                    {booking.subCourtId}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }} align="center">
                    {new Date(booking.bookingDate).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px", color: statusColors[booking.status], fontWeight: "bold" }} align="center">
                    {statusTexts[booking.status]}
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="success" className="edit-btn" onClick={() => navigate(`/admin/booking/details/${booking.bookingId}`)}>
                      <VisibilityIcon sx={{ fontSize: 25 }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredBookings.length}
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

export default Dashboard;
