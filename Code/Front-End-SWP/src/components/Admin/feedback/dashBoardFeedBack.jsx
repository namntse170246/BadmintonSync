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
  Select,
  MenuItem,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import StarRatings from "react-star-ratings";
import {
  GetAllFeedback,
  GetUserByID,
  GetbyCourtID,
} from "../../API/APIConfigure";

const Dashboard = () => {
  const [feedback, setFeedback] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [realEstateDetails, setRealEstateDetails] = useState({});
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await GetAllFeedback();
        console.log(response);
        setFeedback(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        toast.error("Failed to fetch feedback");
        console.error(err);
      }
    };

    fetchFeedback();
  }, []);

  useEffect(() => {
    const userIds = feedback.map((item) => item.userId);
    const uniqueUserIds = Array.from(new Set(userIds));

    const fetchUserDetails = async () => {
      for (const id of uniqueUserIds) {
        try {
          console.log(id);
          const userData = await GetUserByID(id);
          console.log(userData);
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            [id]: userData.data.userName,
          }));
        } catch (error) {
          console.error("Failed to fetch user details", error);
        }
      }
    };

    if (uniqueUserIds.length > 0) {
      fetchUserDetails();
    }
  }, [feedback]);

  useEffect(() => {
    const realIds = feedback.map((item) => item.courtId);
    const uniqueRealIds = Array.from(new Set(realIds));

    const fetchRealDetails = async () => {
      for (const id of uniqueRealIds) {
        try {
          const realData = await GetbyCourtID(id);
          setRealEstateDetails((prevDetails) => ({
            ...prevDetails,
            [id]: realData.data.courtName,
          }));
        } catch (error) {
          console.error("Failed to fetch real details", error);
        }
      }
    };

    if (uniqueRealIds.length > 0) {
      fetchRealDetails();
    }
  }, [feedback]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredFeedback = feedback.filter((item) => {
    return (
      selectedStatusFilter === "all" ||
      item.rating.toString() === selectedStatusFilter
    );
  });

  const slicedFeedback = filteredFeedback.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          style={{ marginTop: "30px", marginBottom: "20px" }}
        >
          <MenuItem value="all">All</MenuItem>
          {[5, 4, 3, 2, 1].map((rating) => (
            <MenuItem key={rating} value={rating.toString()}>
              {rating} ☆
            </MenuItem>
          ))}
        </Select>
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
            Feedback
          </h2>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="left"
                >
                  Username
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="left"
                >
                  Court
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="left"
                >
                  Feedback
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="left"
                >
                  Rating
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedFeedback.map((item) => (
                <TableRow key={item.evaluateId}>
                  <TableCell align="left" className="align-left">
                    {userDetails[item.userId] || item.userId}
                  </TableCell>
                  <TableCell align="left" className="align-left">
                    {realEstateDetails[item.courtId] || item.courtId}
                  </TableCell>
                  <TableCell align="left" className="align-left">
                    {item.comment}
                  </TableCell>
                  <TableCell align="left" className="align-left">
                    <StarRatings
                      rating={item.rating}
                      starDimension="20px"
                      starSpacing="2px"
                      starRatedColor="orange"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredFeedback.length}
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
