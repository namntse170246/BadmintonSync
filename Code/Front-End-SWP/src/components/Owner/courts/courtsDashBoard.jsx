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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GetAllCourts } from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";
import CreateCourt from "./createCourt";

const Dashboard = () => {
  const [courts, setCourts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const ownerId = JSON.parse(localStorage.getItem("userInfo")).id;

  const fetchCourts = async () => {
    try {
      const response = await GetAllCourts();
      console.log(response);
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

  const filteredCourts = courts.filter(
    (court) =>
      court.ownerId === ownerId &&
      court.courtName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredCourts);

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
        <TextField
          label="Search Court Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px" }}
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
            Create Court
          </DialogTitle>
          <DialogContent>
            <CreateCourt
              isOpen={open}
              onClose={handleClose}
              fetchCourts={fetchCourts}
            />
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
                  Location
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Phone
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
              {filteredCourts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((court) => (
                  <TableRow key={court.courtId}>
                    <TableCell align="center">{court.courtName}</TableCell>
                    <TableCell align="center">{court.location}</TableCell>
                    <TableCell align="center">{court.phone}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        className="edit-btn"
                        onClick={() => navigate(`/court/${court.courtId}`)}
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
