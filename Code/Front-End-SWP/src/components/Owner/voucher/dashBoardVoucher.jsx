import React, { useEffect, useState } from "react";
import { Box, Paper, Button, Dialog, DialogTitle, DialogContent, Select, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import CreateVoucher from "./createVoucher";
import { GetAllVoucher, GetAllCourts } from "../../API/APIConfigure";
import DeleteVoucher from "./deleteVoucher";

const Dashboard = () => {
  const [voucher, setVoucher] = useState([]);
  const [courts, setCourts] = useState([]);
  const [selectedCourtId, setSelectedCourtId] = useState(""); // State for selected court
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const ownerId = JSON.parse(localStorage.getItem("userInfo")).id;

  // Fetch owned courts
  const fetchCourts = async () => {
    try {
      const response = await GetAllCourts();
      const ownedCourts = response.data.filter(court => court.ownerId === ownerId);
      setCourts(ownedCourts || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch vouchers
  const fetchVouchers = async () => {
    try {
      const response = await GetAllVoucher();
      setVoucher(Array.isArray(response) ? response : []);
    } catch (err) {
      setVoucher([]);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourts();
    fetchVouchers();
  }, []);

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

  const handleCourtChange = (event) => {
    setSelectedCourtId(event.target.value);
    setPage(0); // Reset page to 0 when court changes
  };

  // Filter vouchers based on selected court and owner’s courts
  const ownedCourtIds = courts.map(court => court.courtId);
  const filteredVouchers = voucher.filter((v) => 
    ownedCourtIds.includes(v.courtId) && (selectedCourtId === "" || v.courtId === selectedCourtId)
  );

  const slicedVouchers = filteredVouchers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <div className="main">
          <Select
            value={selectedCourtId}
            onChange={handleCourtChange}
            displayEmpty
            style={{ marginTop: "30px", marginLeft: "20px", width: "200px" }}
          >
            <MenuItem value="">Tất cả sân</MenuItem>
            {courts.map((court) => (
              <MenuItem key={court.courtId} value={court.courtId}>
                {court.courtName}
              </MenuItem>
            ))}
          </Select>
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
            Tạo
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
              Tạo khuyến mãi
            </DialogTitle>
            <DialogContent>
              <CreateVoucher
                isOpen={open}
                onClose={handleClose}
                fetchVouchers={fetchVouchers}
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
              Khuyến mãi
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
                  >
                    Code
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    Sân
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    Mô tả
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    Giảm giá
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    Ngày bắt đầu
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    Ngày kết thúc
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
                {slicedVouchers.map((v) => {
                  const court = courts.find((court) => court.courtId === v.courtId);
                  return (
                    <TableRow key={v.promotionId}>
                      <TableCell style={{ fontSize: "13px" }}>
                        {v.promotionCode}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {court ? court.courtName : "Unknown Court"}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {v.description}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {v.percentage}%
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "13px",
                        }}
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
                      >
                        {new Date(v.endDate).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <DeleteVoucher
                          voucherId={v.promotionId}
                          fetchVouchers={fetchVouchers}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredVouchers.length}
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
