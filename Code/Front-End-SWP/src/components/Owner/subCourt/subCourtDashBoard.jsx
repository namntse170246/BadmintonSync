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
import { GetAllSubCourts, UpdateRealestateStatus } from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [courts, setCourts] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const fetchCourts = async () => {
    try {
      const response = await GetAllSubCourts();
      setCourts(response.data || []);
    } catch (err) {
      toast.error("Failed to fetch courts");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCourts = courts.filter((item) => {
    return (
      selectedStatusFilter === "all" ||
      item.status?.toString() === selectedStatusFilter
    );
  });

  const slicedCourts = filteredCourts.slice(
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
      await UpdateRealestateStatus(id, status);
      toast.success("Cập nhật thành công");
      fetchCourts();
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
          <MenuItem value="all">All</MenuItem>
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
            Sub Courts
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
                  Court Name
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Sub Court Name
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Price Per Hour
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Time Slot ID
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
              {slicedCourts.map((item) => (
                <TableRow key={item.subCourtId}>
                  <TableCell align="center">{item.courtId}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.pricePerHour}</TableCell>
                  <TableCell align="center">{item.timeSlotId}</TableCell>
                  <TableCell align="center">
                    <Select
                      value={item.status?.toString() || ""}
                      onChange={(e) =>
                        handleStatusChange(e.target.value, item.subCourtId)
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
                      onClick={() => navigate(`/court/${item.subCourtId}`)}
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
            count={filteredCourts.length}
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
