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
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GetAllCourts, UpdateStatusCourt } from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [courts, setCourts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const fetchCourts = async () => {
    try {
      const response = await GetAllCourts();
      setCourts(response.data || []);
    } catch (err) {
      toast.error("Failed to fetch courts");
      console.error(err);
    }
  };

  const handleUpdate = async (id, status) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Bạn có chắc chắn không?",
      text: "Bạn sẽ không thể khôi phục lại!",
      showCancelButton: true,
      confirmButtonText: "Có, xác nhận!",
      cancelButtonText: "Không, giữ lại",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const responseUpdate = await UpdateStatusCourt(id, status);
        console.log(responseUpdate);
        if (responseUpdate.success) {
          toast.success("Xác nhận thành công!");
          fetchCourts();
        } else {
          toast.error("Lỗi xác nhận");
        }
      } catch (err) {
        toast.error("Lỗi khi xác nhận sân");
        console.error(err);
      }
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

  const statusTexts = {
    0: "Đang chờ",
    1: "Đã xác thực"
  };

  const statusColors = {
    0: "orange",
    1: "green"
  };

  const filteredCourts = courts.filter((court) =>
    statusFilter === "" ? true : court.status === parseInt(statusFilter)
  );

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
          Courts
        </h2>
        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value={0}>Đang chờ</MenuItem>
            <MenuItem value={1}>Đã xác thực</MenuItem>
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
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
                  Tên Sân
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Vị trí
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  SĐT
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
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCourts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((court) => (
                  <TableRow key={court.courtId}>
                    <TableCell align="center">{court.courtName}</TableCell>
                    <TableCell align="center">{court.location}</TableCell>
                    <TableCell align="center">{court.phone}</TableCell>
                    <TableCell
                      align="center"
                      style={{ color: statusColors[court.status], fontWeight: "bold" }}
                    >
                      {statusTexts[court.status]}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        className="edit-btn"
                        onClick={() => navigate(`/court/${court.courtId}`)}
                      >
                        <VisibilityIcon sx={{ fontSize: 25 }} />
                      </Button>
                      {court.status === 0 && (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginLeft: "10px" }}
                          onClick={() => handleUpdate(court.courtId, 1)}
                        >
                          Xác nhận
                        </Button>
                      )}
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
