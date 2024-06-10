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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");

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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await GetAllVoucher();
      setVoucher(Array.isArray(response) ? response : []);
    } catch (err) {
      setVoucher([]);
      console.error(err);
    }
  };

  const filteredStatus = voucher.filter((voucher) => {
    if (
      selectedStatusFilter !== "all" &&
      voucher.status !== selectedStatusFilter
    ) {
      return false;
    }
    if (
      searchTerm &&
      voucher.name &&
      !voucher.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const slicedUser = filteredStatus.slice(
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
            label=""
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
                fetchUser={fetchUsers}
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
                    Mã
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Giá trị
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Loại
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Ngày hết hạn
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
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedUser.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {voucher.name}
                    </TableCell>

                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {voucher.amount}%
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {voucher.type}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "13px",
                      }}
                      align="center"
                    >
                      {new Date(voucher.endDay).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "15px",
                        color: voucher.status ? "green" : "red",
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      <UpdateStatusVoucher
                        voucherId={voucher.id}
                        currentStatus={voucher.status}
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
