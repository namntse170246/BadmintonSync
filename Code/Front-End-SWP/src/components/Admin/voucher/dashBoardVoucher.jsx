import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import {
  MenuItem,
  Select,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import CreateVoucher from "./CreateVoucher";
import { GetAllVoucher } from "../../API/APIConfigure";
import UpdateStatusVoucher from "./updateStatusVoucher";

const Dashboard = () => {
  const [voucher, setVoucher] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await GetAllVoucher();
      setVoucher(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setVoucher([]);
      console.error(err);
    }
  };

  const filteredVouchers = voucher.filter((v) => {
    if (
      selectedStatusFilter !== "all" &&
      v.status !== selectedStatusFilter
    ) {
      return false;
    }
    if (
      searchTerm &&
      v.promotionName &&
      !v.promotionName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const slicedVouchers = filteredVouchers.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <div className="main">
          <Select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            style={{ marginTop: "30px" }}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value={true}>Hoạt động</MenuItem>
            <MenuItem value={false}>Vô Hiệu Hóa</MenuItem>
          </Select>
          <TextField
            label="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: "30px", marginLeft: "20px" }}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#003580",
              fontSize: "21px",
              float: "right",
              marginTop: "30px",
            }}
            onClick={handleClickOpen}
          >
            Tạo mới
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
          >
            <DialogTitle
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "bold",
                color: "#003580",
              }}
            >
              Tạo mã giảm giá
            </DialogTitle>
            <DialogContent>
              <CreateVoucher
                isOpen={open}
                onClose={handleClose}
                fetchUser={fetchVouchers}
              />
            </DialogContent>
          </Dialog>
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
              Mã giảm giá
            </h2>
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
                    Tên khuyến mãi
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Mô tả
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Giá trị giảm
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Ngày bắt đầu
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Ngày kết thúc
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
                {slicedVouchers.map((v) => (
                  <TableRow key={v.promotionId}>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {v.promotionName}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {v.description}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {v.discountPercentage}%
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "13px",
                      }}
                      align="center"
                    >
                      {new Date(v.startDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "13px",
                      }}
                      align="center"
                    >
                      {new Date(v.endDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell align="center">
                      <UpdateStatusVoucher
                        voucherId={v.promotionId}
                        currentStatus={v.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={voucher.length}
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
