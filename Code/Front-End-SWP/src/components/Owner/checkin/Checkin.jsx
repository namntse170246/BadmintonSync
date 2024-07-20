import React, { useState, useEffect } from "react";
import {
  CheckIn,
  UpdateCheckIn,
  GetAllAccounts,
  GetAllCourts,
  GetUserByID,
  GetbySubCourtID,
  UpdateBookingStatus,
} from "../../API/APIConfigure";
import {
  Box,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";

const CheckInComponent = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [subCourtDetails, setSubCourtDetails] = useState({});
  const [subCourtToCourt, setSubCourtToCourt] = useState({});
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ownedCourts, setOwnedCourts] = useState([]);

  const ownerId = JSON.parse(localStorage.getItem("userInfo")).id;

  const fetchCheckIns = async () => {
    try {
      const response = await CheckIn();
      console.log(response.data);
      setCheckIns(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      toast.error("Failed to fetch check-ins");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCheckIns();
  }, []);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await GetAllCourts();
        console.log(response.data);
        const courtsOwnedByOwner = response.data.filter(
          (court) => court.ownerId === ownerId
        );
        setOwnedCourts(courtsOwnedByOwner);
      } catch (err) {
        toast.error("Failed to fetch courts owned by owner");
        console.error(err);
      }
    };

    fetchCourts();
  }, [ownerId]);

  useEffect(() => {
    const userIds = checkIns.map((item) => item.userId);
    const uniqueUserIds = Array.from(new Set(userIds));

    const fetchUserDetails = async () => {
      for (const id of uniqueUserIds) {
        try {
          const userData = await GetUserByID(id);
          console.log(userData);
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            [id]: userData.data.fullName,
          }));
        } catch (error) {
          console.error("Failed to fetch user details", error);
          toast.error(`Failed to fetch user details for ID: ${id}`);
        }
      }
    };

    if (uniqueUserIds.length > 0) {
      fetchUserDetails();
    }
  }, [checkIns]);

  useEffect(() => {
    const subCourtIds = checkIns.map((item) => item.subCourtId);
    const uniqueSubCourtIds = Array.from(new Set(subCourtIds));

    const fetchSubCourtDetails = async () => {
      for (const id of uniqueSubCourtIds) {
        try {
          const subCourtData = await GetbySubCourtID(id);
          console.log(subCourtData);
          setSubCourtDetails((prevDetails) => ({
            ...prevDetails,
            [id]: subCourtData.data.name,
          }));
          setSubCourtToCourt((prevDetails) => ({
            ...prevDetails,
            [id]: subCourtData.data.courtId,
          }));
        } catch (error) {
          console.error("Failed to fetch sub-court details", error);
          toast.error(`Failed to fetch sub-court details for ID: ${id}`);
        }
      }
    };

    if (uniqueSubCourtIds.length > 0) {
      fetchSubCourtDetails();
    }
  }, [checkIns]);

  const updateCheckInStatus = async (checkInId, bookingId) => {
    try {
      const dataUpdate = {
          id: checkInId,
          checkInStatus: true,
          checkInTime: checkIns.checkInTime,
      }
      console.log(dataUpdate);
      await UpdateCheckIn(dataUpdate);
      const response = await UpdateBookingStatus(bookingId, 4);
      fetchCheckIns();
    } catch (error) {
      console.error("Error updating check-in status:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const statusTexts = {
    false: "Not Checked",
    true: "Checked",
  };

  const statusColors = {
    false: "red",
    true: "green",
  };

  const filteredCheckIns = checkIns.filter((checkIn) => {
    const courtId = subCourtToCourt[checkIn.subCourtId];
    const isOwnerCourt = ownedCourts.some((court) => court.courtId === courtId);
    return (
      !checkIn.checkInStatus && // Only show check-ins with checkInStatus = false
      isOwnerCourt
    );
  });

  console.log(filteredCheckIns);

  const slicedCheckIns = filteredCheckIns.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Typography
          variant="h2"
          align="center"
          color="#205295"
          sx={{
            fontSize: 40,
            mt: 2,
            mb: 2,
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          Check In
        </Typography>
        {/* <Select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="true">Checked</MenuItem>
          <MenuItem value="false">Not Checked</MenuItem>
        </Select> */}
        <TableContainer component={Paper} className="dashboard-container">
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="staff-table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  FullName
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  SubCourtName
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  CheckIn Time
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: 20, fontFamily: "Arial, sans-serif" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedCheckIns.map((checkIn) => (
                <TableRow key={checkIn.checkInId}>
                  <TableCell align="center" sx={{ fontSize: 13 }}>
                    {userDetails[checkIn.userId] || checkIn.userId}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 13 }}>
                    {subCourtDetails[checkIn.subCourtId] || checkIn.subCourtId}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 13 }}>
                    {checkIn.checkInTime}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: 15,
                      color: statusColors[checkIn.checkInStatus],
                      fontWeight: "bold",
                    }}
                  >
                    {statusTexts[checkIn.checkInStatus]}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="success"
                      className="edit-btn"
                      onClick={() => updateCheckInStatus(checkIn.checkInId, checkIn.bookingId)}
                    >
                      <CheckIcon sx={{ fontSize: 25 }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCheckIns.length}
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

export default CheckInComponent;
