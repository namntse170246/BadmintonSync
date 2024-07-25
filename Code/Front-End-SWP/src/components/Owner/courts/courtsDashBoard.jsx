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
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetAllCourts, DeleteCourt } from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";
import CreateCourt from "./createCourt";
import EditCourt from "./EditCourt";

const Dashboard = () => {
  const [courts, setCourts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, courtId: null });
  const navigate = useNavigate();

  const ownerId = JSON.parse(localStorage.getItem("userInfo")).id;

  const statusTexts = {
    0: "Đang chờ",
    1: "Đã xác thực",
  };

  const statusColors = {
    0: "orange",
    1: "green",
  };

  const fetchCourts = async () => {
    try {
      const response = await GetAllCourts();
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

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredCourts = courts.filter(
    (court) =>
      court.ownerId === ownerId &&
      (statusFilter === "all" || court.status === statusFilter)
  );

  const handleEditClick = (court) => {
    setSelectedCourt(court);
    setOpenEdit(true);
  };

  const handleDeleteClick = (courtId) => {
    setDeleteConfirm({ open: true, courtId });
  };

  const confirmDelete = async () => {
    try {
      await DeleteCourt(deleteConfirm.courtId);
      toast.success("Court deleted successfully!");
      fetchCourts();
    } catch (err) {
      toast.error("Failed to delete court");
      console.error(err);
    } finally {
      setDeleteConfirm({ open: false, courtId: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ open: false, courtId: null });
  };

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
          Sân
        </h2>
        <Select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          displayEmpty
          inputProps={{ "aria-label": "Status" }}
          variant="outlined"
          style={{ marginBottom: "20px", width: "200px" }}
        >
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value={0}>Đang chờ</MenuItem>
          <MenuItem value={1}>Đã xác thực</MenuItem>
        </Select>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#003580",
            fontSize: "21px",
            float: "right",
            marginTop: "30px",
          }}
          onClick={() => setOpenCreate(true)}
        >
          Tạo
        </Button>
        <Dialog
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
              color: "#003580",
            }}
          >
            Tạo sân
          </DialogTitle>
          <DialogContent>
            <CreateCourt
              isOpen={openCreate}
              onClose={() => setOpenCreate(false)}
              fetchCourts={fetchCourts}
            />
          </DialogContent>
        </Dialog>
        <EditCourt
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          court={selectedCourt}
          fetchCourts={fetchCourts}
        />
        <Dialog
          open={deleteConfirm.open}
          onClose={cancelDelete}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <p>Bạn có chắc là muốn xóa sân này?</p>
            <Button
              onClick={confirmDelete}
              color="error"
              variant="contained"
              style={{ marginRight: "10px" }}
            >
              Xóa
            </Button>
            <Button onClick={cancelDelete} color="primary" variant="outlined">
              Hủy
            </Button>
          </DialogContent>
        </Dialog>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Tên sân
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Địa chỉ
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  SĐT
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Trạng thái
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
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
                    <TableCell>{court.courtName}</TableCell>
                    <TableCell>{court.location}</TableCell>
                    <TableCell>{court.phone}</TableCell>
                    <TableCell style={{ color: statusColors[court.status] }}>
                      {statusTexts[court.status]}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="success"
                        className="view-btn"
                        onClick={() => navigate(`/court/${court.courtId}`)}
                        style={{ marginRight: "8px" }}
                      >
                        <VisibilityIcon sx={{ fontSize: 25 }} />
                      </Button>
                      <Button
                        variant="outlined"
                        color="warning"
                        className="edit-btn"
                        onClick={() => handleEditClick(court)}
                        style={{ marginRight: "8px" }}
                      >
                        <EditIcon sx={{ fontSize: 25 }} />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        className="delete-btn"
                        onClick={() => handleDeleteClick(court.courtId)}
                      >
                        <DeleteIcon sx={{ fontSize: 25 }} />
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
