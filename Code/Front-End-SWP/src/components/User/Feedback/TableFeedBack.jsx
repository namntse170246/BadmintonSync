import React, { useState } from 'react';
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
} from '@mui/material';
import StarRatings from 'react-star-ratings';
import StarIcon from '@mui/icons-material/Star';

function TableFeedback({ data, userDetails }) {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredFeedback = data.filter((item) => {
    return selectedStatusFilter === 'all' || item.rate.toString() === selectedStatusFilter;
  });

  const slicedFeedback = filteredFeedback.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          style={{ marginTop: '30px', marginBottom: '20px' }}
        >
          <MenuItem value="all">Tất cả</MenuItem>
          {[5, 4, 3, 2, 1].map((rating) => (
            <MenuItem key={rating} value={rating.toString()}>
              {[...Array(rating)].map((_, i) => (
                <StarIcon key={i} style={{ color: 'orange' }} />
              ))}
            </MenuItem>
          ))}
        </Select>
        <TableContainer component={Paper}>
          <h2
            style={{
              textAlign: 'left',
              color: '#205295',
              fontSize: '20px',
              margin: '20px 30px',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
            }}
          >
            Đánh giá
          </h2>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: '20px',
                    fontFamily: 'Arial, sans-serif',
                  }}
                  align="center"
                >
                  Tên tài khoản
                </TableCell>

                <TableCell
                  style={{
                    fontSize: '20px',
                    fontFamily: 'Arial, sans-serif',
                  }}
                  align="center"
                >
                  Feedback
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '20px',
                    fontFamily: 'Arial, sans-serif',
                  }}
                  align="center"
                >
                  Bình chọn
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedFeedback.map((data) => (
                <TableRow key={data.id}>
                  <TableCell align="center">
                    {userDetails[data.memberId] || data.memberId}
                  </TableCell>
                  <TableCell align="center">{data.text}</TableCell>
                  <TableCell align="center">
                    <StarRatings
                      rating={data.rate}
                      starDimension="20px"
                      starSpacing="2px"
                      starRatedColor="orange"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredFeedback.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
export default TableFeedback;
