import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { GetAllCourts } from "../../API/APIConfigure"; // Adjust the import path as necessary
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import { styled } from "@mui/system";

const DashboardItem = styled(Paper)({
  padding: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
});

const TotalCourt = () => {
  const ownerId = JSON.parse(localStorage.getItem("userInfo")).id;
  const [courts, setCourts] = useState([]);

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

  const filteredCourts = courts.filter((court) => court.ownerId === ownerId);
  const ownerCourtsCount = filteredCourts.length;

  return (
    <DashboardItem elevation={3}>
      <div>
        <Typography variant="h5" component="h3">
          Tống số sân
        </Typography>
        <Typography variant="h2" component="p">
          {ownerCourtsCount}
        </Typography>
      </div>
      <SportsTennisIcon style={{ fontSize: 80, color: "#3f51b5" }} />
    </DashboardItem>
  );
};

export default TotalCourt;
