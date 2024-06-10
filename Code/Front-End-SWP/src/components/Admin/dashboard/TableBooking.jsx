import { useEffect, useState } from 'react';
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
  Skeleton,
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { GetAllBookings, GetUserByID } from '../../API/APIConfigure';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        let response = await GetAllBookings();
        if (Array.isArray(response)) {
          // Filter bookings with status "2"
          response = response.filter((booking) => booking.status === '2');
          // Sort bookings by createdDay in descending order
          response.sort((a, b) => new Date(b.createdDay) - new Date(a.createdDay));
          // Take the first 10 bookings
          response = response.slice(0, 10);
        }
        setBookings(response);
        fetchUserDetails(response.map((booking) => booking.memberId));
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch bookings');
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

  const statusTexts = {
    2: 'Đã thanh toán',
  };

  const statusColors = {
    2: 'green',
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <div className="main">
          <TableContainer component={Paper} className="dashboard-container">
            <h2
              style={{
                textAlign: 'center',
                color: '#205295',
                fontSize: '40px',
                marginTop: '20px',
                marginBottom: '20px',
                fontWeight: 'bold',
              }}
            >
              Đơn hàng thanh toán gần nhất
            </h2>
            {isLoading ? (
              <Skeleton animation="wave" variant="rectangular" width={500} height={300} />
            ) : (
              <Table
                size="small"
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="staff-table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: '20px',
                        fontFamily: 'Arial, sans-serif',
                      }}
                      align="center"
                    >
                      Người dùng
                    </TableCell>

                    <TableCell
                      style={{
                        fontSize: '20px',
                        fontFamily: 'Arial, sans-serif',
                      }}
                      align="center"
                    >
                      Giá tiền
                    </TableCell>

                    <TableCell
                      style={{
                        fontSize: '20px',
                        fontFamily: 'Arial, sans-serif',
                      }}
                      align="center"
                    >
                      Ngày đặt
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: '20px',
                        fontFamily: 'Arial, sans-serif',
                      }}
                      align="center"
                    >
                      Trạng thái
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell style={{ fontSize: '15px' }} align="center">
                        {userDetails[booking.memberId] || booking.memberId}
                      </TableCell>

                      <TableCell style={{ fontSize: '13px' }} align="center">
                        {booking.amount.toLocaleString()}VNĐ
                      </TableCell>

                      <TableCell
                        style={{
                          fontSize: '13px',
                        }}
                        align="center"
                      >
                        {new Date(booking.startDay).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                        -
                        {new Date(booking.endDay).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontSize: '15px',
                          color: statusColors[booking.status],
                          fontWeight: 'bold',
                        }}
                      >
                        {statusTexts[booking.status]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <Button
              onClick={() => navigate(`/admin/booking`)}
              variant="contained"
              color="primary"
              style={{ width: 'inherit' }}
              sx={{ mt: 1 }}
            >
              Xem thêm
            </Button>
          </TableContainer>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
