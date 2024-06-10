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
import { GetAllTrade, GetTradeByMemberID, GetbyRealestateID } from '../../API/APIConfigure';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

const Dashboard = () => {
  const [trade, setTrade] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchRealestates = async () => {
    setIsLoading(true);

    try {
      const response = await GetTradeByMemberID(userInfo.id);
      const responseArray = Array.isArray(response) ? response : [response];
      console.log(responseArray);

      const tradeData = await Promise.all(
        responseArray.map(async (item) => {
          const name1 = await fetchNameById(item.timeshareId1);
          const name2 = await fetchNameById(item.timeshareId2);
          console.log('name1, name2:', name1, name2);
          return { ...item, name1, name2 };
        })
      );
      setTrade(tradeData);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRealestates();
  }, []);

  const fetchNameById = async (id) => {
    try {
      const response = await GetbyRealestateID(id);
      return response && response ? response.name : '';
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filtered = trade.filter((item) => {
    return selectedStatusFilter === 'all' || item.status.toString() === selectedStatusFilter;
  });

  const slicedFeedback = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const statusTexts = {
    1: 'Chờ xác nhận',
    2: 'Đã xác nhận',
    3: 'Hủy',
  };

  const statusColors = {
    1: 'orange',
    2: 'green',
    3: 'red',
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
        </Box>
        {isLoading ? (
          <Skeleton animation="wave" variant="rectangular" width={650} height={300} />
        ) : (
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
                    Địa điểm
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
                    Trạng thái
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
                  <TableRow key={item.exchangeId}>
                    <TableCell align="center">{item.name1}</TableCell>
                    <TableCell align="center">{item.name2}</TableCell>
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
                        onClick={() => navigate(`/trade/detail/${item.exchangeId}`)}
                      >
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
              count={filtered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
