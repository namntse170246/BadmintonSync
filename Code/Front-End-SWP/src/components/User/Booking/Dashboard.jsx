import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
  Button,
  Skeleton,
} from "@mui/material";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  GetAllBookingsByMemberID,
  GetbyCourtID,
  GetTimeShareById,
} from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllBookingsByMemberID(userInfo.id);
      const bookingsWithRealestate = await Promise.all(
        response.data.map(async (booking) => {
          const timeshare = await GetTimeShareById(booking.timeSlotId);
          const realestate = await GetbyCourtID(booking.subCourtId);
          return { ...booking, realestate, timeshare };
        })
      );
      setBookings(bookingsWithRealestate || []);
    } catch (err) {
      toast.error("Failed to fetch booking information");
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBookings = bookings.filter((booking) => {
    return (
      selectedStatusFilter === "all" ||
      booking.status.toString() === selectedStatusFilter
    );
  });

  const slicedBookings = filteredBookings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const statusTexts = {
    0: "Chờ thanh toán",
    1: "Đã xác nhận",
    2: "Đã hủy",
    3: "Đã check in",
    4: "Đã check out",
    5: "Đã check out",
  };

  const statusColors = {
    0: "orange",
    1: "green",
    2: "red",
    3: "green",
    4: "green",
    5: "green",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        {/* <Select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          style={{ marginTop: "30px", marginBottom: "20px" }}
        >
          <MenuItem value="all">Tất cả</MenuItem>
          {Object.keys(statusTexts).map((status) => (
            <MenuItem key={status} value={status}>
              {statusTexts[status]}
            </MenuItem>
          ))}
        </Select> */}

        <TableContainer component={Paper}>
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={650}
              height={300}
            />
          ) : (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    BookingID
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Court
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Sub Court
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    TimeSlot 
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedBookings.map((item) => (
                  <TableRow key={item.bookingId}>
                    <TableCell align="center">{item.bookingId}</TableCell>
                    <TableCell align="center">
                      {item.realestate ? item.realestate.data.courtName : ""}
                    </TableCell>
                    <TableCell align="center">
                      {item.realestate ? item.realestate.data.subCourtName : ""}
                    </TableCell>
                    <TableCell align="center">
                      {item.timeshare ? `${item.timeshare.startTime} - ${item.timeshare.endTime}` : ""}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: statusColors[item.status],
                        fontWeight: "bold",
                      }}
                    >
                      {statusTexts[item.status]}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        className="edit-btn"
                        onClick={() => navigate(`/user/checkout/${item.bookingId}`)}
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
