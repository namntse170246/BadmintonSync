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
  DialogActions,
  Select,
  MenuItem
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateSubCourtComponent from "./createSubCourt.jsx";
import { GetAllCourts, GetAllSubCourts, DeleteSubCourt, GetTimeSlotByID, UpdateSubCourt } from "../../API/APIConfigure";

const Dashboard = () => {
  const [courts, setCourts] = useState([]);
  const [subCourts, setSubCourts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourtId, setSelectedCourtId] = useState("");
  const [selectedSubCourt, setSelectedSubCourt] = useState(null);
  const [price, setPrice] = useState("");
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

  const handleEditOpen = (subCourt) => {
    setSelectedSubCourt(subCourt);
    setPrice(subCourt.pricePerHour);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedSubCourt(null);
  };

  const handleSavePrice = async () => {
    if (selectedSubCourt) {
      try {
        const updatedSubCourtData = {
          id: selectedSubCourt.subCourtId,
          name: selectedSubCourt.name,
          pricePerHour: price,
          timeSlotId: selectedSubCourt.timeSlotId,
        }
        // console.log(selectedSubCourt);
        console.log(updatedSubCourtData);
        const response = await UpdateSubCourt(updatedSubCourtData);
        // console.log(response);
        if (response.success) {
          toast.success(response.message);
          fetchSubCourts();
          handleEditClose();
        } else {
          toast.error(response.message);
        }
      } catch (err) {
        toast.error("Failed to update price");
        console.error(err);
      }
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

  const handleCourtChange = (event) => {
    setSelectedCourtId(event.target.value);
    setPage(0); // Reset page to 0 when court changes
  };

  const ownedCourtIds = courts.map(court => court.courtId);


  const filteredSubCourts = subCourts.filter((subCourt) => {
    const court = courts.find((court) => court.courtId === subCourt.courtId);
    return (
      court &&
      ownedCourtIds.includes(subCourt.courtId) &&
      (selectedCourtId === "" || subCourt.courtId === selectedCourtId) &&
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
        <Select
          value={selectedCourtId}
          onChange={handleCourtChange}
          displayEmpty
          style={{ marginTop: "30px", marginLeft: "20px", width: "200px" }}
        >
          <MenuItem value="">All Courts</MenuItem>
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
            Create Sub Court
          </DialogTitle>
          <DialogContent>
            <CreateSubCourtComponent
              isOpen={open}
              onClose={handleClose}
              fetchSubCourts={fetchSubCourts}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={editOpen}
          onClose={handleEditClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <DialogTitle
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#003580",
            }}
          >
            Edit Price Per Hour
          </DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {selectedSubCourt && (
              <TextField
                label="Price Per Hour"
                placeholder="Price Per Hour"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                variant="outlined"
                type="number"
                sx={{ flexGrow: 1 }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSavePrice} color="primary">
              Save
            </Button>
          </DialogActions>
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
                  Sub Court
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Court Name
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Price Per Hour
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Time Slot
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedSubCourts.map((item) => (
                <TableRow key={item.subCourtId}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{courts.find((court) => court.courtId === item.courtId)?.courtName}</TableCell>
                  <TableCell>{item.pricePerHour}</TableCell>
                  <TableCell>
                    {timeSlots[item.timeSlotId]
                      ? `${timeSlots[item.timeSlotId].startTime} - ${timeSlots[item.timeSlotId].endTime}`
                      : "Loading..."}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      className="edit-btn"
                      onClick={() => handleEditOpen(item)}
                    >
                      Edit
                    </Button>
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
