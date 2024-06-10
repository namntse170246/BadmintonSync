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
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  GetAllRealestates,
  UpdateRealestateStatus,
} from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";
import Hotel from "../../../pages/hotel/Hotel";

const Dashboard = () => {
  const [feedback, setFeedback] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const fetchRealestates = async () => {
    try {
      const response = await GetAllRealestates();
      setFeedback(Array.isArray(response) ? response : []);
    } catch (err) {
      toast.error("Failed to fetch Realestates");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRealestates();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredFeedback = feedback.filter((item) => {
    return (
      selectedStatusFilter === "all" ||
      item.status.toString() === selectedStatusFilter
    );
  });

  const slicedFeedback = filteredFeedback.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const statusTexts = {
    1: "Chờ xác nhận",
    2: "Đã xác nhận",
    3: "Tạm dừng",
    4: "Vô hiệu hóa",
    5: "Từ chối",
  };

  const handleStatusChange = async (status, id) => {
    try {
      console.log(status);
      await UpdateRealestateStatus(id, status);
      toast.success("Cập nhật thành công");
      fetchRealestates();
    } catch (err) {
      toast.error("Cập nhật thất bại");
      console.error(err);
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Select
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
        </Select>
        <TableContainer component={Paper}>
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
            Bất Động Sản
          </h2>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Realestes
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Địa điểm
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Giá
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
                  <TableCell align="center">
                    <Select
                      value={item.status.toString()}
                      onChange={(e) =>
                        handleStatusChange(e.target.value, item.id)
                      }
                    >
                      {Object.keys(statusTexts).map((status) => (
                        <MenuItem key={status} value={status}>
                          {statusTexts[status]}
                        </MenuItem>
                      ))}
                    </Select>
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
};

export default Dashboard;
