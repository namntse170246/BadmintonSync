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
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GetAllBookings, GetUserByID } from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchBookings = async () => {
      try {
        const response = await GetAllBookings();
        setBookings(Array.isArray(response) ? response : []);
        fetchUserDetails(response.map((booking) => booking.memberId));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch bookings");
      }
    };
    setIsLoading(false);
    fetchBookings();
  }, []);

  const fetchUserDetails = async (memberIds) => {
    setIsLoading(true);
    memberIds.forEach(async (id) => {
      if (!userDetails[id]) {
        try {
          const response = await GetUserByID(id);
          if (response && response.username) {
            setUserDetails((prevDetails) => ({
              ...prevDetails,
              [id]: response.username,
            }));
          } else {
            console.error(`User with id ${id} does not have a username`);
          }
        } catch (err) {
          console.error(err);
          toast.error(`Failed to fetch user details for memberId: ${id}`);
        }
      }
    });
    setIsLoading(false);
  };

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBookings = bookings.filter((booking) => {
    const userName = userDetails[booking.memberId] || "";
    return (
      !searchTerm || userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const slicedBookings = filteredBookings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const statusTexts = {
    1: "Chờ thanh toán",
    2: "Đã xác nhận",
    3: "Đã hủy",
    4: "Đã check in",
    5: "Đã check out",
    6: "Đã check out",
  };

  const statusColors = {
    1: "orange",
    2: "green",
    3: "red",
    4: "green",
    5: "green",
    6: "green",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <div className="main">
          <TextField
            label="Tên tài khoản"
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
                      Người dùng
                    </TableCell>

                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      align="center"
                    >
                      Tiền cọc
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      align="center"
                    >
                      Số người
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      align="center"
                    >
                      Ngày đặt
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      align="center"
                    >
                      Trạng thái
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      align="center"
                    >
                      Hành Động
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slicedBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {userDetails[booking.memberId] || booking.memberId}
                      </TableCell>

                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {booking.amount.toLocaleString()}VNĐ
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {booking.adult}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "13px",
                        }}
                        align="center"
                      >
                        {new Date(booking.startDay).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                        -
                        {new Date(booking.endDay).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontSize: "15px",
                          color: statusColors[booking.status],
                          fontWeight: "bold",
                        }}
                      >
                        {statusTexts[booking.status]}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="success"
                          className="edit-btn"
                          onClick={() =>
                            navigate(`/admin/booking/details/${booking.id}`)
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
