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
  Dialog, DialogTitle, DialogContent
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateSubCourtComponent from "./createSubCourt.jsx";
import { GetAllCourts, GetAllSubCourts, DeleteSubCourt, GetTimeSlotByID, CreateSubCourts } from "../../API/APIConfigure";

const Dashboard = () => {
  const [courts, setCourts] = useState([]);
  const [subCourts, setSubCourts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const ownerId = JSON.parse(localStorage.getItem("userInfo")).id;

  const fetchCourts = async () => {
    try {
      const response = await GetAllCourts();
      const ownedCourts = response.data.filter(court => court.ownerId === ownerId);
      setCourts(ownedCourts || []);
    } catch (err) {
      toast.error("Failed to fetch courts");
      console.error(err);
    }
  };

  const fetchSubCourts = async () => {
    try {
      const response = await GetAllSubCourts();
      setSubCourts(response.data || []);
    } catch (err) {
      toast.error("Failed to fetch sub-courts");
      console.error(err);
    }
  };

  const fetchTimeSlot = async (id) => {
    try {
      const response = await GetTimeSlotByID(id);
      setTimeSlots((prevTimeSlots) => ({
        ...prevTimeSlots,
        [id]: response.data,
      }));
    } catch (err) {
      toast.error("Failed to fetch time slots");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourts();
    fetchSubCourts();
  }, []);

  useEffect(() => {
    subCourts.forEach((subCourt) => {
      if (!timeSlots[subCourt.timeSlotId]) {
        fetchTimeSlot(subCourt.timeSlotId);
      }
    });
  }, [subCourts]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteSubCourt(id);
      console.log(response);
      if (response.success) {
        toast.success(response.message);
        fetchSubCourts();
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Deletion failed");
      console.error(err);
    }
  };

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

  const filteredSubCourts = subCourts.filter((subCourt) => {
    const court = courts.find((court) => court.courtId === subCourt.courtId);
    return (
      court &&
      court.ownerId === ownerId &&
      subCourt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const slicedSubCourts = filteredSubCourts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <TextField
          label="Search Sub Court Name"
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
            Create SubCourt
          </DialogTitle>
          <DialogContent>
            <CreateSubCourtComponent
              isOpen={open}
              onClose={handleClose}
              fetchSubCourts={fetchCourts}
            />
          </DialogContent>
        </Dialog>
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
                  Sub Court Name
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
                  Price Per Hour
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Time Slot
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
              {slicedSubCourts.map((item) => (
                <TableRow key={item.subCourtId}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{courts.find((court) => court.courtId === item.courtId)?.courtName}</TableCell>
                  <TableCell align="center">{item.pricePerHour}</TableCell>
                  <TableCell align="center">
                    {timeSlots[item.timeSlotId]
                      ? `${timeSlots[item.timeSlotId].startTime} - ${timeSlots[item.timeSlotId].endTime}`
                      : "Loading..."}
                  </TableCell>
                  <TableCell align="center">
                    {/* <Button
                      variant="outlined"
                      color="success"
                      className="edit-btn"
                      onClick={() => navigate(`/court/${item.subCourtId}`)}
                    >
                      <VisibilityIcon sx={{ fontSize: 25 }} />
                    </Button> */}
                    <Button
                      variant="outlined"
                      color="error"
                      className="delete-btn"
                      onClick={() => handleDelete(item.subCourtId)}
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
            count={filteredSubCourts.length}
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