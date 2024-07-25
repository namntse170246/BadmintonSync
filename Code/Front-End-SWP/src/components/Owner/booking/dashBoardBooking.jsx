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
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  GetAllBookings,
  GetUserByID,
  GetbySubCourtID
} from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [subCourtDetails, setSubCourtDetails] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await GetAllBookings();
        console.log(response.data);
        const bookingsData = Array.isArray(response.data) ? response.data : [];
        setBookings(bookingsData);

        const userIds = bookingsData.map((booking) => booking.userId);
        fetchUserDetails(userIds);

        const subCourtIds = Array.from(new Set(bookingsData.map((booking) => booking.subCourtId)));
        fetchSubCourtDetails(subCourtIds);

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

  const fetchSubCourtDetails = async (subCourtIds) => {
    const subCourtDetailsMap = { ...subCourtDetails };

    for (const id of subCourtIds) {
      if (!subCourtDetailsMap[id]) {
        try {
          const response = await GetbySubCourtID(id);
          if (response.data && response.data.name) {
            subCourtDetailsMap[id] = response.data.name;
          } else {
            console.error(`Sub-court with id ${id} does not have a name`);
          }
        } catch (err) {
          console.error(err);
          toast.error(`Failed to fetch sub-court details for subCourtId: ${id}`);
        }
      }
    }

    setSubCourtDetails(subCourtDetailsMap);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (selectedStatusFilter === "all") {
      return true; 
    } else {
      return booking.status === parseInt(selectedStatusFilter);
    }
  });

  const slicedBookings = filteredBookings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const statusTexts = {
    0: "Đang chờ",
    1: "Đã thanh toán",
    2: "Đã hủy",
    3: "Check-in",
    4: "Checked"
  };

  const statusColors = {
    0: "orange",
    1: "green",
    2: "red",
    3: "green",
    4: "green"
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
          Đặt sân
        </h2>
        <Select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          style={{ marginBottom: "20px" }}
        >
          <MenuItem value="all">Tất cả</MenuItem>
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
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }}>
                  BookingID
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }}>
                  Người dùng
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }}>
                  Sân nhỏ
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }}>
                  Ngày đặt
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }}>
                  Số tiền
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }}>
                  Trạng thái
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedBookings.map((booking) => (
                <TableRow key={booking.bookingId}>
                  <TableCell style={{ fontSize: "13px" }} >
                    {booking.bookingId}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }} >
                    {userDetails[booking.userId] || booking.userId}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }} >
                    {subCourtDetails[booking.subCourtId] || booking.subCourtId}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }} >
                    {new Date(booking.bookingDate).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }} >
                    {booking.amount.toLocaleString()} VND
                  </TableCell>
                  <TableCell style={{ fontSize: "15px", color: statusColors[booking.status], fontWeight: "bold" }} >
                    {statusTexts[booking.status]}
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
