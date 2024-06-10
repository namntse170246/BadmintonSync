import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  GetAllBookingsByMemberID,
  GetbyRealestateID,
  GetTimeShareById,
} from '../../API/APIConfigure';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [booking, setBooking] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooking = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllBookingsByMemberID(userInfo.id);
      const bookingsWithRealestate = await Promise.all(
        response.map(async (booking) => {
          const timeshare = await GetTimeShareById(booking.timeshareId);
          const realestate = await GetbyRealestateID(timeshare.realestateId);
          return { ...booking, realestate, timeshare };
        })
      );
      setBooking(bookingsWithRealestate || []);
    } catch (err) {
      toast.error('Lỗi lấy thông tin Booking');
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filtered = booking.filter((item) => {
    return selectedStatusFilter === 'all' || item.status.toString() === selectedStatusFilter;
  });

  const sliced = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const statusTexts = {
    1: 'Chờ thanh toán',
    2: 'Đã xác nhận',
    3: 'Đã hủy',
    4: 'Đã check in',
    5: 'Đã check out',
    6: 'Đã check out',
  };

  const statusColors = {
    1: 'orange',
    2: 'green',
    3: 'red',
    4: 'green',
    5: 'green',
    6: 'green',
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          style={{ marginTop: '30px', marginBottom: '20px' }}
        >
          <MenuItem value="all">Tất cả</MenuItem>
          {Object.keys(statusTexts).map((status) => (
            <MenuItem key={status} value={status}>
              {statusTexts[status]}
            </MenuItem>
          ))}
        </Select>

        <TableContainer component={Paper}>
          {isLoading ? (
            <Skeleton animation="wave" variant="rectangular" width={650} height={300} />
          ) : (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: '20px',
                    }}
                    align="center"
                  >
                    Realestes
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '20px',
                    }}
                    align="center"
                  >
                    Số Ngày
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '20px',
                    }}
                    align="center"
                  >
                    Giá
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '20px',
                    }}
                    align="center"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '20px',
                    }}
                    align="center"
                  >
                    Xem chi tiết
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sliced.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">{item.realestate.name}</TableCell>
                    <TableCell align="center">
                      {item.endDay && item.startDay
                        ? Math.max(
                            0,
                            Math.ceil(
                              (new Date(item.endDay) - new Date(item.startDay)) /
                                (1000 * 60 * 60 * 24)
                            )
                          )
                        : 'Invalid date'}
                    </TableCell>
                    <TableCell align="center">{item.amount.toLocaleString()}VNĐ</TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: statusColors[item.status],
                        fontWeight: 'bold',
                      }}
                    >
                      {statusTexts[item.status]}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        className="edit-btn"
                        onClick={() => navigate(`/user/checkout/${item.id}`)}
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
            count={filtered.length}
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
