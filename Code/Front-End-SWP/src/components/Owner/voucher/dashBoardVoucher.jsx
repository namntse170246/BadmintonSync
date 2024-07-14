import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { TextField, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import CreateVoucher from "./createVoucher";
import { GetAllVoucher, GetAllCourts } from "../../API/APIConfigure";
import DeleteVoucher from "./deleteVoucher";

const Dashboard = () => {
  const [voucher, setVoucher] = useState([]);
  const [courts, setCourts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const ownerId = JSON.parse(localStorage.getItem("userInfo")).id;

  const fetchCourts = async () => {
    try {
      const response = await GetAllCourts();
      const ownedCourts = response.data.filter(court => court.ownerId === ownerId);
      setCourts(ownedCourts || []);
    } catch (err) {
      console.error(err);
    }
  };

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

  const filteredVouchers = voucher.filter((v) => {
    const court = courts.find((court) => court.courtId === v.courtId);
    return (
      court &&
      v.promotionCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const slicedVouchers = filteredVouchers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <div className="main">
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
            Create
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
              Create Promotion
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
              Promotion
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
                    Code
                  </TableCell>
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
                    Description
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Percentage
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Start Date
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    End Date
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
                {slicedVouchers.map((v) => {
                  const court = courts.find((court) => court.courtId === v.courtId);
                  return (
                    <TableRow key={v.promotionId}>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {v.promotionCode}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {court ? court.courtName : "Unknown Court"}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {v.description}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {v.percentage}%
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
