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
  TextField,
  Skeleton,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  GetAllBookings,
  GetUserByID,
  UpdateBookingStatus,
} from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
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
          if (response.data && response.data.userName) {
            userDetailsMap[id] = response.data.userName;
          } else {
            console.error(`User with id ${id} does not have a username`);
          }
        } catch (err) {
          console.error(err);
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
    const userName = userDetails[booking.userId] || "";
    return (
      !searchTerm || userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const slicedBookings = filteredBookings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const statusTexts = {
    0: "Pending",
    1: "Confirmed",
    2: "Cancelled",
    3: "Checked In",
    4: "Checked Out",
  };

  const statusColors = {
    0: "orange",
    1: "green",
    2: "red",
    3: "blue",
    4: "purple",
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
        toast.success("Status updated Successful");
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
        <div className="main">
          <TextField
            label="Username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: "30px", marginLeft: "20px" }}
          />
          <TableContainer component={Paper} className="dashboard-container">
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
            {isLoading ? (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={500}
                height={300}
              />
            ) : (
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="staff-table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      align="center"
                    >
                      Username
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      align="center"
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      align="center"
                    >
                      SubCourtId
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      align="center"
                    >
                      BookingID
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      align="center"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      align="center"
                    >
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
                      <TableCell
                        style={{
                          fontSize: "13px",
                        }}
                        align="center"
                      >
                        {new Date(booking.bookingDate).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontSize: "15px",
                          color: statusColors[booking.status],
                          fontWeight: "bold",
                        }}
                      >
                        <FormControl variant="outlined">
                          <Select
                            value={booking.status}
                            onChange={(e) =>
                              handleStatusChange(
                                booking.bookingId,
                                e.target.value
                              )
                            }
                            style={{ color: statusColors[booking.status] }}
                          >
                            {Object.keys(statusTexts).map((key) => (
                              <MenuItem key={key} value={parseInt(key)}>
                                {statusTexts[key]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="success"
                          className="edit-btn"
                          onClick={() =>
                            navigate(
                              `/admin/booking/details/${booking.bookingId}`
                            )
                          }
                        >
                          <VisibilityIcon sx={{ fontSize: 25 }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={bookings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
