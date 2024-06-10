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
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GetAllRealestatesByMemberID, GetUserByID } from '../../API/APIConfigure';
import { useNavigate } from 'react-router-dom';
import CreateReal from './CreateReal';
import CreateTimeShare from '../Timeshare/CreateTimeShare';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [realestates, setRealestates] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [selectedRealestateId, setSelectedRealestateId] = useState(null);
  const [userData, setUserData] = useState([]);
  const fetchRealestates = async () => {
    try {
      const response = await GetAllRealestatesByMemberID(userInfo.id);
      setRealestates(response || []);
    } catch (err) {
      toast.error('Failed to fetch Realestates');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRealestates();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await GetUserByID(userInfo.id);
      setUserData(response || []);
    } catch (err) {
      toast.error('Failed to fetch Realestates');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filtered = realestates.filter((item) => {
    return selectedStatusFilter === 'all' || item.status.toString() === selectedStatusFilter;
  });

  const slicedFeedback = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const statusTexts = {
    1: 'Chờ xác nhận',
    2: 'Đã xác nhận',
    3: 'Tạm dừng',
    4: 'Vô hiệu hóa',
    5: 'Từ chối',
  };

  const statusColors = {
    1: 'orange',
    2: 'green',
    3: 'gray',
    4: 'red',
    5: 'red',
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '30px',
            marginBottom: '20px',
            justifyContent: 'space-between',
          }}
        >
          <Select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            {Object.keys(statusTexts).map((status) => (
              <MenuItem key={status} value={status}>
                {statusTexts[status]}
              </MenuItem>
            ))}
          </Select>
          <CreateReal Premium={userData.isPremium} onCreateSuccess={fetchRealestates} />
        </Box>
        <TableContainer component={Paper}>
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
                  Địa điểm
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
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedFeedback.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.location}</TableCell>
                  <TableCell align="center">{item.price}</TableCell>
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
                      onClick={() => navigate(`/hotels/${item.id}`)}
                    >
                      <VisibilityIcon sx={{ fontSize: 25 }} />
                    </Button>
                    <CreateTimeShare realestateId={item.id} priceReal={item.price}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
